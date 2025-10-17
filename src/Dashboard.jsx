import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { getUserTier } from './usageUtils'

export function Dashboard({ onStartApplication }) {
  const { user } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [userTier, setUserTier] = useState('free')

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

  const handleUpdateStatus = async (appId, status) => {
    try {
      const db = getFirestore()
      await updateDoc(doc(db, 'applications', appId), { status })
      setApplications((prev) =>
        prev.map((app) => (app.id === appId ? { ...app, status } : app))
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDownloadPackage = async (app) => {
    // Placeholder for PDF generation
    console.log('Downloading package for:', app.company, app.jobTitle)
    // TODO: Implement PDF generation
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
          <div className="stat-item">
            <div className="stat-value">{totalApps}</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{callbacks}</div>
            <div className="stat-label">Callbacks</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{applications.filter((a) => a.status === 'applied').length}</div>
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
              <div style={{
                background: '#1a1f2e',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid #1a1f2e'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  margin: '0 auto 1rem'
                }}>
                  1
                </div>
                <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Create Application</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                  Paste the job description and your resume
                </p>
              </div>

              {/* Step 2 */}
              <div style={{
                background: '#1a1f2e',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid #1a1f2e'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  margin: '0 auto 1rem'
                }}>
                  2
                </div>
                <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Select Tools</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                  Choose resume, cover letter, interview prep, and more
                </p>
              </div>

              {/* Step 3 */}
              <div style={{
                background: '#1a1f2e',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid #1a1f2e'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  margin: '0 auto 1rem'
                }}>
                  3
                </div>
                <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Download Package</h4>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
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
              <div>Date Applied</div>
              <div>Status</div>
              <div>Tools Used</div>
              <div>Actions</div>
            </div>

            {applications.map((app) => (
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
                    onClick={() => handleDownloadPackage(app)}
                    className="download-btn"
                  >
                    ⬇ Package
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
