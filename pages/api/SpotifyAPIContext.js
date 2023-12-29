import { createContext, useEffect, useState } from "react";
import fetchSongSearch from "./fetchSongSearch";
import fetchSongRecommendations from "./fetchSongRecommendations";
import mapSong from "utils/songUtils";
import buildSettings from "utils/reccUtils";
import { refreshTokenAndSetTimeout, getTokenFromSessionStorage } from "utils/tokenUtils";

const initialContext = {
  searchedSongs: [],
  searchFetchCount: 0,
  recommendationFetchCount: 0,
  recommendedSongs: [],
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [searchedSongs, setSearchedSongs] = useState(initialContext.searchedSongs);
  const [recommendedSongs, setRecommendedSongs] = useState(initialContext.recommendedSongs);
  const [searchFetchCount, setSearchFetchCount] = useState(initialContext.searchFetchCount);
  const [recommendationFetchCount, setRecommendationFetchCount] = useState(initialContext.recommendationFetchCount);

  // Get Client Auth Token and Start Auth Token Refresh Interval
  useEffect(() => {
    refreshTokenAndSetTimeout();
  }, []);

  const searchSongs = async (request) => {
    const token = await getTokenFromSessionStorage();

    const songSearchResponse = await fetchSongSearch(request, token, searchFetchCount * 5);
    if (!songSearchResponse || songSearchResponse?.tracks?.items.length == 0) {
      console.error('No songs found for request: ', request);
      return;
    };

    // For Refreshing Search In Case User Wants to See More Results From the Same Query
    // Maybe Do Pagination Instead? ( paginate every 5 results on different queries )
    setSearchFetchCount(searchFetchCount + 1);
    setSearchedSongs([...songSearchResponse.tracks.items.map(song => mapSong(song))]);
  }

  const getRecommendations = async (song) => {
    const token = await getTokenFromSessionStorage();
    const settings = buildSettings(song.id, song.artists, 5);

    const songRecommendationsResponse = await fetchSongRecommendations(settings, token);
    if (!songRecommendationsResponse || songRecommendationsResponse?.tracks?.length == 0) {
      console.error('No recommendations found for song ID: ', song.id);
      return;
    };

    setRecommendationFetchCount(recommendationFetchCount + 1);
    setRecommendedSongs([...songRecommendationsResponse.tracks.map(song => mapSong(song))]);
    console.table(recommendedSongs);
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