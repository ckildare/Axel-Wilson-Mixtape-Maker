import React, { createContext, useEffect, useState } from 'react';
import fetchTrackSearch from './fetchTrackSearch';
import fetchTrackRecommendations from './fetchTrackRecommendations';
import { mapTrack, addTracksToTree } from 'utils/trackUtils';
import buildSettings from 'utils/reccUtils';
import { refreshTokenAndSetTimeout, getTokenFromSessionStorage, updateSessionStorageSearchQuery } from 'utils/tokenUtils';

const initialContext = {
  currentTracks: [],
  searchFetchCount: 0,
  isArtistSearch: false,
  recommendationFetchCount: 0,
  trackTree: null,
};

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [currentTracks, setCurrentTracks] = useState(initialContext.currentTracks);
  const [trackTree, setTrackTree] = useState(initialContext.trackTree);
  const [searchFetchCount, setSearchFetchCount] = useState(initialContext.searchFetchCount);
  const [recommendationFetchCount, setRecommendationFetchCount] = useState(initialContext.recommendationFetchCount);
  const [isArtistSearch, setIsArtistSearch] = useState(initialContext.isArtistSearch);

  // Get Client Auth Token and Start Auth Token Refresh Interval
  useEffect(() => {
    refreshTokenAndSetTimeout();
  }, []);

  const searchTracks = async (request) => {
    const token = await getTokenFromSessionStorage();
    const sessionQuery = await updateSessionStorageSearchQuery(request, isArtistSearch);
    if (!sessionQuery) return;

    const trackSearchResponse = await fetchTrackSearch(sessionQuery, token, searchFetchCount * 5);
    if (!trackSearchResponse || trackSearchResponse?.tracks?.items.length == 0) {
      console.error('No tracks found for request: ', request);
      return;
    }

    // For Refreshing Search In Case User Wants to See More Results From the Same Query
    // Maybe Do Pagination Instead? ( paginate every 5 results on different queries )
    setSearchFetchCount(searchFetchCount + 1);
    setCurrentTracks([...trackSearchResponse.tracks.items.map(track => mapTrack(track))]);
    console.table(currentTracks);
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
    setCurrentTracks([...trackRecommendationsResponse.tracks.map(track => mapTrack(track))]);
    setTrackTree(addTracksToTree(trackTree, track.id, trackRecommendationsResponse.tracks));
    console.table(currentTracks);
  };

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      currentTracks: currentTracks,
      recommendationFetchCount: recommendationFetchCount,
      trackTree: trackTree,
      setTrackTree,
      searchTracks,
      setIsArtistSearch,
      getRecommendations
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  );
};

export { SpotifyAPIProvider, SpotifyAPIContext };