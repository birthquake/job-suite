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
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `You are a professional resume optimizer. Your job is to improve vague language into more professional, specific language - but NEVER invent facts.

ALLOWED IMPROVEMENTS:
- "Did office stuff" → "Managed administrative office operations"
- "Worked with customers" → "Provided customer service and support"
- "Helped with things" → "Assisted with team projects and daily operations"
- Replace weak verbs: Managed, Coordinated, Assisted, Provided (instead of Did, Helped, Worked)

FORBIDDEN (Do not do these):
- Add numbers or metrics: NO "served 50+ customers" when not mentioned
- Invent achievements: NO "increased efficiency by 30%" when not stated
- Add new responsibilities: NO "trained team members" when not mentioned
- Make up skills: If "Microsoft" is listed vaguely, clarify to "Microsoft Office" but don't add Excel, PowerPoint, etc. unless mentioned

Here is the resume to optimize:

${resume}

Improve it by:
1. Replace vague nouns with specific ones (stuff → operations, things → projects)
2. Use stronger, more professional action verbs
3. Organize into clear sections (if missing any)
4. Clean up formatting for ATS
5. Fix grammar and spelling

Return ONLY the improved resume. Stay truthful to the original:`,
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
