import { createContext, useEffect, useState } from "react";
import fetchAccessToken from "./fetchAccessToken";
import fetchSongSearch from "./fetchSongSearch";

const initialContext = {
  token: null,
  searchedSongs: [],
  searchesAttempted: 0,
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [token, setToken] = useState(initialContext.token);
  const [searchedSongs, setSearchedSongs] = useState(initialContext.searchedSongs);
  const [searchesAttempted, setSearchesAttempted] = useState(initialContext.searchesAttempted);

  const refreshAccessToken = async () => {
    const newTokenData = await fetchAccessToken();

    if (!newTokenData) {
      return;
    }

    setToken(newTokenData?.access_token);
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
      const songSearchResponse = await fetchSongSearch(request, token, searchesAttempted * 5);
      if (!songSearchResponse) {
        return;
      }

      setSearchesAttempted(searchesAttempted + 1);
      setSearchedSongs([...searchedSongs, ...songSearchResponse.tracks.items]);
      return data;
    } catch {
      console.error('Error fetching song search')
    }
  }

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      token,
      searchSongs
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  )
}

export { SpotifyAPIProvider, SpotifyAPIContext };