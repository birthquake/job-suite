import { useContext, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { AuthContext } from './AuthContext'
import { ThemeContext } from './ThemeContext'
import { Help } from './Help'

export function Navbar({ onSignInClick }) {
  const { user, signOut } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
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
        {/* Theme Toggle Switch */}
        <button
          onClick={toggleTheme}
          style={{
            background: theme === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(251, 146, 60, 0.2)',
            border: `2px solid ${theme === 'dark' ? '#60a5fa' : '#fb923c'}`,
            borderRadius: '20px',
            padding: '0.5rem 0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '60px',
            justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = `0 0 12px ${theme === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(251, 146, 60, 0.3)'}`
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = 'none'
          }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun size={18} color="#60a5fa" strokeWidth={2.5} />
          ) : (
            <Moon size={18} color="#fb923c" strokeWidth={2.5} />
          )}
        </button>

        {/* Help button */}
        <button
          onClick={() => setShowHelp(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            transition: 'color 0.2s ease',
            padding: 0
          }}
          onMouseOver={(e) => e.target.style.color = '#60a5fa'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          Help
        </button>

        {/* Conditional: Sign In or User Info + Sign Out */}
        {!user ? (
          <button
            onClick={onSignInClick}
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1.25rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(96, 165, 250, 0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 2px 6px rgba(96, 165, 250, 0.2)'
            }}
          >
            Sign In
          </button>
        ) : (
          <>
            {/* User email */}
            <span style={{
              color: '#9ca3af',
              fontSize: '0.95rem'
            }}>
              {user?.email}
            </span>

            {/* Sign out button */}
            <button
              onClick={signOut}
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
          </>
        )}
      </div>
    </nav>
  )
}
