const fetchSongSearch = async (request, token, offset) => {
  console.log('fetchSongSearch token', token);
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=track%3A${request}&type=track&limit=10&offset=${offset}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        },
        mode: 'no-cors',
        method: "GET"
      }
    );

    if (!response.ok) {
      console.error(`Error fetching song search: ${response.status} - ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Error fetching song search: ${e}`)
  }
}

export default fetchSongSearch;