export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { linkedinProfile } = req.body

  if (!linkedinProfile?.trim()) {
    return res.status(400).json({ error: 'LinkedIn profile is required' })
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
            content: `You are a LinkedIn profile optimization expert. Improve this LinkedIn profile for better visibility, recruiter engagement, and professional impact.

CRITICAL RULES - STRICTLY FOLLOW THESE:
- Do NOT add any details, skills, or experience not mentioned in the original profile
- Do NOT invent achievements or work history
- Do NOT fabricate metrics or certifications
- Only enhance clarity, professionalism, and impact with what's already there
- Fix grammar and spelling issues
- Improve formatting for readability

Here is the LinkedIn profile to optimize:

${linkedinProfile}

Optimize it by:
1. Improving the headline for keyword optimization and clarity
2. Rewriting the About section to be more compelling while staying truthful
3. Enhancing bullet points in experience sections with stronger action verbs
4. Organizing skills in a logical hierarchy
5. Ensuring consistent professional tone throughout

Return ONLY the optimized profile text. Make it ready to copy-paste directly into LinkedIn:`,
          },
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      return res.status(500).json({ error: 'Failed to optimize LinkedIn profile' })
    }

    const data = await response.json()
    const optimized = data.content[0].text

    return res.status(200).json({ optimized })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
