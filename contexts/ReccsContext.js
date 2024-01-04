import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { addTracksToTree, mapTrack } from 'utils/trackUtils';
import { StorageContext } from './StorageContext';
import fetchTrackRecommendations from 'pages/api/fetchTrackRecommendations';
import buildSettings from 'utils/reccUtils';

const initialContext = {
  isLoadingReccs: false,
  reccTracks: [],
  selectedSeeds: [],
  reccRoundCount: 0,
};

const ReccsContext = createContext(initialContext);

const ReccsProvider = ({ children }) => {
  const [reccTracks, setReccTracks] = useState(initialContext.reccTracks);
  const [selectedSeeds, setSelectedSeeds] = useState([]);
  const [isLoadingReccs, setIsLoadingReccs] = useState(initialContext.isLoadingReccs);
  const [reccRoundCount, setReccRoundCount] = useState(initialContext.reccRoundCount);
  const { touchBearerToken, setSelectedTracks, trackTree, setTrackTree, isRestart } = useContext(StorageContext);

  useEffect(() => {
    setReccTracks([]);
    setSelectedSeeds([]);
    setIsLoadingReccs(false);
    setReccRoundCount(0);
  }, [isRestart]);

  useEffect(() => { setSelectedSeeds([]); }, [isLoadingReccs]);

  useEffect(() => {
    if (!reccTracks || reccTracks.length == 0) return;
    if (selectedSeeds.length == 0) return;
    let newTree = trackTree;
    if (!trackTree) {
      newTree = addTracksToTree(null, null, selectedSeeds);
      console.log('newTree: ', newTree);
    }

    setTrackTree(addTracksToTree(newTree, reccTracks, selectedSeeds));
    console.log('trackTree: ', trackTree);
  }, [reccTracks]);

  const fetchTrackReccs = async () => {
    setIsLoadingReccs(true);
    const token = await touchBearerToken();
    const trackIDs = (selectedSeeds || []).slice(0, 5).map(track => track.id);
    const settings = buildSettings(trackIDs, 5);

    const trackRecommendationsResponse = await fetchTrackRecommendations(settings, token);
    if (!trackRecommendationsResponse || trackRecommendationsResponse?.tracks?.length == 0) {
      console.error('No recommendations found for track ID: ', trackIDs.join(', '));
      return null;
    }

    setSelectedTracks([...selectedSeeds]);
    setReccRoundCount(reccRoundCount + 1);
    setReccTracks([...trackRecommendationsResponse.tracks.map(track => mapTrack(track))]);
    setIsLoadingReccs(false);
    return trackRecommendationsResponse.tracks;
  };

  const selectSeed = (isSelected, track) => {
    track.isSelected = isSelected;
    let newSelectedTracks = [...selectedSeeds];

    if (isSelected) {
      newSelectedTracks.push(track);
    } else {
      const indexToRemove = newSelectedTracks.findIndex(t => t.id === track.id);
      if (indexToRemove !== -1) {
        newSelectedTracks.splice(indexToRemove, 1);
      }
    }
    setSelectedSeeds(newSelectedTracks);
  };

  const memoFetchTrackReccs = useMemo(() => fetchTrackReccs, [fetchTrackReccs]);
  const memoizedSelectSeed = useMemo(() => selectSeed, [selectSeed]);
  const memoizedSetSelectedSeeds = useMemo(() => setSelectedSeeds, [setSelectedSeeds]);
  const memoizedreccTracks = useMemo(() => reccTracks, [reccTracks]);
  const memoizedSelectedSeeds = useMemo(() => selectedSeeds, [selectedSeeds]);

  const memoizedContextValue = useMemo(() => {
    return {
      fetchTrackReccs: memoFetchTrackReccs,
      selectSeed: memoizedSelectSeed,
      setSelectedSeeds: memoizedSetSelectedSeeds,
      selectedSeeds: memoizedSelectedSeeds,
      reccTracks: memoizedreccTracks,
      isLoadingReccs,
      reccRoundCount,
    };
  }, [
    memoFetchTrackReccs,
    memoizedSelectSeed,
    memoizedSetSelectedSeeds,
    memoizedSelectedSeeds,
    memoizedreccTracks,
    isLoadingReccs,
    reccRoundCount
  ]);

  return (
    <ReccsContext.Provider value={memoizedContextValue}>
      {children}
    </ReccsContext.Provider>
  );
};

export { ReccsContext, ReccsProvider };