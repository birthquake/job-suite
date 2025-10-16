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
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `You are a professional cover letter writer. Write a compelling, personalized cover letter based on the job description and the candidate's resume.

CRITICAL RULES - STRICTLY FOLLOW THESE:
- Do NOT add any details, achievements, or skills not mentioned in the resume
- Do NOT invent work experience or responsibilities
- Do NOT fabricate metrics or accomplishments
- Do NOT claim skills the resume doesn't list
- ONLY use information explicitly stated in the resume

What you CAN do:
- Match resume experience to job requirements
- Reframe existing skills in relevant ways
- Highlight why their real experience fits the role
- Write professionally and persuasively

Return ONLY the cover letter text, nothing else. No explanations.

Job Description:
${jobDescription}

Candidate's Resume:
${resume}

Write a professional cover letter that:
1. Opens with genuine interest in the specific role
2. Highlights relevant experience from the resume that matches job requirements (using only what's stated)
3. Explains why their real experience makes them a good fit
4. Closes with a call to action
5. Is formatted as a standard business letter with spacing between paragraphs

Return only the cover letter:`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return res.status(500).json({ error: 'Failed to generate cover letter' })
    }

    const data = await response.json()
    const coverLetter = data.content[0].text

    return res.status(200).json({ coverLetter })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
