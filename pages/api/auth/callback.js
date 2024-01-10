import fetch from 'node-fetch';
import { parse, serialize } from 'cookie';

// Function to set a cookie
const setCookie = (res, name, value, options = {}) => {
  const serializedCookie = serialize(name, value, options);
  res.setHeader('Set-Cookie', serializedCookie);
};

// Function to get a cookie
const getCookie = (req, name) => {
  const cookies = parse(req.headers.cookie || '');
  return cookies[name];
};

const clearCookie = (res, name) => {
  const serializedCookie = serialize(name, '', {
    expires: new Date(0), // Set expiration in the past to delete the cookie
    secure: true,
    httpOnly: false,
    sameSite: 'Lax',
  });
  res.setHeader('Set-Cookie', serializedCookie);
};

const callbackHandler = async (req, res) => {
  const state = req?.query?.state || null;
  const storedState = getCookie(req, 'spotify_auth_state');

  if (state == null || state != storedState) {
    // res.redirect('/#' + new URLSearchParams({ error: 'state_mismatch' }));
  }
  clearCookie(res, 'spotify_auth_state');

  const credentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(credentials)}`,
    },
    body: new URLSearchParams({
      code: req.query.code,
      redirect_uri: `${process.env.BASE_URL}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
    json: true
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);

    console.log('response', response.status);
    const body = await response.json();

    if (response.status == 200) {
      setCookie(res, 'access_token', body.access_token, {
        expires: new Date(Date.now() + 3600000),
        path: '/',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax',
      });

      res.redirect('/');
    } else {
      res.status(response.status).json(body);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default callbackHandler;