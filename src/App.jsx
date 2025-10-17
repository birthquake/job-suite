import { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
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
  return (
    <div className="landing">
      <section className="hero-section">
        <h1>Land Your Dream Job</h1>
        <p>Professional resume and cover letter in minutes</p>
        <p style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>AI-powered tools that elevate your job application from start to finish</p>
      </section>

      <section className="tools-section">
        <h2>Your Application Toolkit</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon"><ResumeIcon /></div>
            <h3>Resume Optimizer</h3>
            <p>Improve your resume for ATS and recruiter impact</p>
            <div className="tool-cta">Optimize resume →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><CoverLetterIcon /></div>
            <h3>Cover Letter Generator</h3>
            <p>Create personalized cover letters for each role</p>
            <div className="tool-cta">Generate letter →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><InterviewPrepIcon /></div>
            <h3>Interview Prep</h3>
            <p>Get tailored interview questions and answers</p>
            <div className="tool-cta">Prepare →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><LinkedInIcon /></div>
            <h3>LinkedIn Optimizer</h3>
            <p>Make your profile stand out to recruiters</p>
            <div className="tool-cta">Optimize profile →</div>
          </div>

          <div className="tool-card">
            <div className="tool-icon"><JobAnalyzerIcon /></div>
            <h3>Job Analyzer</h3>
            <p>Understand job requirements and keywords</p>
            <div className="tool-cta">Analyze job →</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <h2>How It Works</h2>
        <div className="steps-wrapper">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Paste Your Info</h3>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Optimizes</h3>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Download & Apply</h3>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>elevaitr © 2025 • Elevate your job search</p>
      </footer>
    </div>
  )
}

// Main App Component
export default function App() {
  const { user, loading } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [authPage, setAuthPage] = useState('login')

  if (loading) {
    return <div className="loading-container"><p>Loading...</p></div>
  }

  // Not logged in - show landing page + auth
  if (!user) {
    return (
      <>
        <LandingPage />
        {authPage === 'login' ? (
          <LoginPage onSignUpClick={() => setAuthPage('signup')} />
        ) : (
          <SignUpPage onLoginClick={() => setAuthPage('login')} />
        )}
      </>
    )
  }

  // User is logged in - application workflow
  return (
    <div className="app-wrapper">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
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
