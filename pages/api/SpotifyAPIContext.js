import React, { createContext, useEffect, useState } from 'react';
import fetchTrackSearch from './fetchTrackSearch';
import fetchTrackRecommendations from './fetchTrackRecommendations';
import { mapTrack, addTracksToTree } from 'utils/trackUtils';
import buildSettings from 'utils/reccUtils';
import { getTokenFromSessionStorage, updateSessionSearchQuery, removeTrackQuery, removeSearchQuery } from 'utils/sessionStorageUtils';
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

  useEffect(() => {
    if (selectedTracks.length == 0) return;
    let newTree = trackTree;
    if (!trackTree) {
      newTree = addTracksToTree(null, null, selectedTracks);
      console.log('newTree: ', newTree);
    }

    setTrackTree(addTracksToTree(newTree, currentTracks, selectedTracks));
    console.log('trackTree: ', trackTree);
  }, [currentTracks]);

  const searchTracks = async (request, isRetry) => {
    const token = await getTokenFromSessionStorage();
    const sessionQuery = await updateSessionSearchQuery(request, isArtistSearch);
    if (!sessionQuery) return;
    const newFetchCount = isRetry ? searchFetchCount + 1 : 0;

    const trackSearchResponse = await fetchTrackSearch(sessionQuery, token, newFetchCount * 5);
    if (!trackSearchResponse || trackSearchResponse?.tracks?.items.length == 0) {
      console.error('No tracks found for request: ', request);
      return;
    }

    setSearchFetchCount(newFetchCount);
    setCurrentTracks([...trackSearchResponse.tracks.items.map(track => mapTrack(track))]);
  };

  const getRecommendations = async (tracks) => {
    const token = await getTokenFromSessionStorage();
    const trackIDs = (tracks || []).slice(0, 5).map(track => track.id);
    const settings = buildSettings(trackIDs, 5);

    const trackRecommendationsResponse = await fetchTrackRecommendations(settings, token);
    if (!trackRecommendationsResponse || trackRecommendationsResponse?.tracks?.length == 0) {
      console.error('No recommendations found for track ID: ', trackIDs.join(', '));
      return null;
    }

    setCurrentTracks([...trackRecommendationsResponse.tracks.map(track => mapTrack(track))]);
    setSelectedTracks([...selectedTracks, ...tracks]);
    return trackRecommendationsResponse.tracks;
  };

  const useFinalTracks = async (query) => {
    const token = await getTokenFromSessionStorage();
    if (!query) return;

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