import { useState, useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { ThemeContext, ThemeProvider } from './ThemeContext'
import { LoginPage, SignUpPage } from './AuthPages'
import { Navbar } from './Navbar'
import { Dashboard } from './Dashboard'
import { ApplicationLogger } from './ApplicationLogger'
import './App.css'

// SVG Icons
function ResumeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  )
}

function CoverLetterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="14" y2="16" />
    </svg>
  )
}

function InterviewPrepIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9" y2="9.01" />
      <line x1="15" y1="9" x2="15" y2="9.01" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// Scroll to section helper function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Landing Page
function LandingPage({ onScrollToSection }) {
  const { user } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)

  if (user) return null

  // Theme-aware SVG background colors
  const bgFill = theme === 'dark' ? '#0a0e17' : '#ffffff'

  return (
    <div className="landing">
      {/* Fixed Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <svg
          viewBox="0 0 1200 900"
          style={{
            width: '100%',
            height: '100%',
            preserveAspectRatio: 'xMidYMid slice'
          }}
        >
          <defs>
            <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            </filter>
            <radialGradient id="grad1" cx="30%" cy="20%">
              <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
            </radialGradient>
            <radialGradient id="grad2" cx="70%" cy="70%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.2 }} />
            </radialGradient>
            <radialGradient id="grad3" cx="50%" cy="50%">
              <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
            </radialGradient>
          </defs>

          {/* Background base - theme-aware */}
          <rect width="1200" height="900" fill={bgFill} />

          {/* Blurred shapes - repositioned for viewport */}
          <circle cx="600" cy="150" r="400" fill="url(#grad1)" filter="url(#blur)" />
          <circle cx="100" cy="400" r="350" fill="url(#grad2)" filter="url(#blur)" />
          <circle cx="1100" cy="500" r="380" fill="url(#grad1)" filter="url(#blur)" />
          <circle cx="400" cy="750" r="320" fill="url(#grad3)" filter="url(#blur)" />
          <circle cx="900" cy="850" r="360" fill="url(#grad2)" filter="url(#blur)" />
        </svg>
      </div>
      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '700', lineHeight: '1.1' }}>
            Land Your Dream Job
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
            Professional application materials in minutes, not hours
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            AI-powered tools that elevate your job search from start to finish
          </p>
          <button
            onClick={() => onScrollToSection('tools')}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 20px rgba(96, 165, 250, 0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.3)'
            }}
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section" id="tools" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h2 style={{ marginBottom: '3rem' }}>Your Application Toolkit</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon"><ResumeIcon /></div>
            <h3>Resume Optimizer</h3>
            <p>Improve your resume for ATS and recruiter impact</p>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><CoverLetterIcon /></div>
            <h3>Cover Letter Generator</h3>
            <p>Create personalized cover letters for each role</p>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><InterviewPrepIcon /></div>
            <h3>Interview Prep</h3>
            <p>Get tailored interview questions and answers</p>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><LinkedInIcon /></div>
            <h3>LinkedIn Optimizer</h3>
            <p>Make your profile stand out to recruiters</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section" id="how" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '3rem' }}>How It Works</h2>
        <div className="steps-wrapper">
          <div className="step">
            <div className="step-number">1</div>
            <h3 style={{ marginTop: '1rem' }}>Paste Your Info</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '150px' }}>
              Job description and resume
            </p>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 style={{ marginTop: '1rem' }}>AI Optimizes</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '150px' }}>
              15-30 seconds
            </p>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 style={{ marginTop: '1rem' }}>Download & Apply</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem', maxWidth: '150px' }}>
              One complete PDF
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <button
            onClick={() => onScrollToSection('pricing')}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 20px rgba(96, 165, 250, 0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.3)'
            }}
          >
            Start Free Today
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Choose the plan that works for you. Upgrade or downgrade anytime.
        </p>
        <div className="pricing-grid">
          {/* Free Plan */}
          <div className="pricing-wrapper">
            <h3>Free</h3>
            <div className="price"><span className="period">$</span>0<span className="period">/month</span></div>
            <p className="price-desc">3 application trial</p>

            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>3 applications total</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>All 4 tools included</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>Single PDF downloads</span>
              </p>
            </div>

            <button style={{
              background: 'none',
              border: '2px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              width: '100%',
              minHeight: '44px'
            }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--accent-primary)'
                e.target.style.color = 'white'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'none'
                e.target.style.color = 'var(--accent-primary)'
              }}>
              Get Started
            </button>
          </div>

          {/* Pay Per Use Plan */}
          <div className="pricing-wrapper">
            <h3>Pay Per Use</h3>
            <div className="price"><span className="period">$</span>2.99<span className="period">/application</span></div>
            <p className="price-desc">Pay as you go</p>

            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>$2.99 per application</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>All 4 tools included</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>No monthly commitment</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>Cancel anytime</span>
              </p>
            </div>

            <button style={{
              background: 'none',
              border: '2px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              width: '100%',
              minHeight: '44px'
            }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--accent-primary)'
                e.target.style.color = 'white'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'none'
                e.target.style.color = 'var(--accent-primary)'
              }}>
              Get Started
            </button>
          </div>

          {/* Monthly Plan */}
          <div className="pricing-wrapper" style={{ borderColor: 'var(--accent-primary)', background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: '600',
                display: 'inline-block',
                boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)'
              }}>
                Most Popular
              </span>
            </div>
            <h3>Monthly</h3>
            <div className="price"><span className="period">$</span>4.99<span className="period">/month</span></div>
            <p className="price-desc">Unlimited applications</p>

            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>Unlimited applications</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>All 4 tools included</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>Cancel anytime</span>
              </p>
              <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center' }}>
                ✓ <span style={{ marginLeft: '0.5rem' }}>Best value</span>
              </p>
            </div>

            <button style={{
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              width: '100%',
              minHeight: '44px',
              boxShadow: '0 4px 12px rgba(96, 165, 250, 0.2)'
            }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 20px rgba(96, 165, 250, 0.3)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px rgba(96, 165, 250, 0.2)'
              }}>
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '2rem',
        border: '1px solid var(--border-light)'
      }}>
        <h3 style={{ textAlign: 'center', marginTop: 0 }}>Frequently Asked Questions</h3>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Can I change plans anytime?</h4>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Yes. Upgrade, downgrade, or cancel your subscription anytime with no penalty.</p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Do I need a credit card for the free tier?</h4>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>No credit card required. Start with 3 free applications.</p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>What happens if I exceed my free applications?</h4>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>You'll be prompted to upgrade. Your applications and progress are saved—no data loss.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Auth Modal Component
