export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { jobDescription } = req.body

  if (!jobDescription?.trim()) {
    return res.status(400).json({ error: 'Job description is required' })
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
            content: `You are a job description analyst. Break down this job posting into strategic insights to help job seekers tailor their application.

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
(Extract 10-15 important keywords/phrases that will help get past resume screening)

APPLICATION STRATEGY:
(2-3 tips on how to tailor a resume and cover letter for this specific role based on what the job posting emphasizes)

Format your response clearly with these exact section headers. Be concise and actionable.`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return res.status(500).json({ error: 'Failed to analyze job description' })
    }

    const data = await response.json()
    const analysis = data.content[0].text

    return res.status(200).json({ analysis })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
