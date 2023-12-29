import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import { addTracksToTree } from 'utils/trackUtils';

const TrackSelectionPage = () => {
  const router = useRouter();
  const { searchedTracks, searchTracks, getRecommendations, recommendedTracks, trackTree, setTrackTree } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  const handleNoTracks = async () => {
    const trackTitleQuery = window.sessionStorage.getItem('search_query_title');

    // Users shouldn't be here if they haven't made a query yet, send them back
    if (!trackTitleQuery) router.push('/');
    await searchTracks(trackTitleQuery);
  };

  const handleButtonClick = async () => {
    setTrackTree(addTracksToTree(null, null, [searchedTracks[selectedTrackIndex]]));
  };

  useEffect(() => {
    async function getReccs(targetTrack) {
      await getRecommendations(targetTrack);
    }
    if (selectedTrackIndex === null) return;

    const targetTrack = searchedTracks[selectedTrackIndex];
    console.log(`selectedTrackIndex: ${JSON.stringify(selectedTrackIndex, null, 2)}`);
    getReccs(targetTrack);
    setSelectedTrackIndex(null);
  }, [trackTree !== null]);

  useEffect(() => {
    if (recommendedTracks.length == 0) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
    } else {
      router.push('/recommendations');
    }
  }, [recommendedTracks]);

  useEffect(() => {
    if (searchedTracks.length == 0) handleNoTracks();
  }, []);

  return (
    <div className={styles.screenWrapper}>
      {(searchedTracks || []).map((track, key) => {
        return (
          <div key={key} onClick={() => { setSelectedTrackIndex(key); }}>
            <TrackCard track={track} isSelected={selectedTrackIndex === key} />
          </div>
        );
      })}
      <Button text={'Recommend'} onClick={() => handleButtonClick()} disabled={!selectedTrackIndex} />
    </div>
  );
};

export default TrackSelectionPage;