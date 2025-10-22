import { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { checkUsageAllowed, incrementUsage } from './usageUtils'
import { Paywall } from './Paywall'

export function ApplicationLogger({ onBack, onApplicationCreated }) {
  const { user } = useContext(AuthContext)
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')
  const [selectedTools, setSelectedTools] = useState({
    resume: true,
    coverLetter: true,
    interviewPrep: false,
    linkedin: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState('info')
  const [usageStatus, setUsageStatus] = useState(null)
  const [showPaywall, setShowPaywall] = useState(false)

  const toggleTool = (tool) => {
    setSelectedTools((prev) => ({
      ...prev,
      [tool]: !prev[tool],
    }))
  }

  const handleSaveApplication = async (e) => {
    e.preventDefault()
    setError('')

    if (!company.trim() || !jobTitle.trim() || !jobDescription.trim() || !resume.trim()) {
      setError('Please fill in all fields')
      return
    }

    if (!Object.values(selectedTools).some((v) => v)) {
      setError('Please select at least one tool')
      return
    }

    setLoading(true)

    try {
      // Check if user can create more applications
      const usage = await checkUsageAllowed(user.uid)
      setUsageStatus(usage)

      if (!usage.allowed) {
        setShowPaywall(true)
        setLoading(false)
        return
      }

      const db = getFirestore()
      
      // Call the API to generate all tool outputs
      const generateResponse = await fetch('/api/generate-application-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          resume,
          tools: Object.keys(selectedTools).filter((k) => selectedTools[k]),
        }),
      })

      if (!generateResponse.ok) {
        throw new Error('Failed to generate package')
      }

      const outputs = await generateResponse.json()

      const applicationData = {
        userId: user.uid,
        company,
        jobTitle,
        jobDescription,
        resume,
        toolsSelected: Object.keys(selectedTools).filter((k) => selectedTools[k]),
        outputs: outputs,
        status: 'applied',
        callbackReceived: false,
        dateApplied: new Date().toISOString(),
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'applications'), applicationData)
      
      // Increment usage for free tier users
      if (usage.tier === 'free') {
        await incrementUsage(user.uid)
      }

      // Brief success state before redirecting
      setLoading(false)
      setTimeout(() => {
        onApplicationCreated()
        setStep('info')
        setCompany('')
        setJobTitle('')
        setJobDescription('')
        setResume('')
      }, 500)
    } catch (err) {
      setLoading(false)
      setError('Failed to create application: ' + err.message)
    }
  }

  const handleUpgrade = (plan) => {
    window.location.href = plan === 'subscription' 
      ? 'https://elevaitr.lemonsqueezy.com/checkout/monthly'
      : 'https://elevaitr.lemonsqueezy.com/checkout/pay-per-use'
  }

  // Loading overlay component with micro-interactions
  const LoadingOverlay = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(10, 14, 23, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes progressPulse {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={{
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        {/* Spinner */}
        <div style={{
          width: '56px',
          height: '56px',
          margin: '0 auto 2rem',
          border: '4px solid rgba(96, 165, 250, 0.15)',
          borderTop: '4px solid #60a5fa',
          borderRadius: '50%',
          animation: 'spin 1.2s linear infinite'
        }}></div>
        {/* Loading message */}
        <h3 style={{
          color: '#ffffff',
          fontSize: '1.35rem',
          fontWeight: '600',
          margin: '0 0 0.75rem',
          letterSpacing: '0.3px'
        }}>
          Creating your package
        </h3>
        {/* Subtext */}
        <p style={{
          color: '#9ca3af',
          fontSize: '0.95rem',
          margin: '0.75rem 0 1.5rem',
          lineHeight: '1.5'
        }}>
          Generating optimized resume, cover letter, interview prep, and LinkedIn profile
        </p>
        {/* Progress indicator */}
        <div style={{
          width: '100%',
          height: '3px',
          background: 'rgba(96, 165, 250, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
            width: '100%',
            animation: 'progressPulse 2s ease-in-out infinite'
          }}></div>
        </div>
        {/* Estimated time */}
        <p style={{
          color: '#6b7280',
          fontSize: '0.85rem',
          margin: '0',
          fontStyle: 'italic'
        }}>
          Usually takes 15-30 seconds
        </p>
      </div>
    </div>
  )

  if (showPaywall) {
    return (
      <div className="logger-container">
        <button className="back-button" onClick={() => setShowPaywall(false)}>← Back</button>
        <Paywall onUpgrade={handleUpgrade} />
      </div>
    )
  }

  return (
    <div className="logger-container">
      {loading && <LoadingOverlay />}
      <div className="logger-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>New Application</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      {step === 'info' ? (
        <div className="logger-content">
          <h3>Application Details</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (company && jobTitle && jobDescription && resume) {
                setStep('tools')
              } else {
                setError('Please fill in all fields')
              }
            }}
          >
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Google, Microsoft"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Product Manager"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description..."
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group">
              <label>Your Resume</label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume..."
                className="form-textarea"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-primary">
              Next: Select Tools
            </button>
          </form>
        </div>
      ) : (
        <div className="logger-content">
          <h3>Select Your Package Tools</h3>
          <p className="tool-instruction">
            Select the tools you'd like to include in your application package. All selected tools will be combined into a single PDF.
          </p>

          <div className="tools-checklist">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.resume}
                onChange={() => toggleTool('resume')}
              />
              <div>
                <span style={{ fontWeight: '600', display: 'block' }}>Resume (ATS-optimized)</span>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem', marginBottom: 0 }}>
                  Enhances your existing experience with stronger language and ATS compatibility. Won't fabricate achievements.
                </p>
              </div>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.coverLetter}
                onChange={() => toggleTool('coverLetter')}
              />
              <div>
                <span style={{ fontWeight: '600', display: 'block' }}>Cover Letter (customized)</span>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem', marginBottom: 0 }}>
                  Creates a personalized letter based on your actual resume. Works best with relevant experience for the role.
                </p>
              </div>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.interviewPrep}
                onChange={() => toggleTool('interviewPrep')}
              />
              <div>
                <span style={{ fontWeight: '600', display: 'block' }}>Interview Prep (10 Q&A)</span>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem', marginBottom: 0 }}>
                  Generates realistic interview questions with talking points grounded in your actual experience.
                </p>
              </div>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.linkedin}
                onChange={() => toggleTool('linkedin')}
              />
              <div>
                <span style={{ fontWeight: '600', display: 'block' }}>LinkedIn (headline & summary)</span>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.25rem', marginBottom: 0 }}>
                  Tailored profile copy for this specific opportunity. Uses only information from your resume.
                </p>
              </div>
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="button-group">
            <button onClick={() => setStep('info')} className="btn-secondary">
              ← Back
            </button>
            <button
              onClick={handleSaveApplication}
              disabled={loading}
              className="btn-primary"
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Creating...' : 'Create Application'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
