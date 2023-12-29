const fetchTrackSearch = async (request, token, offset) => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track%3A${request}&type=track&limit=5&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching track search: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.info(`Successfully fetched track search for ${request}`);
    // console.info(data);
    return data;
  } catch (error) {
    console.error(`Error fetching track search: ${error.message}`);
    return null;
  }
};

export default fetchTrackSearch;