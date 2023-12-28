import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./credentials";

const fetchAccessToken = async () => {
  try {
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const token = data.access_token;
        console.log('Access Token:', token);
        return token;
      })
      .catch(error => {
        console.error('Error fetching access token:', error.message);
      });

    return null;
  } catch (e) {
    console.error(`Error fetching access token: ${e}`);
    return null;
  }
}

export default fetchAccessToken;