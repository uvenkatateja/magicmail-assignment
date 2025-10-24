const emailService = require('../services/emailService');

const getEmails = async (req, res) => {
  const { accessToken, maxResults = 15 } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const emails = await emailService.fetchUserEmails(accessToken, maxResults);
    res.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

module.exports = { getEmails };
