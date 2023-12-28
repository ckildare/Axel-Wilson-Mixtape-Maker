const fetchSongSearch = async (request, token, offset) => {
  console.log('fetchSongSearch token', token);

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track%3A${request}&type=track&limit=10&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching song search: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Song Search Response:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching song search: ${error.message}`);
    return null;
  }
};

export default fetchSongSearch;