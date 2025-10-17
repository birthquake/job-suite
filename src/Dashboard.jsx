import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { generateApplicationPDF } from './PDFGenerator'

export function Dashboard({ onStartApplication, onSignOut }) {
  const { user } = useContext(AuthContext)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    callbacks: 0,
    interviews: 0,
    offers: 0,
  })

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const db = getFirestore()
        const q = query(
          collection(db, 'applications'),
          where('userId', '==', user.uid)
        )
        const snapshot = await getDocs(q)
        const apps = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setApplications(apps)

        // Calculate stats
        const callbacks = apps.filter((app) => app.callbackReceived).length
        const interviews = apps.filter((app) => app.status === 'interviewed').length
        const offers = apps.filter((app) => app.status === 'offer').length

        setStats({
          total: apps.length,
          callbacks,
          interviews,
          offers,
        })
      } catch (err) {
        console.error('Error fetching applications:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [user])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>elevaitr Dashboard</h1>
        <div className="dashboard-actions">
          <button onClick={onStartApplication} className="btn-primary">
            + New Application
          </button>
          <button onClick={onSignOut} className="btn-secondary">
            Sign Out
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.callbacks}</div>
          <div className="stat-label">Callbacks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.interviews}</div>
          <div className="stat-label">Interviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.offers}</div>
          <div className="stat-label">Offers</div>
        </div>
      </div>

      <div className="applications-section">
        <h2>Your Applications</h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : applications.length === 0 ? (
          <div className="empty-state">
            <p>No applications yet.</p>
            <p>Click "New Application" to get started!</p>
          </div>
        ) : (
          <div className="applications-table">
            <div className="table-header">
              <div className="col-company">Company</div>
              <div className="col-position">Position</div>
              <div className="col-date">Date Applied</div>
              <div className="col-status">Status</div>
              <div className="col-callback">Callback</div>
              <div className="col-action">Action</div>
            </div>
            {applications.map((app) => (
              <div key={app.id} className="table-row">
                <div className="col-company">{app.company}</div>
                <div className="col-position">{app.jobTitle}</div>
                <div className="col-date">
                  {new Date(app.dateApplied).toLocaleDateString()}
                </div>
                <div className="col-status">{app.status || 'Applied'}</div>
                <div className="col-callback">
                  {app.callbackReceived ? '✓' : '-'}
                </div>
                <div className="col-action">
                  <button 
                    onClick={() => generateApplicationPDF(app)}
                    className="download-link"
                  >
                    ⬇ Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
