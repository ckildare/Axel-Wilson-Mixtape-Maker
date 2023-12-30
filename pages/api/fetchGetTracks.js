const fetchGetTracks = async (ids, token) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks?market=ES&ids=${ids}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching tracks: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.tracks;
  } catch (error) {
    console.error(`Error fetching tracks: ${error.message}`);
    return null;
  }
};

export default fetchGetTracks;