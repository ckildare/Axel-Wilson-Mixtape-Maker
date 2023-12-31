import React, { createContext, useEffect, useState } from 'react';
import fetchTrackSearch from './fetchTrackSearch';
import fetchTrackRecommendations from './fetchTrackRecommendations';
import { mapTrack, addTracksToTree } from 'utils/trackUtils';
import buildSettings from 'utils/reccUtils';
import { refreshTokenAndSetTimeout, getTokenFromSessionStorage, updateSessionSearchQuery, removeTrackQuery, removeSearchQuery } from 'utils/sessionStorageUtils';
import fetchGetTracks from './fetchGetTracks';

const initialContext = {
  currentTracks: [],
  selectedTracks: [],
  searchFetchCount: 0,
  isArtistSearch: false,
  trackTree: null,
};

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [currentTracks, setCurrentTracks] = useState(initialContext.currentTracks);
  const [selectedTracks, setSelectedTracks] = useState(initialContext.selectedTracks);
  const [trackTree, setTrackTree] = useState(initialContext.trackTree);
  const [searchFetchCount, setSearchFetchCount] = useState(initialContext.searchFetchCount);
  const [isArtistSearch, setIsArtistSearch] = useState(initialContext.isArtistSearch);

  // Get Client Auth Token and Start Auth Token Refresh Interval
  useEffect(() => {
    refreshTokenAndSetTimeout();
  }, []);

  useEffect(() => {
    console.info('Track Tree Updated: ', trackTree);
  }, [trackTree]);

  useEffect(() => {
    if (selectedTracks.length == 0) return;
    console.info('selectedTracks Tracks Updated: ', selectedTracks);
    let newTree = trackTree;
    if (selectedTracks.length == 1) {
      newTree = addTracksToTree(null, null, selectedTracks);
    }

    setTrackTree(addTracksToTree(newTree, selectedTracks[selectedTracks.length - 1].id, currentTracks));
  }, [selectedTracks]);

  const searchTracks = async (request) => {
    const token = await getTokenFromSessionStorage();
    const sessionQuery = await updateSessionSearchQuery(request, isArtistSearch);
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
    return trackSearchResponse.tracks.items;
  };

  const getRecommendations = async (track) => {
    console.log('getRecommendations: ', track);
    const token = await getTokenFromSessionStorage();
    const settings = buildSettings(track.id, track.artists, 5);

    const trackRecommendationsResponse = await fetchTrackRecommendations(settings, token);
    if (!trackRecommendationsResponse || trackRecommendationsResponse?.tracks?.length == 0) {
      console.error('No recommendations found for track ID: ', track.id);
      return null;
    }
    console.info('Recommendations Found: ', trackRecommendationsResponse.tracks);

    setCurrentTracks([...trackRecommendationsResponse.tracks.map(track => mapTrack(track))]);
    setSelectedTracks([...selectedTracks, track]);
    return trackRecommendationsResponse.tracks;
  };

  const useFinalTracks = async (query) => {
    const token = await getTokenFromSessionStorage();

    const tracksResponse = await fetchGetTracks(query, token);
    if (!tracksResponse || tracksResponse?.length < 1 || tracksResponse[0] == null) {
      console.error('Tracks not found for query: ', query);
      return;
    }

    if (selectedTracks?.length < 1) setSelectedTracks([...tracksResponse.map(track => mapTrack(track))]);
    return tracksResponse;
  };

  const restart = () => {
    removeSearchQuery();
    removeTrackQuery();
    setCurrentTracks([]);
    setSelectedTracks([]);
    setTrackTree(null);
    setSearchFetchCount(0);
    setIsArtistSearch(false);
  };

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      currentTracks: currentTracks,
      selectedTracks: selectedTracks,
      trackTree: trackTree,
      setTrackTree,
      searchTracks,
      setIsArtistSearch,
      getRecommendations,
      useFinalTracks,
      restart
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  );
};

export { SpotifyAPIProvider, SpotifyAPIContext };