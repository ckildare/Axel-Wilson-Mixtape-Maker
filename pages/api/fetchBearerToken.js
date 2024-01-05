const fetchBearerToken = async () => {
  const clientID = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  try {
    const scopes = 'user-read-playback-state user-modify-playback-state user-top-read user-follow-read';

    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&scope=${encodeURIComponent(scopes)}`,
    };

    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    if (!response.ok) {
      throw new Error(`Error Status: ${response.status}`);
    }

    const data = await response.json();
    const token = data.access_token;
    return token;
  } catch (error) {
    console.error('Error fetching bearer token:', error.message);
    return null;
  }
};

export default fetchBearerToken;