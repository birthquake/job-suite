import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// Initialize Firebase for backend
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const event = req.body

    // Handle order.created event (successful payment)
    if (event.meta.event_name === 'order.created') {
      const orderData = event.data.attributes
      const customerEmail = orderData.customer_email

      if (!customerEmail) {
        console.log('No customer email in webhook')
        return res.status(200).json({ success: true })
      }

      // Find user by email and upgrade to premium
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', customerEmail))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        console.log(`User not found for email: ${customerEmail}`)
        // User might not exist yet, but that's ok - webhook will retry
        return res.status(200).json({ success: true })
      }

      const userDoc = querySnapshot.docs[0]
      const userId = userDoc.id

      // Determine subscription type based on product
      const productName = orderData.product_name || ''
      const tier = productName.includes('Monthly') ? 'premium' : 'premium' // Both make them premium

      // Upgrade user
      await updateDoc(doc(db, 'users', userId), {
        tier: 'premium',
        subscriptionStatus: 'active',
        subscriptionId: event.data.id,
        upgradedAt: new Date().toISOString(),
        lastPaymentEmail: customerEmail,
      })

      console.log(`Upgraded user ${userId} to premium`)
      return res.status(200).json({ success: true })
    }

    // Handle subscription.created event (recurring subscription)
    if (event.meta.event_name === 'subscription.created') {
      const subData = event.data.attributes
      const customerEmail = subData.customer_email

      if (!customerEmail) {
        return res.status(200).json({ success: true })
      }

      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', customerEmail))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return res.status(200).json({ success: true })
      }

      const userDoc = querySnapshot.docs[0]
      const userId = userDoc.id

      // Upgrade to premium for subscription
      await updateDoc(doc(db, 'users', userId), {
        tier: 'premium',
        subscriptionStatus: 'active',
        subscriptionId: event.data.id,
        upgradedAt: new Date().toISOString(),
        subscriptionRenewsAt: subData.renews_at,
      })

      console.log(`Upgraded user ${userId} to premium (subscription)`)
      return res.status(200).json({ success: true })
    }

    // Ignore other events
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
