import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';

const RecommendationsPage = () => {
  const router = useRouter();
  const { getRecommendations, recommendedTracks, recommendationFetchCount } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  const handleRecommend = async () => {
    await getRecommendations(recommendedTracks[selectedTrackIndex]);
    setSelectedTrackIndex(null);
  };

  const handleFinish = () => {
    router.push('/result');
  };

  useEffect(() => {
    if (recommendedTracks.length == 0) router.push('/trackSelection');
  }, []);

  return (
    <div className={styles.screenWrapper}>
      {(recommendedTracks || []).map((track, key) => {
        return (
          <div key={key} onClick={() => { setSelectedTrackIndex(key); }}>
            <TrackCard track={track} isSelected={selectedTrackIndex === key} />
          </div>
        );
      })}
      <Button text={'Recommend'} type={'secondary'} onClick={() => handleRecommend()} disabled={!selectedTrackIndex || recommendationFetchCount > 15} />
      <Button text={'Finish'} onClick={() => handleFinish()} />
    </div>
  );
};

export default RecommendationsPage;