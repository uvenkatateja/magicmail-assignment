const { google } = require('googleapis');
const oauth2Client = require('../config/oauth');

const fetchUserEmails = async (accessToken, maxResults = 15) => {
  oauth2Client.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults: parseInt(maxResults)
  });

  const messages = response.data.messages || [];
  const emailDetails = await Promise.all(
    messages.map(async (message) => {
      const detail = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full'
      });

      const headers = detail.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
      const date = headers.find(h => h.name === 'Date')?.value || '';
      const snippet = detail.data.snippet || '';

      return {
        id: message.id,
        subject,
        from,
        date,
        snippet
      };
    })
  );

  return emailDetails;
};

module.exports = { fetchUserEmails };
