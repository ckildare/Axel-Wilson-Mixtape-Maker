import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import Loader from 'components/cards/Loader/Loader';

const RecommendationsPage = () => {
  const router = useRouter();
  const { getRecommendations, currentTracks, selectedTracks, navigateBack } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [isReccsLoading, setIsReccsLoading] = useState(false);

  const handleRecommend = async () => {
    setIsReccsLoading(true);
    await getRecommendations(currentTracks[selectedTrackIndex]);
    setSelectedTrackIndex(null);
    setIsReccsLoading(false);
  };

  const handleFinish = () => {
    router.push('/result');
  };

  useEffect(() => {
    if (currentTracks.length == 0) navigateBack('recommendations', router);
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.tracks}>
        {(currentTracks || []).map((track, key) => {
          return (
            <div key={key} onClick={() => { setSelectedTrackIndex(key == selectedTrackIndex ? null : key); }}>
              <Loader isLoading={isReccsLoading}>
                <TrackCard track={track} isSelected={selectedTrackIndex === key} />
              </Loader>
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