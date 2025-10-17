import { useState } from 'react'
import './App.css'

const ResumeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="28" height="32" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="22" x2="26" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const CoverLetterIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="6" width="30" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 12H35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 18L20 26L32 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

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
        </div>
        <div className="hero-glow"></div>
      </section>

      <section className="tools-section" id="tools">
        <h2>Your Application Toolkit</h2>
        <div className="tools-grid">
          <div className="tool-card" onClick={() => onSelectTool('resume')}>
            <div className="tool-icon-wrapper">
              <ResumeIcon />
            </div>
            <h3>Resume Optimizer</h3>
            <p>Transform your resume into an ATS-optimized masterpiece with stronger language and better formatting</p>
            <div className="tool-cta">Start optimizing →</div>
          </div>

          <div className="tool-card" onClick={() => onSelectTool('cover-letter')}>
            <div className="tool-icon-wrapper">
              <CoverLetterIcon />
            </div>
            <h3>Cover Letter Generator</h3>
            <p>Create compelling, personalized cover letters that match the job description and showcase your value</p>
            <div className="tool-cta">Create letter →</div>
          </div>

          <div className="tool-card" onClick={() => onSelectTool('interview-prep')}>
            <div className="tool-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 20C8 16.5 12 14 20 14C28 14 32 16.5 32 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 26C12 23 15 21 20 21C25 21 28 23 28 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M20 26V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Interview Prep</h3>
            <p>Generate likely interview questions tailored to the role with answer frameworks based on your experience</p>
            <div className="tool-cta">Prepare now →</div>
          </div>

          <div className="tool-card" onClick={() => onSelectTool('linkedin')}>
            <div className="tool-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="8" width="28" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="14" r="2" fill="currentColor"/>
                <path d="M10 17H14V28H10Z" fill="currentColor"/>
                <path d="M18 17H22V28H18Z" fill="currentColor"/>
                <path d="M26 17H30V28H26Z" fill="currentColor"/>
              </svg>
            </div>
            <h3>LinkedIn Optimizer</h3>
            <p>Enhance your LinkedIn profile for recruiter visibility with stronger headlines, compelling about sections, and optimized keywords</p>
            <div className="tool-cta">Optimize profile →</div>
          </div>

          <div className="tool-card" onClick={() => onSelectTool('job-analyzer')}>
            <div className="tool-icon-wrapper">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="28" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="10" y1="26" x2="30" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Job Analyzer</h3>
            <p>Decode job postings to extract required skills, keywords, and application strategy to tailor your materials perfectly</p>
            <div className="tool-cta">Analyze job →</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <h2>How It Works</h2>
        <div className="steps-wrapper">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Paste Your Info</h4>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>AI Optimizes</h4>
          </div>
          <div className="step-connector">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Download & Apply</h4>
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      })

      if (!response.ok) throw new Error('Failed to optimize resume')
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
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your entire resume here..." className="resume-input" />
          <button onClick={handleOptimize} disabled={loading} className="optimize-button">{loading ? 'Optimizing...' : 'Optimize Resume'}</button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Your Optimized Resume</h3>
          <div className="result-box"><p>{optimized}</p></div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">⬇ Download Resume</button>
            <button onClick={() => { setOptimized(''); setResume(''); }} className="optimize-again-button">Optimize Another</button>
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, resume }),
      })

      if (!response.ok) throw new Error('Failed to generate cover letter')
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
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="resume-input" />
          </div>
          <div className="input-group">
            <label>Your Resume</label>
            <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume here..." className="resume-input" />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="optimize-button">{loading ? 'Generating...' : 'Generate Cover Letter'}</button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Your Cover Letter</h3>
          <div className="result-box"><p>{coverLetter}</p></div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">⬇ Download Letter</button>
            <button onClick={() => { setCoverLetter(''); setJobDescription(''); setResume(''); }} className="optimize-again-button">Create Another</button>
          </div>
        </div>
      )}
    </div>
  )
}

