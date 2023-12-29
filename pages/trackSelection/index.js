import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';

const TrackSelectionPage = () => {
  const router = useRouter();
  const { searchedTracks, searchTracks, getRecommendations, recommendedTracks } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  const handleNoTracks = async () => {
    const trackTitleQuery = window.sessionStorage.getItem('search_query_title');

    // Users shouldn't be here if they haven't made a query yet, send them back
    if (!trackTitleQuery) router.push('/');
    await searchTracks(trackTitleQuery);
  };

  const handleButtonClick = async () => {
    await getRecommendations(searchedTracks[selectedTrackIndex]);

    if (recommendedTracks.length == 0) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
    } else {
      router.push('/recommendations');
    }
  };

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