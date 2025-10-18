import { useState, useContext, useEffect } from 'react'
import { FileText, MessageSquare, CheckCircle, Hourglass } from 'lucide-react'
import { AuthContext } from './AuthContext'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore'
import { getUserTier } from './usageUtils'
import { generateApplicationPackagePDF } from './PDFGenerator'

export function Dashboard({ onStartApplication }) {
  const { user } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [userTier, setUserTier] = useState('free')
  const [downloadingId, setDownloadingId] = useState(null)
  const [sortDirection, setSortDirection] = useState('desc') // 'asc' or 'desc'
  const [displayedStats, setDisplayedStats] = useState({ apps: 0, callbacks: 0, pending: 0 })

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        // Fetch user tier
        const tier = await getUserTier(user.uid)
        setUserTier(tier)

        // Fetch applications
        const db = getFirestore()
        const q = query(collection(db, 'applications'), where('userId', '==', user.uid))
        const querySnapshot = await getDocs(q)
        const apps = []
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() })
        })
        setApplications(apps)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Animate stat counters on mount
  useEffect(() => {
    const totalApps = applications.length
    const callbacks = applications.filter((a) => a.callbackReceived).length
    const pending = applications.filter((a) => a.status === 'applied').length

    const animationDuration = 600
    const steps = 30
    const stepDuration = animationDuration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setDisplayedStats({
        apps: Math.floor(totalApps * progress),
        callbacks: Math.floor(callbacks * progress),
        pending: Math.floor(pending * progress)
      })

      if (currentStep >= steps) {
        setDisplayedStats({
          apps: totalApps,
          callbacks: callbacks,
          pending: pending
        })
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [applications])

  const handleUpdateStatus = async (appId, status) => {
    try {
      const db = getFirestore()
      
      // Only count "interviewed" and "offer" as successful callbacks
      const callbackReceived = status === 'interviewed' || status === 'offer'
      
      // Update Firebase
      await updateDoc(doc(db, 'applications', appId), { 
        status,
        callbackReceived
      })
      
      // Update local state
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status, callbackReceived } : app))
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleSortByDate = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')
  }

  const getSortedApplications = () => {
    const sorted = [...applications].sort((a, b) => {
      const dateA = new Date(a.dateApplied)
      const dateB = new Date(b.dateApplied)
      
      if (sortDirection === 'asc') {
        return dateA - dateB
      } else {
        return dateB - dateA
      }
    })
    return sorted
  }

  const handleDownloadPackage = async (appId) => {
    console.log('=== DOWNLOAD STARTED ===')
    console.log('App ID:', appId)
    
    try {
      setDownloadingId(appId)
      console.log('Set downloading state')
      
      const db = getFirestore()
      console.log('Got Firestore instance')
      
      // Fetch fresh data from Firebase to ensure we have all outputs
      const docRef = doc(db, 'applications', appId)
      console.log('Created doc reference:', docRef)
      
      const docSnap = await getDoc(docRef)
      console.log('Got doc snapshot, exists:', docSnap.exists())
      
      if (!docSnap.exists()) {
        throw new Error('Application document not found in Firebase')
      }

      const appData = docSnap.data()
      console.log('=== FULL APP DATA ===', appData)
      console.log('=== OUTPUTS FIELD ===', appData.outputs)

      // Fix double-nesting: outputs.outputs contains the actual content
      let normalizedOutputs = appData.outputs
      if (appData.outputs?.outputs && typeof appData.outputs.outputs === 'object') {
        normalizedOutputs = appData.outputs.outputs
        console.log('Flattened nested outputs structure')
      }

      // Create final app object with flattened outputs
      const finalAppData = {
        ...appData,
        outputs: normalizedOutputs
      }

      console.log('=== FINAL APP DATA FOR PDF ===', finalAppData)
      console.log('Calling PDF generator with:', finalAppData)
      generateApplicationPackagePDF(finalAppData)
      console.log('PDF generator called successfully')
      
    } catch (error) {
      console.error('=== ERROR IN DOWNLOAD ===', error)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
      alert(`Failed to generate PDF: ${error.message}`)
    } finally {
      console.log('=== DOWNLOAD COMPLETED ===')
      setDownloadingId(null)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading your dashboard...</p>
      </div>
    )
  }

  const totalApps = applications.length
  const callbacks = applications.filter((a) => a.callbackReceived).length
  const successRate = totalApps > 0 ? Math.round((callbacks / totalApps) * 100) : 0
  const pending = applications.filter((a) => a.status === 'applied').length

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>elevaitr Dashboard</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            {userTier === 'premium' ? '✓ Premium' : 'Free tier'}
          </p>
        </div>
        <button className="new-app-btn" onClick={onStartApplication}>
          + New Application
        </button>
      </div>

      {/* Stats */}
      <div className="usage-stats">
        <div className="stats-row">
          {/* Total Applications */}
          <div className="stat-item">
            <div style={{ marginBottom: '0.75rem' }}>
              <FileText size={24} color="#60a5fa" strokeWidth={1.5} />
            </div>
            <div className="stat-value">{displayedStats.apps}</div>
            <div className="stat-label">Total Applications</div>
          </div>

          {/* Callbacks */}
          <div className="stat-item">
            <div style={{ marginBottom: '0.75rem' }}>
              <MessageSquare size={24} color="#22c55e" strokeWidth={1.5} />
            </div>
            <div className="stat-value">{displayedStats.callbacks}</div>
            <div className="stat-label">Callbacks</div>
          </div>

          {/* Success Rate */}
          <div className="stat-item">
            <div style={{ marginBottom: '0.75rem' }}>
              <CheckCircle size={24} color="#a855f7" strokeWidth={1.5} />
            </div>
            <div className="stat-value">{successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>

          {/* Pending Responses */}
          <div className="stat-item">
            <div style={{ marginBottom: '0.75rem' }}>
              <Hourglass size={24} color="#fb923c" strokeWidth={1.5} />
            </div>
            <div className="stat-value">{displayedStats.pending}</div>
            <div className="stat-label">Pending Responses</div>
          </div>
        </div>
      </div>

      {/* Empty State - Getting Started */}
      {totalApps === 0 ? (
        <div style={{ marginTop: '2rem' }}>
          <div style={{
            background: '#0f1419',
            border: '1px solid #1a1f2e',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#ffffff' }}>
              Getting Started with elevaitr
            </h3>
            <p style={{ color: '#9ca3af', marginBottom: '2rem', lineHeight: '1.6' }}>
              Ready to elevate your job applications? Here's how it works:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Step 1 */}
              <div className="step-card">
                <div className="step-card-number">1</div>
                <h4>Create Application</h4>
                <p>
                  Paste the job description and your resume
                </p>
              </div>

              {/* Step 2 */}
              <div className="step-card">
                <div className="step-card-number">2</div>
                <h4>Select Tools</h4>
                <p>
                  Choose resume, cover letter, interview prep, and more
                </p>
              </div>

              {/* Step 3 */}
              <div className="step-card">
                <div className="step-card-number">3</div>
                <h4>Download Package</h4>
                <p>
                  Get all your materials in one complete package
                </p>
              </div>
            </div>

            <button 
              onClick={onStartApplication}
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.3)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              Create Your First Application
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Applications Table */}
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#ffffff' }}>Your Applications</h3>
          <div className="applications-table">
            <div className="table-header">
              <div>Company & Role</div>
              <div 
                onClick={handleSortByDate}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  userSelect: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
              >
                Date Applied
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {sortDirection === 'desc' ? '↓' : '↑'}
                </span>
              </div>
              <div>Status</div>
              <div>Tools Used</div>
              <div>Actions</div>
            </div>

            {getSortedApplications().map((app) => (
              <div key={app.id} className="table-row">
                <div className="table-cell">
                  <div style={{ fontWeight: '600' }}>{app.company}</div>
                  <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>{app.jobTitle}</div>
                </div>
                <div className="table-cell date">
                  {new Date(app.dateApplied).toLocaleDateString()}
                </div>
                <div className="table-cell">
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                    style={{
                      background: '#1a1f2e',
                      color: '#e5e7eb',
                      border: '1px solid #2d3748',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="rejected">Rejected</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
                <div className="table-cell" style={{ fontSize: '0.85rem' }}>
                  {app.toolsSelected?.join(', ')}
                </div>
                <div className="table-cell">
                  <button
                    onClick={() => handleDownloadPackage(app.id)}
                    disabled={downloadingId === app.id}
                    className="download-btn"
                    style={{
                      opacity: downloadingId === app.id ? 0.6 : 1,
                      cursor: downloadingId === app.id ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {downloadingId === app.id ? '⟳ Generating...' : '⬇ Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
