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

function JobAnalyzerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 21H3V3h18v18z" />
      <path d="M3 12h18" />
      <path d="M12 3v18" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

// Landing Page (for unauthenticated users)
function LandingPage() {
  const { user } = useContext(AuthContext)

  // Only show landing page if not logged in
  if (user) return null

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '700', lineHeight: '1.1' }}>
            Land Your Dream Job
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.6' }}>
            Professional application materials in minutes, not hours
          </p>
          <p style={{ fontSize: '1.1rem', color: '#9ca3af', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            AI-powered tools that elevate your job search from start to finish
          </p>
          <a
            href="#tools"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
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
          </a>
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
            <div className="tool-cta">Learn more →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><CoverLetterIcon /></div>
            <h3>Cover Letter Generator</h3>
            <p>Create personalized cover letters for each role</p>
            <div className="tool-cta">Learn more →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><InterviewPrepIcon /></div>
            <h3>Interview Prep</h3>
            <p>Get tailored interview questions and answers</p>
            <div className="tool-cta">Learn more →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><LinkedInIcon /></div>
            <h3>LinkedIn Optimizer</h3>
            <p>Make your profile stand out to recruiters</p>
            <div className="tool-cta">Learn more →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><JobAnalyzerIcon /></div>
            <h3>Job Analyzer</h3>
            <p>Understand job requirements and keywords</p>
            <div className="tool-cta">Learn more →</div>
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
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.5rem', maxWidth: '150px' }}>
              Job description and resume
            </p>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 style={{ marginTop: '1rem' }}>AI Optimizes</h3>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.5rem', maxWidth: '150px' }}>
              15-30 seconds
            </p>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 style={{ marginTop: '1rem' }}>Download & Apply</h3>
            <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginTop: '0.5rem', maxWidth: '150px' }}>
              One complete PDF
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <a
            href="#signup"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
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
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ marginTop: '6rem', paddingTop: '2rem' }}>
        <p>elevaitr © 2025 • Elevate your job search</p>
      </footer>
    </div>
  )
}

// Auth Modal Component
function AuthModal({ isOpen, authPage, onAuthPageChange, onClose }) {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(10, 14, 23, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: '#0f1419',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        border: '1px solid #1a1f2e'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: '1.5rem',
            transition: 'color 0.2s ease',
            padding: 0
          }}
          onMouseOver={(e) => e.target.style.color = '#ef4444'}
          onMouseOut={(e) => e.target.style.color = '#9ca3af'}
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

// App Component with Theme and Auth
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

  // Default to light mode on landing page, dark mode when logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem('elevaitr-theme', 'light')
    }
  }, [user])

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>
  }

  // Not logged in - show landing page with navbar and auth modal
  if (!user) {
    return (
      <>
        <Navbar onSignInClick={() => setShowAuthModal(true)} />
        <LandingPage />
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
      <Navbar />
      
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
