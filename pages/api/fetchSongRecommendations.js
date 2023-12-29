const fetchSongRecommendations = async (settings, token) => {
  try {
    const url = `https://api.spotify.com/v1/recommendations?${settings}`;
    console.info(`fetchSongRecommendations URL: ${url}`);

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching song recommendations: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.info('fetchSongRecommendations Response: \n', data);
    return data;
  } catch (error) {
    console.error(`Error fetching song recommendations: ${error.message}`);
    return null;
  }
};

export default fetchSongRecommendations;