import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function Navbar({ currentPage, onNavigate }) {
  const { user, signOut } = useContext(AuthContext)

  const handleLogo = () => {
    if (user) {
      onNavigate('dashboard')
    } else {
      onNavigate('landing')
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button onClick={handleLogo} className="navbar-logo">
          elevaitr
        </button>

        {user && (
          <div className="navbar-right">
            <span className="navbar-email">{user.email}</span>
            <button onClick={handleSignOut} className="navbar-logout">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
