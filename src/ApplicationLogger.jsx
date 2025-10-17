import { useState, useContext } from 'react'
import { AuthContext } from './AuthContext'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

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
    jobAnalyzer: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState('info') // 'info' or 'tools'

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
      // Call package generator API to get all outputs
      const toolsList = Object.keys(selectedTools).filter((k) => selectedTools[k])
      
      const packageResponse = await fetch('/api/generate-application-package', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, resume, tools: toolsList }),
      })

      if (!packageResponse.ok) {
        throw new Error('Failed to generate package outputs')
      }

      const packageData = await packageResponse.json()

      // Save application with outputs
      const db = getFirestore()
      const applicationData = {
        userId: user.uid,
        company,
        jobTitle,
        jobDescription,
        resume,
        toolsSelected: toolsList,
        outputs: packageData.outputs,
        status: 'applied',
        callbackReceived: false,
        dateApplied: new Date().toISOString(),
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'applications'), applicationData)
      onApplicationCreated()
      setStep('info')
      setCompany('')
      setJobTitle('')
      setJobDescription('')
      setResume('')
    } catch (err) {
      setError('Failed to save application: ' + err.message)
    } finally {
      setLoading(false)
    }
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
                placeholder="e.g., Google, Microsoft, Startup XYZ"
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
                placeholder="e.g., Product Manager, Software Engineer"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="form-textarea"
                required
              />
            </div>

            <div className="form-group">
              <label>Your Resume</label>
              <textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste your resume here..."
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
          <h3>Select Tools to Generate</h3>
          <p className="tool-instruction">Choose which tools you'd like to use for this application</p>

          <div className="tools-checklist">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.resume}
                onChange={() => toggleTool('resume')}
              />
              <span className="checkbox-label">Resume Optimizer</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.coverLetter}
                onChange={() => toggleTool('coverLetter')}
              />
              <span className="checkbox-label">Cover Letter Generator</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.interviewPrep}
                onChange={() => toggleTool('interviewPrep')}
              />
              <span className="checkbox-label">Interview Prep</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.linkedin}
                onChange={() => toggleTool('linkedin')}
              />
              <span className="checkbox-label">LinkedIn Optimizer</span>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTools.jobAnalyzer}
                onChange={() => toggleTool('jobAnalyzer')}
              />
              <span className="checkbox-label">Job Analyzer</span>
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="button-group">
            <button
              onClick={() => setStep('info')}
              className="btn-secondary"
            >
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
