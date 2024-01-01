import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { URLSearchParams } from 'url';
import fetch from 'node-fetch';

const serverPort = 5000;

const app = express();
dotenv.config();
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

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
  console.log('spotifyClientId: ', spotifyClientId);

  const auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: 'streaming user-read-email user-read-private',
    redirect_uri: `${serverPort == 5000 ? 'http://localhost:5000' : 'https://axelwilson'}/auth/callback`,
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
      code: req.query.code,
      redirect_uri: `${serverPort == 5000 ? 'http://localhost:5000' : 'https://axelwilson'}/auth/callback`,
      grant_type: 'authorization_code',
      scope: 'user-read-playback-state user-modify-playback-state streaming',
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const body = await response.json();

    if (response.ok) {
      access_token = body.access_token;
      res.cookie('access_token', access_token, {
        expires: new Date(Date.now() + 3600000),
        secure: true,
        sameSite: 'Lax',
      });
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
    res.redirect('http://localhost:3000/search');
  } else {
    res.status(401).json({ error: 'Access token not available' });
  }
});

app.listen(serverPort, () => {
  serverPort == 5000 && console.log(`Listening at http://localhost:${serverPort}`);
});

// app.use(express.static(path.join(__dirname, '../build')));