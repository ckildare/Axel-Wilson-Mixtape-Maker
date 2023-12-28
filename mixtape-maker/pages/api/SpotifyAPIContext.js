import { createContext, useEffect, useState } from "react";
import fetchAccessToken from "./fetchAccessToken";
import fetchSongSearch from "./fetchSongSearch";

const initialContext = {
  searchedSongs: [],
  searchesAttempted: 0,
  seedSong: {},
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [searchedSongs, setSearchedSongs] = useState(initialContext.searchedSongs);
  const [searchesAttempted, setSearchesAttempted] = useState(initialContext.searchesAttempted);
  const [seedSong, setSeedSong] = useState(initialContext.seedSong);

  const refreshAccessToken = async () => {
    const newToken = await fetchAccessToken();

    if (newToken) {
      // Only need this for the given session
      window.sessionStorage.setItem('access_token', newToken)
    }
  }

  const refreshTokenAndSetTimeout = async () => {
    await refreshAccessToken();

    // Refresh Token Every 59 Minutes-- Token Expires Every Hour, Refreshing Every 59 Minutes Ensures Token Never Expires
    const intervalID = setInterval(() => {
      refreshAccessToken();
    }, 3540000);

    return () => clearInterval(intervalID);
  };

  // Get Client Auth Token and Start Auth Token Refresh Interval
  useEffect(() => {
    refreshTokenAndSetTimeout();
  }, []);

  // Mapped song object is more lightweight to pass around, easier to document / work with
  const mappedSong = (song) => ({
    id: song.id,
    name: song.name,
    artists: [...song.artists.map(artist => ({
      name: artist.name, 
      href: artist.href
    }))],
    album: {
      name: song.album.name,
      href: song.album.href,
      images: song.album.images,
      releaseDate: song.album.release_date,
    },
    duration: song.duration_ms,
    href: song.href,
    preview: song.preview_url,
  });

  const searchSongs = async (request) => {
    const token = window.sessionStorage.getItem('access_token');
    if (!token) await refreshTokenAndSetTimeout();

    const songSearchResponse = await fetchSongSearch(request, token, searchesAttempted * 5);
    if (!songSearchResponse) return;

    // TODO: Handle No Results
    // For Refreshing Search In Case User Wants to See More Results From the Same Query
    // Maybe Do Pagination Instead? ( paginate every 5 results on different queries )
    setSearchesAttempted(searchesAttempted + 1);
    setSearchedSongs([...songSearchResponse.tracks.items.map(song => mappedSong(song))]);
  }

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      searchedSongs,
      searchSongs
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  )
}

export { SpotifyAPIProvider, SpotifyAPIContext };