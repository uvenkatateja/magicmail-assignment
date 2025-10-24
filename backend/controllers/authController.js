const authService = require('../services/authService');

const getGoogleAuthUrl = (req, res) => {
  try {
    const url = authService.generateAuthUrl();
    res.json({ url });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
};

const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens, user } = await authService.handleOAuthCallback(code);

    const redirectUrl = `${process.env.FRONTEND_URL}?access_token=${tokens.access_token}&refresh_token=${tokens.refresh_token || ''}&user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`);
  }
};

module.exports = { getGoogleAuthUrl, handleGoogleCallback };
