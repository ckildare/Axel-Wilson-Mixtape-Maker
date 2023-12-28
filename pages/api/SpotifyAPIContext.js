import { createContext, useEffect, useState } from "react";
import fetchAccessToken from "./fetchAccessToken";
import fetchSongSearch from "./fetchSongSearch";

const initialContext = {
  searchedSongs: [],
  searchFetchCount: 0,
  recommendationFetchCount: 0,
  selectedSongs: [],
  recommendedSongs: [],
  seedSong: {},
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [searchedSongs, setSearchedSongs] = useState(initialContext.searchedSongs);
  const [selectedSongs, setSelectedSongs] = useState(initialContext.selectedSongs);
  const [recommendedSongs, setRecommendedSongs] = useState(initialContext.recommendedSongs);
  const [searchFetchCount, setSearchFetchCount] = useState(initialContext.searchFetchCount);
  const [recommendationFetchCount, setRecommendationFetchCount] = useState(initialContext.recommendationFetchCount);
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

  const getTokenFromSessionStorage = async () => {
    const token = window.sessionStorage.getItem('access_token');
    if (!token) await refreshTokenAndSetTimeout();
    return token;
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
      href: artist.href,
      id: artist.id
    }))],
    album: {
      name: song.album.name,
      href: song.album.href,
      images: song.album.images,
      releaseDate: song.album.release_date,
      id: song.album.id,
    },
    duration: song.duration_ms,
    href: song.href,
    preview: song.preview_url,
  });

  const searchSongs = async (request) => {
    const token = await getTokenFromSessionStorage();

    const songSearchResponse = await fetchSongSearch(request, token, searchFetchCount * 5);
    if (!songSearchResponse) return;

    // TODO: Handle No Results
    // For Refreshing Search In Case User Wants to See More Results From the Same Query
    // Maybe Do Pagination Instead? ( paginate every 5 results on different queries )
    setSearchFetchCount(searchFetchCount + 1);
    setSearchedSongs([...songSearchResponse.tracks.items.map(song => mappedSong(song))]);
  }

  const getRecommendations = async (settings, isAdvanced) => {
    const token = getTokenFromSessionStorage();

    const songRecommendationsResponse = await fetchSongRecommendations(settings, isAdvanced, token);
    if (!songRecommendationsResponse) return;

    // TODO: Handle No Results
    setRecommendationFetchCount(recommendationFetchCount + 1);
    setRecommendedSongs([...songRecommendationsResponse.tracks.map(song => mappedSong(song))]);
  }

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      searchedSongs,
      recommendedSongs,
      searchSongs,
      getRecommendations
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  )
}

export { SpotifyAPIProvider, SpotifyAPIContext };