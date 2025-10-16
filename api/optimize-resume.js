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
            content: `You are a professional resume optimizer with strict rules. Your ONLY job is to:
1. Replace weak verbs with stronger action verbs
2. Clean up formatting and grammar
3. Remove vague filler words

CRITICAL RULES - DO NOT BREAK THESE:
- Do NOT add any details that aren't explicitly stated
- Do NOT invent achievements, metrics, or responsibilities
- Do NOT infer what someone did - only rewrite what they explicitly said
- Do NOT add section headers that don't exist
- Do NOT make up professional titles improvements if the original doesn't support it

Examples of what NOT to do:
- Original: "Worked with customers" → DO NOT change to "Managed customer relationships for 50+ clients"
- Original: "Handled money" → DO NOT change to "Balanced cash drawer with 100% accuracy"
- Original: No mention of training → DO NOT add "Trained new team members"

Here is the resume to optimize:

${resume}

ONLY rewrite using these principles:
- Stronger verbs (Managed instead of Did, Coordinated instead of Helped)
- Clearer language (Remove "stuff", "things")
- Better formatting for ATS (simple bullet points, standard sections)
- Fix grammar and spelling

Return ONLY the optimized resume. Do not add anything new:`,
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
