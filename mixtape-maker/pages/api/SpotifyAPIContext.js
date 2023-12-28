import { createContext, useEffect, useState } from "react";
import fetchAccessToken from "./fetchAccessToken";
import fetchSongSearch from "./fetchSongSearch";

const initialContext = {
  searchedSongs: [],
  searchesAttempted: 0,
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [searchedSongs, setSearchedSongs] = useState(initialContext.searchedSongs);
  const [searchesAttempted, setSearchesAttempted] = useState(initialContext.searchesAttempted);

  const refreshAccessToken = async () => {
    const newToken = await fetchAccessToken();

    if (newToken) {
      window.sessionStorage.setItem('access_token', newToken)
    }
  }

  useEffect(() => {
    const refreshTokenAndSetTimeout = async () => {
      await refreshAccessToken();

      const intervalId = setInterval(() => {
        refreshAccessToken();
      }, 3600000);

      // Cleanup function
      return () => clearInterval(intervalId);
    };

    refreshTokenAndSetTimeout();
  }, []);

  const searchSongs = async (request) => {
    try {
      const token = window.sessionStorage.getItem('access_token');
      if (!token) refreshTokenAndSetTimeout();

      const songSearchResponse = await fetchSongSearch(request, token, searchesAttempted * 5);
      if (!songSearchResponse) return;

      setSearchesAttempted(searchesAttempted + 1);
      setSearchedSongs([...searchedSongs, ...songSearchResponse.tracks.items]);
      return data;
    } catch {
      console.error('Error fetching song search');
    }
  }

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      searchSongs
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  )
}

export { SpotifyAPIProvider, SpotifyAPIContext };