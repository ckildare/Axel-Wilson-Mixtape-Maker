import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./credentials";

const fetchAccessToken = async () => {
  try {
    console.log(`SPOTIFY_CLIENT_ID: ${SPOTIFY_CLIENT_ID}`);
    console.log(`SPOTIFY_CLIENT_SECRET: ${SPOTIFY_CLIENT_SECRET}`);

    const response = await fetch("https://accounts.spotify.com/api/token", {
      body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })

    const data = await response.json();
    console.log(`data: ${JSON.stringify(data)}`);
    return data;
  } catch (e) {
    console.error(`Error fetching access token: ${e}`)
    return null;
  }
}

export default fetchAccessToken;