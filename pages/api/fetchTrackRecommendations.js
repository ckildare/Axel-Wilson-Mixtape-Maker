import { getTokenFromSessionStorage } from 'utils/sessionStorageUtils';

const fetchReccs = async (url, token) => await fetch(
  url,
  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const fetchTrackRecommendations = async (settings, token) => {
  try {
    const url = `https://api.spotify.com/v1/recommendations?${settings}`;

    let response = null;
    response = await fetchReccs(url, token);

    if (response.status === 401) {
      // Occurs when our token is donked up
      const refreshedToken = await getTokenFromSessionStorage();
      response = await fetchReccs(url, refreshedToken);
    }

    if (!response.ok) {
      throw new Error(`Error fetching track recommendations: ${response.status} - ${response.statusText}`);
    }

    if (response.status === 201) {
      console.info('No recommendations found for track');
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching track recommendations: ${error.message}`);
    return null;
  }
};

export default fetchTrackRecommendations;