function InterviewPrep({ onBack }) {
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')
  const [interviewPrep, setInterviewPrep] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      setError('Please provide both job description and resume')
      return
    }

    setLoading(true)
    setError('')
    setInterviewPrep('')

    try {
      const response = await fetch('/api/generate-interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, resume }),
      })

      if (!response.ok) throw new Error('Failed to generate interview prep')
      const data = await response.json()
      setInterviewPrep(data.interviewPrep)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([interviewPrep], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'interview-prep.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="tool-container">
      <div className="tool-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Interview Prep</h2>
        <div style={{ width: '60px' }}></div>
      </div>
      {!interviewPrep ? (
        <div className="tool-content input-section">
          <h3>Prepare for Your Interview</h3>
          <p className="section-description">Paste the job description and your resume, and we'll generate likely interview questions with answer frameworks</p>
          <div className="input-group">
            <label>Job Description</label>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="resume-input" />
          </div>
          <div className="input-group">
            <label>Your Resume</label>
            <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste your resume here..." className="resume-input" />
          </div>
          <button onClick={handleGenerate} disabled={loading} className="optimize-button">{loading ? 'Generating...' : 'Generate Interview Questions'}</button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Your Interview Prep Guide</h3>
          <div className="result-box"><p>{interviewPrep}</p></div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">⬇ Download Guide</button>
            <button onClick={() => { setInterviewPrep(''); setJobDescription(''); setResume(''); }} className="optimize-again-button">Create Another</button>
          </div>
        </div>
      )}
    </div>
  )
}

function LinkedInOptimizer({ onBack }) {
  const [profile, setProfile] = useState('')
  const [optimized, setOptimized] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOptimize = async () => {
    if (!profile.trim()) {
      setError('Please paste your LinkedIn profile first')
      return
    }

    setLoading(true)
    setError('')
    setOptimized('')

    try {
      const response = await fetch('/api/optimize-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedinProfile: profile }),
      })

      if (!response.ok) throw new Error('Failed to optimize profile')
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
    element.download = 'optimized-linkedin.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="tool-container">
      <div className="tool-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>LinkedIn Profile Optimizer</h2>
        <div style={{ width: '60px' }}></div>
      </div>
      {!optimized ? (
        <div className="tool-content input-section">
          <h3>Paste Your LinkedIn Profile</h3>
          <p className="section-description">Share your LinkedIn profile text and we'll optimize it for recruiter visibility and engagement</p>
          <textarea value={profile} onChange={(e) => setProfile(e.target.value)} placeholder="Paste your LinkedIn profile here..." className="resume-input" />
          <button onClick={handleOptimize} disabled={loading} className="optimize-button">{loading ? 'Optimizing...' : 'Optimize Profile'}</button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Your Optimized LinkedIn Profile</h3>
          <div className="result-box"><p>{optimized}</p></div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">⬇ Download Profile</button>
            <button onClick={() => { setOptimized(''); setProfile(''); }} className="optimize-again-button">Optimize Another</button>
          </div>
        </div>
      )}
    </div>
  )
}

function JobAnalyzer({ onBack }) {
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description first')
      return
    }

    setLoading(true)
    setError('')
    setAnalysis('')

    try {
      const response = await fetch('/api/analyze-job-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      })

      if (!response.ok) throw new Error('Failed to analyze job description')
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([analysis], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'job-analysis.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="tool-container">
      <div className="tool-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Job Description Analyzer</h2>
        <div style={{ width: '60px' }}></div>
      </div>
      {!analysis ? (
        <div className="tool-content input-section">
          <h3>Analyze a Job Description</h3>
          <p className="section-description">Paste a job posting and we'll extract key skills, responsibilities, keywords, and application strategy</p>
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." className="resume-input" />
          <button onClick={handleAnalyze} disabled={loading} className="optimize-button">{loading ? 'Analyzing...' : 'Analyze Job'}</button>
          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="tool-content results-section">
          <h3>Job Analysis</h3>
          <div className="result-box"><p>{analysis}</p></div>
          <div className="button-group">
            <button onClick={handleDownload} className="download-button">⬇ Download Analysis</button>
            <button onClick={() => { setAnalysis(''); setJobDescription(''); }} className="optimize-again-button">Analyze Another</button>
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
      {currentPage === 'landing' && <LandingPage onSelectTool={setCurrentPage} />}
      {currentPage === 'resume' && <ResumeOptimizer onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'cover-letter' && <CoverLetterGenerator onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'interview-prep' && <InterviewPrep onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'linkedin' && <LinkedInOptimizer onBack={() => setCurrentPage('landing')} />}
      {currentPage === 'job-analyzer' && <JobAnalyzer onBack={() => setCurrentPage('landing')} />}
    </div>
  )
}
