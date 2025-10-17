export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { jobDescription, resume } = req.body

  if (!jobDescription?.trim() || !resume?.trim()) {
    return res.status(400).json({ error: 'Job description and resume are required' })
  }

  const apiKey = process.env.CLAUDE_API_KEY

  if (!apiKey) {
    console.error('CLAUDE_API_KEY not set')
    return res.status(500).json({ error: 'API key not configured' })
  }

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
        max_tokens: 2500,
        messages: [
          {
            role: 'user',
            content: `You are an expert interview coach preparing a candidate for a job interview.

CRITICAL RULES - STRICTLY FOLLOW THESE:
- Only generate questions based on the actual job description
- Only suggest answers based on what's in the resume - do NOT fabricate experience or skills
- Do NOT invent achievements or work experience not mentioned
- Do NOT add certifications or skills the candidate doesn't have
- Focus on realistic questions that interviewers would actually ask for this role

Job Description:
${jobDescription}

Candidate's Resume:
${resume}

Generate exactly 10 interview questions that:
1. Are realistic for this specific job
2. Can be answered using experience from the resume
3. Are a mix of: technical questions, behavioral questions, and role-specific questions

For EACH question, provide:
- The question itself
- A suggested answer framework based ONLY on their actual resume experience

Format as:
Question 1: [question]
Answer: [framework based on their actual experience]

Question 2: [question]
Answer: [framework]

...and so on for all 10 questions.

Be specific to their background - don't provide generic answers. Only reference what's actually in their resume.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return res.status(500).json({ error: 'Failed to generate interview prep' })
    }

    const data = await response.json()
    const interviewPrep = data.content[0].text

    return res.status(200).json({ interviewPrep })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
