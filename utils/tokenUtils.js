import fetchAccessToken from 'pages/api/fetchAccessToken';

const refreshAccessToken = async () => {
  const newToken = await fetchAccessToken();

  if (newToken) {
    // Only need this for the given session
    window.sessionStorage.setItem('access_token', newToken);
  }
};

export async function refreshTokenAndSetTimeout () {
  await refreshAccessToken();

  // Refresh Token Every 59 Minutes-- Token Expires Every Hour, Refreshing Every 59 Minutes Ensures Token Never Expires
  const intervalID = setInterval(() => {
    refreshAccessToken();
  }, 3540000);

  return () => clearInterval(intervalID);
}

export async function getTokenFromSessionStorage () {
  const token = window.sessionStorage.getItem('access_token');
  if (!token) await refreshTokenAndSetTimeout();
  return token;
}


export async function updateSessionStorageSearchQuery (request, isArtistSearch) {
  if (request) {
    const setQuery = `q=${isArtistSearch ? 'artist' : 'track'}%3A${request}`;
    window.sessionStorage.setItem('search_query', setQuery);
    return setQuery;
  }

  const query = window.sessionStorage.getItem('search_query');
  return query ?? null;
}

export async function updateSessionStorageTrackQuery (selectedTracks) {
  const query = window.sessionStorage.getItem('track_query');
  if (query) return query;

  if (!selectedTracks || selectedTracks?.length == 0) return null;

  const setQuery = encodeURIComponent(selectedTracks.join(','));
  window.sessionStorage.setItem('track_query', setQuery);
  return setQuery;
}