function AuthModal({ isOpen, authPage, onAuthPageChange, onClose }) {
  const { theme } = useContext(ThemeContext)

  if (!isOpen) return null

  // Theme-aware overlay background
  const overlayBg = theme === 'dark' ? 'rgba(10, 14, 23, 0.7)' : 'rgba(15, 23, 42, 0.5)'
  const modalBg = theme === 'dark' ? 'rgba(15, 20, 25, 0.8)' : 'rgba(255, 255, 255, 0.9)'

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: overlayBg,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.3s ease-out',
        padding: '1rem',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (min-width: 768px) {
          .auth-modal-overlay {
            align-items: center !important;
          }
        }
      `}</style>
      <div 
        style={{
          background: modalBg,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '12px',
          padding: '1.5rem',
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(96, 165, 250, 0.1)',
          transition: 'all 0.3s ease',
          cursor: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '1.75rem',
            transition: 'all 0.2s ease',
            padding: '0.5rem',
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.target.style.color = '#ef4444'
            e.target.style.transform = 'scale(1.1)'
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'var(--text-muted)'
            e.target.style.transform = 'scale(1)'
          }}
        >
          ✕
        </button>

        {/* Gradient Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
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

        {/* Auth Form */}
        {authPage === 'login' ? (
          <LoginPage onSignUpClick={() => onAuthPageChange('signup')} />
        ) : (
          <SignUpPage onLoginClick={() => onAuthPageChange('login')} />
        )}
      </div>
    </div>
  )
}

// Main App Content (with hooks)
function AppContent() {
  const { user, loading } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [authPage, setAuthPage] = useState('login')
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Set theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Close auth modal when user state changes
  useEffect(() => {
    setShowAuthModal(false)
  }, [user])

  // Scroll to top on page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [user, currentPage])

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>
  }

  // Not logged in - show landing page with navbar and auth modal
  if (!user) {
    return (
      <>
        <Navbar 
          onSignInClick={() => setShowAuthModal(true)}
          onScrollToSection={scrollToSection}
        />
        <LandingPage onScrollToSection={scrollToSection} />
        <AuthModal
          isOpen={showAuthModal}
          authPage={authPage}
          onAuthPageChange={setAuthPage}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    )
  }

  // User is logged in - application workflow
  return (
    <div className="app-wrapper">
      <Navbar onSignInClick={() => setShowAuthModal(true)} />
      
      <div className="app">
        {currentPage === 'dashboard' && (
          <Dashboard onStartApplication={() => setCurrentPage('new-application')} />
        )}
        {currentPage === 'new-application' && (
          <ApplicationLogger 
            onBack={() => setCurrentPage('dashboard')} 
            onApplicationCreated={() => setCurrentPage('dashboard')} 
          />
        )}
      </div>
    </div>
  )
}

// Main App Component with Theme Provider
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
