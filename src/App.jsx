import { useState } from 'react'
import './App.css'

export default function App() {
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
    <div className="container">
      <div className="header">
        <h1>Resume Optimizer</h1>
        <p>Get your resume optimized for ATS and impact in seconds</p>
      </div>

      <div className="content">
        {!optimized ? (
          <div className="input-section">
            <h2>Paste Your Resume</h2>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your entire resume here..."
              className="resume-input"
            />
            <button
              onClick={handleOptimize}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Optimizing...' : 'Optimize Resume'}
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        ) : (
          <div className="results-section">
            <h2>Your Optimized Resume</h2>
            <div className="result-box">
              <p>{optimized}</p>
            </div>
            <div className="button-group">
              <button onClick={handleDownload} className="btn btn-success">
                Download
              </button>
              <button
                onClick={() => {
                  setOptimized('')
                  setResume('')
                }}
                className="btn btn-secondary"
              >
                Optimize Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
