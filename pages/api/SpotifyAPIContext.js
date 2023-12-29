import { createContext, useEffect, useState } from "react";
import fetchAccessToken from "./fetchAccessToken";
import fetchSongSearch from "./fetchSongSearch";
import fetchSongRecommendations from "./fetchSongRecommendations";
import mapSong from "utils/songUtils";
import buildSettings from "utils/reccUtils";

const initialContext = {
  searchedSongs: [],
  searchFetchCount: 0,
  recommendationFetchCount: 0,
  selectedSongIDs: [],
  recommendedSongs: [],
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [searchedSongs, setSearchedSongs] = useState(initialContext.searchedSongs);
  const [selectedSongIDs, setSelectedSongIDs] = useState(initialContext.selectedSongIDs);
  const [recommendedSongs, setRecommendedSongs] = useState(initialContext.recommendedSongs);
  const [searchFetchCount, setSearchFetchCount] = useState(initialContext.searchFetchCount);
  const [recommendationFetchCount, setRecommendationFetchCount] = useState(initialContext.recommendationFetchCount);

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

  const searchSongs = async (request) => {
    const token = await getTokenFromSessionStorage();

    const songSearchResponse = await fetchSongSearch(request, token, searchFetchCount * 5);
    if (!songSearchResponse) return;

    // TODO: Handle No Results
    // For Refreshing Search In Case User Wants to See More Results From the Same Query
    // Maybe Do Pagination Instead? ( paginate every 5 results on different queries )
    setSearchFetchCount(searchFetchCount + 1);
    setSearchedSongs([...songSearchResponse.tracks.items.map(song => mapSong(song))]);
  }

  const getRecommendations = async (song) => {
    const token = await getTokenFromSessionStorage();
    setSelectedSongIDs([...selectedSongIDs, song.id]);

    console.log('selectedSongIDs 1', selectedSongIDs);
    const settings = buildSettings(selectedSongIDs, song.artists, 5);

    const songRecommendationsResponse = await fetchSongRecommendations(settings, token);
    if (!songRecommendationsResponse) return;

    // TODO: Handle No Results
    setRecommendationFetchCount(recommendationFetchCount + 1);
    setRecommendedSongs([...songRecommendationsResponse.tracks.map(song => mapSong(song))]);
    console.table(recommendedSongs);
  }

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      searchedSongs,
      recommendedSongs,
      selectedSongIDs,
      searchSongs,
      getRecommendations
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  )
}

export { SpotifyAPIProvider, SpotifyAPIContext };