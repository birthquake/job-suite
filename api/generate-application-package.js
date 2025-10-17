export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { jobDescription, resume, tools } = req.body

  if (!jobDescription?.trim() || !resume?.trim() || !Array.isArray(tools) || tools.length === 0) {
    return res.status(400).json({ error: 'jobDescription, resume, and tools array are required' })
  }

  const apiKey = process.env.CLAUDE_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const outputs = {}
  const errors = {}

  // Helper function to call Claude
  const callClaude = async (messages) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 2000,
          messages,
        }),
      })

      if (!response.ok) {
        throw new Error('Claude API error')
      }

      const data = await response.json()
      return data.content[0].text
    } catch (err) {
      throw err
    }
  }

  // Run each tool in sequence
  if (tools.includes('resume')) {
    try {
      const result = await callClaude([
        {
          role: 'user',
          content: `You are a professional resume optimizer. Improve this resume for ATS compatibility and impact - but ONLY enhance what's already there. Do NOT invent metrics or details.

CRITICAL RULES:
- Only rewrite existing bullet points to be clearer and more impactful
- Do NOT add numbers or metrics that weren't in the original
- Do NOT invent achievements or responsibilities
- Use stronger action verbs where possible
- Improve clarity and conciseness
- Ensure ATS compatibility (no special formatting, no symbols)

Here is the resume:

${resume}

Return ONLY the optimized resume text:`,
        },
      ])
      outputs.resume = result
    } catch (err) {
      errors.resume = 'Failed to optimize resume'
    }
  }

  if (tools.includes('coverLetter')) {
    try {
      const result = await callClaude([
        {
          role: 'user',
          content: `You are a professional cover letter writer. Write a compelling, personalized cover letter based on this job description and resume.

CRITICAL RULES:
- Do NOT add any details, achievements, or skills not mentioned in the resume
- Do NOT invent work experience or responsibilities
- Do NOT fabricate metrics or accomplishments
- Only use information explicitly stated in the resume

Job Description:
${jobDescription}

Resume:
${resume}

Write a professional cover letter that:
1. Opens with genuine interest in the specific role
2. Highlights relevant experience from the resume that matches job requirements
3. Explains why their real experience makes them a good fit
4. Closes with a call to action
5. Is formatted as a standard business letter

Return only the cover letter:`,
        },
      ])
      outputs.coverLetter = result
    } catch (err) {
      errors.coverLetter = 'Failed to generate cover letter'
    }
  }

  if (tools.includes('interviewPrep')) {
    try {
      const result = await callClaude([
        {
          role: 'user',
          content: `You are an expert interview coach. Generate 10 interview questions tailored to this specific job based on the job description and candidate's resume.

CRITICAL RULES:
- Only generate questions based on the actual job description
- Only suggest answers based on what's in the resume
- Do NOT fabricate experience or skills
- Focus on realistic questions that interviewers would actually ask

Job Description:
${jobDescription}

Resume:
${resume}

Generate exactly 10 interview questions with answer frameworks.

Format as:
Question 1: [question]
Answer: [framework]

Question 2: [question]
Answer: [framework]

...and so on for all 10 questions.

Return the questions and frameworks only:`,
        },
      ])
      outputs.interviewPrep = result
    } catch (err) {
      errors.interviewPrep = 'Failed to generate interview prep'
    }
  }

  if (tools.includes('jobAnalyzer')) {
    try {
      const result = await callClaude([
        {
          role: 'user',
          content: `Analyze this job posting and break it down into strategic insights.

Job Description:
${jobDescription}

Analyze and provide:

REQUIRED SKILLS & EXPERIENCE:
(List 5-7 key skills or experiences that seem mandatory)

NICE-TO-HAVE SKILLS:
(List 3-5 bonus skills or qualifications)

KEY RESPONSIBILITIES:
(Summarize 4-6 main job duties)

SENIORITY LEVEL:
(Entry-level, Mid-level, Senior, or Executive)

ATS KEYWORDS:
(Extract 10-15 important keywords/phrases)

Return the analysis only:`,
        },
      ])
      outputs.jobAnalyzer = result
    } catch (err) {
      errors.jobAnalyzer = 'Failed to analyze job description'
    }
  }

  return res.status(200).json({
    outputs,
    errors: Object.keys(errors).length > 0 ? errors : null,
  })
}
