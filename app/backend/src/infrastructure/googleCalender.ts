import { google } from 'googleapis';
import { GoogleCalendarInterface, GoogleCalendarEventType } from '../domain/model/googleCalenderInterface';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { Credentials } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = path.join(__dirname, '..', '..', '..', '..', 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, '..', '..', '..', '..', 'credentials.json');

export class GoogleCalendarClient implements GoogleCalendarInterface {
  async fetchEvents(): Promise<GoogleCalendarEventType[]> {
    const auth = await this.authorize();
    if (!auth) {
      throw new Error('Failed to authorize Google Calendar client.');
    }
    const calendar = google.calendar({ version: 'v3', auth });

    const now = new Date().toISOString();
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Google APIのレスポンスを型に合わせて変換
    return (res.data.items || []).map(item => ({
      id: item.id || '',
      summary: item.summary || '',
      start: { dateTime: item.start?.dateTime || '' },
      end: { dateTime: item.end?.dateTime || '' },
    })) as GoogleCalendarEventType[];
  }

  // 認証を行い、OAuth2クライアントを返す
  private async authorize() {
    const { client_secret, client_id, redirect_uris } = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8')).installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const token = await this.loadSavedCredentialsIfExist();
    if (token) {
      oAuth2Client.setCredentials(token);
      return oAuth2Client;
    }
    const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
    console.log('Authorize this app by visiting this url:', authUrl);

    // 実運用ではexpressなどでリダイレクトを受ける実装にする
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const code: string = await new Promise(resolve => rl.question('Enter the code from that page here: ', resolve));
    rl.close();

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    await this.saveCredentials(tokens);
    return oAuth2Client;
  }

  private async loadSavedCredentialsIfExist() {
    try {
      const content = fs.readFileSync(TOKEN_PATH, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private async saveCredentials(credentials: Credentials) {
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials));
  }
}

if (require.main === module) {
  const client = new GoogleCalendarClient();
  client.fetchEvents()
    .then(events => {
      console.log('Upcoming events:');
      events.forEach(event => {
        const start = event.start.dateTime;
        console.log(`${start} - ${event.summary}`);
      });
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
}
