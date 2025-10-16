import { useState } from 'react'
import './App.css'

function LandingPage({ onSelectTool }) {
  return (
    <div className="landing">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">elevaitr</div>
          <div className="nav-links">
            <a href="#tools">Tools</a>
            <a href="#how">How it works</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Land Your Dream Job</h1>
          <p>Professional resume and cover letter in minutes</p>
          <p className="hero-subtitle">
            AI-powered tools that elevate your job application from start to finish
          </p>
          <button 
            className="cta-button"
            onClick={() => onSelectTool('resume')}
          >
            Get Started
          </button>
        </div>
        <div className="hero-glow"></div>
      </section>

      <section className="tools-section" id="tools">
        <h2>Your Application Toolkit</h2>
        <div className="tools-grid">
          <div className="tool-card" onClick={() => onSelectTool('resume')}>
            <div className="tool-icon">📄</div>
            <h3>Resume Optimizer</h3>
            <p>Transform your resume into an ATS-optimized masterpiece with stronger language and better formatting</p>
            <div className="tool-cta">Start optimizing →</div>
          </div>

          <div className="tool-card" onClick={() => onSelectTool('cover-letter')}>
            <div className="tool-icon">✍️</div>
            <h3>Cover Letter Generator</h3>
            <p>Create compelling, personalized cover letters that match the job description and showcase your value</p>
            <div className="tool-cta">Create letter →</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Paste Your Info</h4>
            <p>Share your resume or job details</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>AI Optimizes</h4>
            <p>Claude improves clarity and impact</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Download & Apply</h4>
            <p>Use your polished application</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>elevaitr © 2025 • Elevate your job search</p>
      </footer>
    </div>
  )
}

function ResumeOptimizer({ onBack }) {
  const [resume, setResume] = useState('')
  const [optimized, setOptimized] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOptimize = async () => {
    if (!resume.trim()) {
      setError('Please paste your resume first')
      return
    }

    setLoading(true)
    setError('')
    setOptimized('')

    try {
      const response = await fetch('/api/optimize-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume }),
      })

      if (!response.ok) {
        throw new Error('Failed to optimize resume')
      }

      const data = await response.json()
      setOptimized(data.optimized)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([optimized], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'optimized-resume.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="tool-container">
      <div className="tool-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Resume Optimizer</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      {!optimized ? (
        <div className="tool-content input-section">
          <h3>Paste Your Resume</h3>
          <p className="section-description">Share your current resume and we'll optimize it for impact and ATS compatibility</p>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your entire resume here..."
            className="resume-input"
          />
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="optimize-button"
          >
            {loading ? 'Optimizing...' : 'Optimize Resume'}
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Your Optimized Resume</h3>
          <div className="result-box">
            <p>{optimized}</p>
          </div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">
              ⬇ Download Resume
            </button>
            <button
              onClick={() => {
                setOptimized('')
                setResume('')
              }}
              className="optimize-again-button"
            >
              Optimize Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CoverLetterGenerator({ onBack }) {
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      setError('Please provide both job description and resume')
      return
    }

    setLoading(true)
    setError('')
    setCoverLetter('')

    try {
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobDescription, resume }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate cover letter')
      }

      const data = await response.json()
      setCoverLetter(data.coverLetter)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([coverLetter], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'cover-letter.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="tool-container">
      <div className="tool-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Cover Letter Generator</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      {!coverLetter ? (
        <div className="tool-content input-section">
          <h3>Create Your Cover Letter</h3>
          <p className="section-description">Paste the job description and your resume, and we'll generate a personalized cover letter</p>
          
          <div className="input-group">
            <label>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="resume-input"
            />
          </div>

          <div className="input-group">
            <label>Your Resume</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume here..."
              className="resume-input"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="optimize-button"
          >
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Your Cover Letter</h3>
          <div className="result-box">
            <p>{coverLetter}</p>
          </div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">
              ⬇ Download Letter
            </button>
            <button
              onClick={() => {
                setCoverLetter('')
                setJobDescription('')
                setResume('')
              }}
              className="optimize-again-button"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <LandingPage onSelectTool={setCurrentPage} />
      )}
      {currentPage === 'resume' && (
        <ResumeOptimizer onBack={() => setCurrentPage('landing')} />
      )}
      {currentPage === 'cover-letter' && (
        <CoverLetterGenerator onBack={() => setCurrentPage('landing')} />
      )}
    </div>
  )
}
