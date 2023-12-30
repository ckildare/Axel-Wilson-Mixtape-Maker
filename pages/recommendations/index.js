import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';

const RecommendationsPage = () => {
  const router = useRouter();
  const { getRecommendations, currentTracks, selectedTracks } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  const handleRecommend = async () => {
    await getRecommendations(currentTracks[selectedTrackIndex]);
    setSelectedTrackIndex(null);
  };

  const handleFinish = () => {
    router.push('/result');
  };

  useEffect(() => {
    if (currentTracks.length == 0) router.push('/trackSelection');
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.tracks}>
        {(currentTracks || []).map((track, key) => {
          return (
            <div key={key} onClick={() => { setSelectedTrackIndex(key == selectedTrackIndex ? null : key); }}>
              <TrackCard track={track} isSelected={selectedTrackIndex === key} />
            </div>
          );
        })}
      </div>
      <div className={styles.bottomButtons}>
        <Button text={'Recommend'} type={'primary'} onClick={() => handleRecommend()} disabled={!selectedTrackIndex || selectedTracks.length > 15} />
        <Button text={'Finish'} onClick={() => handleFinish()} />
      </div>
    </div>
  );
};

export default RecommendationsPage;