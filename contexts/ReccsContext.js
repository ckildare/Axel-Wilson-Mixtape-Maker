import React, { useState, createContext, useContext, useEffect, useMemo, memo } from 'react';
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
  const {
    touchBearerToken,
    setSelectedTracks,
    trackTree,
    setTrackTree,
    isRestart
  } = useContext(StorageContext);

  useEffect(() => {
    setReccTracks([]);
    setSelectedSeeds([]);
    setIsLoadingReccs(false);
    setReccRoundCount(0);
  }, [isRestart]);

  const memoSelectedSeeds = useMemo(() => [...selectedSeeds], [selectedSeeds]);
  const memoSetSelectedSeeds = useMemo(() => (newSelectedSeeds) => { setSelectedSeeds(newSelectedSeeds); }, [setSelectedSeeds]);
  const memoReccTracks = useMemo(() => [...reccTracks], [reccTracks]);

  useEffect(() => {
    if (!memoReccTracks || memoReccTracks.length == 0 || selectedSeeds.length == 0) return;
    const newTree = trackTree ? trackTree : addTracksToTree(null, null, selectedSeeds);

    setTrackTree(addTracksToTree(newTree, memoReccTracks, selectedSeeds));
    setSelectedSeeds([]);
  }, [memoReccTracks]);

  const memoPrepareFetchTrackReccs = useMemo(() => async () => {
    setIsLoadingReccs(true);
    const trackIDs = (selectedSeeds || []).slice(0, 5).map(track => track.id);
    const settings = buildSettings(trackIDs, 5);
    return settings;
  }, [selectedSeeds, setIsLoadingReccs]);

  const memoCleanUpReccs = useMemo(() => (trackRecommendationsResponse) => {
    setSelectedTracks([...selectedSeeds]);
    setReccRoundCount(reccRoundCount + 1);
    setReccTracks([...trackRecommendationsResponse.tracks.map(track => mapTrack(track))]);
    setIsLoadingReccs(false);
  }, [reccRoundCount, selectedSeeds, setSelectedTracks, setReccRoundCount, setReccTracks, setIsLoadingReccs]);

  const memoFetchTrackReccs = useMemo(() => async () => {
    const token = await touchBearerToken();
    const settings = await memoPrepareFetchTrackReccs();

    const trackRecommendationsResponse = await fetchTrackRecommendations(settings, token);
    if (!trackRecommendationsResponse || trackRecommendationsResponse?.tracks?.length == 0) {
      console.error('No recommendations found for settings: ', settings);
      return null;
    }

    memoCleanUpReccs(trackRecommendationsResponse);
    return trackRecommendationsResponse.tracks;
  }, [touchBearerToken, memoPrepareFetchTrackReccs, memoCleanUpReccs]);

  const memoSelectSeed = useMemo(() => (isSelected, track) => {
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
  }, [selectedSeeds, setSelectedSeeds]);

  const memoContextValue = useMemo(() => {
    return {
      fetchTrackReccs: memoFetchTrackReccs,
      selectSeed: memoSelectSeed,
      setSelectedSeeds: memoSetSelectedSeeds,
      selectedSeeds: memoSelectedSeeds,
      reccTracks: memoReccTracks,
      isLoadingReccs,
      reccRoundCount,
    };
  }, [
    memoFetchTrackReccs,
    memoSelectSeed,
    memoSetSelectedSeeds,
    memoSelectedSeeds,
    memoReccTracks,
    isLoadingReccs,
    reccRoundCount
  ]);

  return (
    <ReccsContext.Provider value={memoContextValue}>
      {children}
    </ReccsContext.Provider>
  );
};

export { ReccsContext, ReccsProvider };