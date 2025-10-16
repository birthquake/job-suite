export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { resume } = req.body

  if (!resume || !resume.trim()) {
    return res.status(400).json({ error: 'Resume is required' })
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
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `You are a professional resume optimizer. Improve this resume for ATS compatibility and impact.

IMPORTANT: Return ONLY the optimized resume text, nothing else. No explanations, no bullet points about changes, just the improved resume.

Here is the resume to optimize:

${resume}

Please optimize it by:
1. Using strong action verbs
2. Adding quantifiable metrics where possible
3. Improving clarity and conciseness
4. Ensuring ATS compatibility (no special formatting)
5. Highlighting achievements over responsibilities

Return the complete optimized resume:`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return res.status(500).json({ error: 'Failed to optimize resume' })
    }

    const data = await response.json()
    const optimized = data.content[0].text

    return res.status(200).json({ optimized })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
