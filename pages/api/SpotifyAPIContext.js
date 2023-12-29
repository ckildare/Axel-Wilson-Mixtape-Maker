import React, { createContext, useEffect, useState } from 'react';
import fetchTrackSearch from './fetchTrackSearch';
import fetchTrackRecommendations from './fetchTrackRecommendations';
import mapTrack from 'utils/trackUtils';
import buildSettings from 'utils/reccUtils';
import { refreshTokenAndSetTimeout, getTokenFromSessionStorage } from 'utils/tokenUtils';

const initialContext = {
  searchedTracks: [],
  searchFetchCount: 0,
  recommendationFetchCount: 0,
  recommendedTracks: [],
  trackTree: {},
};

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [searchedTracks, setSearchedTracks] = useState(initialContext.searchedTracks);
  const [recommendedTracks, setRecommendedTracks] = useState(initialContext.recommendedTracks);
  // const [trackTree, setTrackTree] = useState(initialContext.trackTree);
  const [searchFetchCount, setSearchFetchCount] = useState(initialContext.searchFetchCount);
  const [recommendationFetchCount, setRecommendationFetchCount] = useState(initialContext.recommendationFetchCount);

  // Get Client Auth Token and Start Auth Token Refresh Interval
  useEffect(() => {
    refreshTokenAndSetTimeout();
  }, []);

  const searchTracks = async (request) => {
    const token = await getTokenFromSessionStorage();

    const trackSearchResponse = await fetchTrackSearch(request, token, searchFetchCount * 5);
    if (!trackSearchResponse || trackSearchResponse?.tracks?.items.length == 0) {
      console.error('No tracks found for request: ', request);
      return;
    }

    // For Refreshing Search In Case User Wants to See More Results From the Same Query
    // Maybe Do Pagination Instead? ( paginate every 5 results on different queries )
    setSearchFetchCount(searchFetchCount + 1);
    setSearchedTracks([...trackSearchResponse.tracks.items.map(track => mapTrack(track))]);
    console.table(searchedTracks);
  };

  const getRecommendations = async (track) => {
    const token = await getTokenFromSessionStorage();
    const settings = buildSettings(track.id, track.artists, 5);

    const trackRecommendationsResponse = await fetchTrackRecommendations(settings, track.name, token);
    if (!trackRecommendationsResponse || trackRecommendationsResponse?.tracks?.length == 0) {
      console.error('No recommendations found for track ID: ', track.id);
      return;
    }

    setRecommendationFetchCount(recommendationFetchCount + 1);
    setRecommendedTracks([...trackRecommendationsResponse.tracks.map(track => mapTrack(track))]);
    console.table(recommendedTracks);
  };

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      searchedTracks,
      recommendedTracks,
      searchTracks,
      getRecommendations
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  );
};

export { SpotifyAPIProvider, SpotifyAPIContext };