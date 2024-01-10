export default async function bearerToken(req, res) {
  try {
    // Your existing logic for fetching the Spotify token
    const scopes = 'user-read-playback-state user-modify-playback-state user-top-read user-follow-read';
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET),
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

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(500).json({ error: 'Failed to fetch bearer token' });
    }
  } catch (error) {
    console.error('Error in Spotify token API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}