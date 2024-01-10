import { createProxyMiddleware } from 'http-proxy-middleware';

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;

const generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const authQueryParams = new URLSearchParams({
  response_type: 'code',
  client_id: spotifyClientId,
  scope: 'streaming user-read-email user-read-private',
  redirect_uri: `${process.env.BASE_URL}/api/auth/callback`,
  state: generateRandomString(16)
});

const queryString = authQueryParams.toString();

export default createProxyMiddleware({
  target: `https://accounts.spotify.com/authorize/?${queryString}`,
  changeOrigin: true,
});