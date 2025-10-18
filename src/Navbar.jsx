import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { Help } from './Help'

export function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const [showHelp, setShowHelp] = useState(false)

  if (showHelp) {
    return <Help onBack={() => setShowHelp(false)} />
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: '#0a0e17',
      borderBottom: '1px solid #1a1f2e',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100
    }}>
      {/* Logo - Gradient Text */}
      <div style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        background: 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.5px'
      }}>
        elevaitr
      </div>

      {/* Center - empty for spacing */}
      <div></div>

      {/* Right side - User info and buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        {/* Help button */}
        <button
          onClick={() => setShowHelp(true)}
          style={{
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'color 0.2s ease',
            padding: 0
          }}
          onMouseOver={(e) => e.target.style.color = '#60a5fa'}
          onMouseOut={(e) => e.target.style.color = '#9ca3af'}
        >
          Help
        </button>

        {/* User email */}
        <span style={{
          color: '#9ca3af',
          fontSize: '0.95rem'
        }}>
          {user?.email}
        </span>

        {/* Sign out button */}
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'color 0.2s ease',
            padding: 0
          }}
          onMouseOver={(e) => e.target.style.color = '#ef4444'}
          onMouseOut={(e) => e.target.style.color = '#9ca3af'}
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}
