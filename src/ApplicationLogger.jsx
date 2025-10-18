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

      onApplicationCreated()
      setStep('info')
      setCompany('')
      setJobTitle('')
      setJobDescription('')
      setResume('')
    } catch (err) {
      setError('Failed to create application: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = (plan) => {
    // For now, redirect to Lemonsqueezy
    // We'll add this in the next step
    window.location.href = plan === 'subscription' 
      ? 'https://elevaitr.lemonsqueezy.com/checkout/monthly'
      : 'https://elevaitr.lemonsqueezy.com/checkout/pay-per-use'
  }

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
              <span>Resume (ATS-optimized)</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.coverLetter}
                onChange={() => toggleTool('coverLetter')}
              />
              <span>Cover Letter (customized)</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.interviewPrep}
                onChange={() => toggleTool('interviewPrep')}
              />
              <span>Interview Prep (10 Q&A)</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.linkedin}
                onChange={() => toggleTool('linkedin')}
              />
              <span>LinkedIn (headline & summary)</span>
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="button-group">
            <button onClick={() => setStep('info')} className="btn-secondary">
              Back
            </button>
            <button
              onClick={handleSaveApplication}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Creating...' : 'Create Application'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
