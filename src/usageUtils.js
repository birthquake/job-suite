import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'

export async function checkUsageAllowed(userId) {
  try {
    const db = getFirestore()
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      // New user - create usage tracking
      await setDoc(userRef, {
        tier: 'free',
        applicationsThisMonth: 0,
        monthStart: new Date().toISOString(),
        subscriptionStatus: 'none',
      })
      return { allowed: true, reason: 'free', tier: 'free' }
    }

    const userData = userDoc.data()
    const now = new Date()
    const monthStart = new Date(userData.monthStart)

    // Check if month has passed
    if (now.getMonth() !== monthStart.getMonth() || now.getFullYear() !== monthStart.getFullYear()) {
      // Reset monthly counter
      await updateDoc(userRef, {
        applicationsThisMonth: 0,
        monthStart: new Date().toISOString(),
      })
      return { allowed: true, reason: 'reset', tier: userData.tier }
    }

    // Check tier limits
    if (userData.tier === 'premium') {
      return { allowed: true, reason: 'premium', tier: 'premium' }
    }

    if (userData.tier === 'free') {
      const freeLimit = 3 // 3 free applications per month
      if (userData.applicationsThisMonth >= freeLimit) {
        return { 
          allowed: false, 
          reason: 'free-limit-reached', 
          tier: 'free',
          used: userData.applicationsThisMonth,
          limit: freeLimit
        }
      }
      return { 
        allowed: true, 
        reason: 'free', 
        tier: 'free',
        used: userData.applicationsThisMonth,
        limit: freeLimit
      }
    }

    return { allowed: false, reason: 'unknown', tier: userData.tier }
  } catch (error) {
    console.error('Usage check failed:', error)
    return { allowed: true, reason: 'error' } // Allow on error
  }
}

export async function incrementUsage(userId) {
  try {
    const db = getFirestore()
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      applicationsThisMonth: increment(1),
    })
  } catch (error) {
    console.error('Usage increment failed:', error)
  }
}

export async function upgradeUserToPremium(userId, subscriptionId) {
  try {
    const db = getFirestore()
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      tier: 'premium',
      subscriptionStatus: 'active',
      subscriptionId: subscriptionId,
      upgradedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Premium upgrade failed:', error)
  }
}

export async function getUserTier(userId) {
  try {
    const db = getFirestore()
    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (!userDoc.exists()) return 'free'
    return userDoc.data().tier || 'free'
  } catch (error) {
    return 'free'
  }
}
