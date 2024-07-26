import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

export const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
