import { useContext, useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { AuthContext } from './AuthContext'
import { ThemeContext } from './ThemeContext'
import { Help } from './Help'

export function Navbar({ onSignInClick }) {
  const { user, signOut } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [showHelp, setShowHelp] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  if (showHelp) {
    return <Help onBack={() => setShowHelp(false)} />
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: '#0a0e17',
      borderBottom: '1px solid #1a1f2e',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        background: 'linear-gradient(90deg, #60a5fa 0%, #3b82f6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.5px',
        flexShrink: 0
      }}>
        elevaitr
      </div>

      {/* Desktop Navigation - Hidden on Mobile */}
      <div style={{
        display: 'none'
      }} className="desktop-nav">
        {!user && (
          <a
            href="#pricing"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'color 0.2s ease',
              padding: 0,
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.color = '#60a5fa'}
            onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            Pricing
          </a>
        )}

        {/* Resources Button - Desktop */}
        <button
          onClick={() => setShowHelp(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.95rem',
            padding: 0,
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#60a5fa'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
        >
          Resources
        </button>
      </div>

      {/* Right side - Theme toggle, Hamburger, Sign In */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: theme === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(251, 146, 60, 0.2)',
            border: `2px solid ${theme === 'dark' ? '#60a5fa' : '#fb923c'}`,
            borderRadius: '20px',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '50px',
            justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start',
            minHeight: '44px'
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

        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            minWidth: '44px',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#60a5fa'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          className="mobile-menu-button"
        >
          {showMobileMenu ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        {/* Sign In / User Menu - Desktop */}
        {!user ? (
          <button
            onClick={onSignInClick}
            style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(96, 165, 250, 0.2)',
              minHeight: '44px',
              display: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.3)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 2px 6px rgba(96, 165, 250, 0.2)'
            }}
            className="desktop-sign-in"
          >
            Sign In
          </button>
        ) : (
          <>
            {/* User email - Desktop only */}
            <span style={{
              color: '#9ca3af',
              fontSize: '0.9rem',
              display: 'none'
            }} className="desktop-email">
              {user?.email}
            </span>

            {/* Sign out button - Desktop */}
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'color 0.2s ease',
                padding: '0.5rem',
                minHeight: '44px',
                display: 'none'
              }}
              onMouseOver={(e) => e.target.style.color = '#ef4444'}
              onMouseOut={(e) => e.target.style.color = '#9ca3af'}
              className="desktop-sign-out"
            >
              Sign Out
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu - Appears below navbar when open */}
      {showMobileMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#0f1419',
          borderBottom: '1px solid #1a1f2e',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1rem',
          zIndex: 99
        }}>
          {/* Pricing Link */}
          {!user && (
            <a
              href="#pricing"
              onClick={() => setShowMobileMenu(false)}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                padding: '0.75rem',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#60a5fa'
                e.target.style.background = 'rgba(96, 165, 250, 0.1)'
              }}
              onMouseOut={(e) => {
                e.target.style.color = 'var(--text-muted)'
                e.target.style.background = 'transparent'
              }}
            >
              Pricing
            </a>
          )}

          {/* Resources Button */}
          <button
            onClick={() => {
              setShowHelp(true)
              setShowMobileMenu(false)
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.95rem',
              padding: '0.75rem',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#60a5fa'
              e.target.style.background = 'rgba(96, 165, 250, 0.1)'
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'var(--text-muted)'
              e.target.style.background = 'transparent'
            }}
          >
            Resources
          </button>

          {/* Sign In Button */}
          {!user && (
            <button
              onClick={() => {
                onSignInClick()
                setShowMobileMenu(false)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.95rem',
                padding: '0.75rem',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#60a5fa'
                e.target.style.background = 'rgba(96, 165, 250, 0.1)'
              }}
              onMouseOut={(e) => {
                e.target.style.color = 'var(--text-muted)'
                e.target.style.background = 'transparent'
              }}
            >
              Sign In
            </button>
          )}

          {user && (
            <>
              <div style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                padding: '0.75rem',
                borderTop: '1px solid #1a1f2e',
                marginTop: '0.5rem'
              }}>
                {user?.email}
              </div>
              <button
                onClick={() => {
                  signOut()
                  setShowMobileMenu(false)
                }}
                style={{
                  background: 'none',
                  border: '2px solid #ef4444',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  minHeight: '44px',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(239, 68, 68, 0.1)'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent'
                }}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none !important;
          }
          .desktop-nav {
            display: flex !important;
            gap: 1.5rem;
            align-items: center;
          }
          .desktop-sign-in {
            display: inline-block !important;
          }
          .desktop-email {
            display: inline !important;
          }
          .desktop-sign-out {
            display: inline-block !important;
          }
        }
      `}</style>
    </nav>
  )
}
