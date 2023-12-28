const fetchSongSearch = async (req, token, offset) => {
  try {
    const { query } = req.body;
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIcomponent(query)}&type=track&limit=10&offset=${offset}&include_external=audio`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + token
        },
        body: JSON.stringify(query)
      }
    );

    const data = await response.json();
    return data;
  } catch {
    console.error('Error fetching song search')
  }
}

export default fetchSongSearch;