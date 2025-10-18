import { useState } from 'react'

export function Help({ onBack }) {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "Why did my cover letter fail to generate?",
      answer: "Cover letters require relevant experience from your resume that matches the job. If your resume lacks specific experience related to the role, the AI will decline to fabricate accomplishments. Review your resume to ensure it includes relevant experience, then try again."
    },
    {
      question: "What does 'don't fabricate' mean?",
      answer: "It means the AI won't invent achievements, metrics, or skills you didn't mention in your resume. All outputs are based only on information you provide. This ensures your application materials are honest and defensible in interviews."
    },
    {
      question: "How detailed should my resume be?",
      answer: "More detail is better. Include specific responsibilities, measurable achievements if possible, and relevant technologies or tools you've used. Vague descriptions like 'did various tasks' won't give the AI enough material to work with. Add context wherever you can."
    },
    {
      question: "Will the AI add metrics to my resume?",
      answer: "No. The AI only enhances language and clarity around existing information. If you achieved a 20% improvement, you need to mention it in your original resume. The optimizer won't invent numbers or statistics."
    },
    {
      question: "What if interview prep flags gaps in my experience?",
      answer: "This is intentional and helpful. Interview prep will honestly assess your resume and point out areas where you may struggle based on job requirements. Use this as feedback to strengthen your actual experience or be prepared to address gaps in interviews."
    },
    {
      question: "What's the difference between the tools?",
      answer: "Resume: Optimizes language and ATS compatibility. Cover Letter: Personalizes based on your experience and the role. Interview Prep: Generates questions and talking points tailored to the job. LinkedIn: Creates a headline and summary for this specific opportunity."
    },
    {
      question: "How long does it take to generate a package?",
      answer: "Usually 15-30 seconds depending on resume length and complexity. The system calls AI for each tool sequentially, so longer resumes or more tools may take slightly longer."
    },
    {
      question: "Can I edit the outputs after generation?",
      answer: "You can view, save, and use the outputs from your PDF. If you want to modify and regenerate, update your resume or job description, then create a new application with the same parameters."
    },
    {
      question: "Do I need a specific job posting?",
      answer: "You need to provide a job description for each application, but it doesn't have to be from a real posting. You can use a sample job description, a template, or a general role description that matches your target position. The more specific your job description, the better tailored your package will be."
    }
  ]

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'auto',
      background: '#0a0e17',
      color: '#e5e7eb',
      padding: '2rem',
      zIndex: 50
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: '#60a5fa',
              cursor: 'pointer',
              fontSize: '1rem',
              marginRight: '1rem',
              padding: 0,
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#93c5fd'}
            onMouseOut={(e) => e.target.style.color = '#60a5fa'}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff', margin: 0 }}>
            Help & Resources
          </h1>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#60a5fa', marginBottom: '1.5rem', fontWeight: '700' }}>
            Our Tools
          </h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="step-card">
              <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '0.5rem' }}>Resume Optimizer</h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                Enhances your existing resume by improving language, clarity, and ATS compatibility. Uses stronger action verbs, better formatting, and proven resume strategies—but only enhances what you provide. Won't fabricate achievements or metrics.
              </p>
            </div>

            <div className="step-card">
              <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '0.5rem' }}>Cover Letter Generator</h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                Creates a personalized cover letter tailored to the specific job and your experience. Matches your resume to the job requirements and articulates why you're a good fit. Works best when your resume has relevant experience for the role.
              </p>
            </div>

            <div className="step-card">
              <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '0.5rem' }}>Interview Prep</h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                Generates 10 interview questions tailored to the specific role with talking points based on your actual resume. Questions are realistic and designed to help you prepare authentic, experience-backed answers. May flag resume gaps as preparation feedback.
              </p>
            </div>

            <div className="step-card">
              <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '0.5rem' }}>LinkedIn Optimizer</h3>
              <p style={{ color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
                Generates a targeted headline and professional summary for this specific job opportunity. Also suggests 3-5 key skills to highlight on your profile. All content is drawn from your resume to maintain authenticity.
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#60a5fa', marginBottom: '1.5rem', fontWeight: '700' }}>
            Best Practices
          </h2>

          <div style={{
            background: '#0f1419',
            border: '1px solid #1a1f2e',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}>
            <h4 style={{ color: '#ffffff', marginTop: 0, marginBottom: '1rem', fontWeight: '600' }}>Resume Tips</h4>
            <ul style={{ color: '#9ca3af', lineHeight: '1.8', paddingLeft: '1.5rem', margin: 0, marginBottom: '1.5rem' }}>
              <li>Include specific responsibilities and measurable achievements when possible</li>
              <li>List relevant technologies, tools, and methodologies you've used</li>
              <li>Describe responsibilities clearly—avoid vague phrases</li>
              <li>Include your most recent experience and education</li>
              <li>Use industry terminology that matches the job posting</li>
            </ul>

            <h4 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Job Description Tips</h4>
            <ul style={{ color: '#9ca3af', lineHeight: '1.8', paddingLeft: '1.5rem', margin: 0, marginBottom: '1.5rem' }}>
              <li>Paste the complete job description, not just the title</li>
              <li>Include requirements, responsibilities, and qualifications</li>
              <li>Clean up any formatting issues before pasting</li>
              <li>Use the exact posting to ensure accurate analysis</li>
            </ul>

            <h4 style={{ color: '#ffffff', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>General Tips</h4>
            <ul style={{ color: '#9ca3af', lineHeight: '1.8', paddingLeft: '1.5rem', margin: 0 }}>
              <li>Review all outputs before submitting—customize as needed</li>
              <li>Use outputs as templates, not final documents</li>
              <li>Keep a record of what works well for future applications</li>
              <li>If a tool refuses output, use that as feedback to strengthen your materials</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#60a5fa', marginBottom: '1.5rem', fontWeight: '700' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: '#0f1419',
                  border: '1px solid #1a1f2e',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'var(--transition-smooth)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#60a5fa'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#ffffff'}
                >
                  {faq.question}
                  <span style={{ color: '#60a5fa', fontSize: '1.25rem', transition: 'color 0.2s ease' }}>
                    {expandedFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {expandedFAQ === index && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    borderTop: '1px solid #1a1f2e',
                    color: '#9ca3af',
                    lineHeight: '1.6',
                    animation: 'slideDown 0.3s ease-out'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: '#0f1419',
          border: '1px solid #1a1f2e',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <h2 style={{ fontSize: '1.25rem', color: '#ffffff', marginTop: 0, fontWeight: '700' }}>
            Still have questions?
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>
            We're here to help. Reach out to our support team.
          </p>
          <a
            href="mailto:support@elevaitr.com"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'var(--transition-smooth)',
              boxShadow: '0 2px 8px rgba(96, 165, 250, 0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 20px rgba(96, 165, 250, 0.35)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 2px 8px rgba(96, 165, 250, 0.2)'
            }}
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  )
}
