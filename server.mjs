import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

const port = 5000;

// startServer();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({ path: path.join(__dirname, '.env') });

const spotifyClientId = '9fe7be0b53224126b11e0acb22cba33b';
const spotifyClientSecret = 'cef02e066c3c4094992af7a065ffe2c9';

const generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let access_token = null;

app.get('/auth/login', (req, res) => {
  console.log('login');

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: 'streaming user-read-email user-read-private',
    redirect_uri: 'http://localhost:5000/auth/callback',
    state: generateRandomString(16),
  });

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', async (req, res) => {
  const credentials = `${spotifyClientId}:${spotifyClientSecret}`;

  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(credentials)}`,
    },
    body: new URLSearchParams({
      code: req.query.codecode,
      redirect_uri: 'http://localhost:5000/auth/callback',
      grant_type: 'authorization_code',
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const body = await response.json();

    if (response.ok) {
      access_token = body.access_token;
      console.log('access_token: ', access_token);
      res.redirect('/auth/token');
    } else {
      res.status(response.status).json(body);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/auth/token', (req, res) => {
  if (access_token) {
    res.redirect('http://localhost:3000');
  } else {
    res.status(401).json({ error: 'Access token not available' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});