const OpenAI = require('openai');

const classifyEmails = async (emails, openaiApiKey) => {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openaiApiKey,
    defaultHeaders: {
      "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
      "X-Title": "Email Classifier"
    }
  });

  const emailsText = emails.map((email, idx) =>
    `Email ${idx + 1}:\nFrom: ${email.from}\nSubject: ${email.subject}\nSnippet: ${email.snippet}\n`
  ).join('\n---\n');

  const prompt = `Classify the following emails into these categories: Important, Promotional, Social, Marketing, Spam, or General.

Categories:
- Important: Personal or work-related emails requiring immediate attention
- Promotional: Sales, discounts, and marketing campaigns
- Social: Social networks, friends, and family
- Marketing: Marketing, newsletters, and notifications
- Spam: Unwanted or unsolicited emails
- General: Everything else

${emailsText}

Return ONLY a JSON array with the classification for each email in order. Format: [{"category": "Important"}, {"category": "Promotional"}, ...]`;

  const completion = await openai.chat.completions.create({
    model: "openai/gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are an email classification assistant. Return only valid JSON arrays."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.3
  });

  let content = completion.choices[0].message.content;

  // Remove markdown code blocks if present
  if (content.includes('```')) {
    const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      content = match[1];
    } else {
      content = content.replace(/```/g, '');
    }
  }

  content = content.trim();
  const classifications = JSON.parse(content);

  return classifications;
};

module.exports = { classifyEmails };
