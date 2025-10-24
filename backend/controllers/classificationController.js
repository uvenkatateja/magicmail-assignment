const classificationService = require('../services/classificationService');

const classifyEmails = async (req, res) => {
  const { emails, openaiApiKey } = req.body;

  if (!emails || !openaiApiKey) {
    return res.status(400).json({ error: 'Emails and OpenAI API key are required' });
  }

  try {
    const classifications = await classificationService.classifyEmails(emails, openaiApiKey);
    res.json({ classifications });
  } catch (error) {
    console.error('Error classifying emails:', error);
    if (error instanceof SyntaxError) {
      console.error('Failed to parse JSON. Raw content:', error.message);
    }
    res.status(500).json({ error: 'Failed to classify emails', details: error.message });
  }
};

module.exports = { classifyEmails };
