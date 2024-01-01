import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import Loader from 'components/cards/Loader/Loader';

const RecommendationsPage = () => {
  const router = useRouter();
  const { getRecommendations, currentTracks, selectedTracks } = useContext(SpotifyAPIContext);
  const [selectedTracksForRecommendations, setSelectedTracksForRecommendations] = useState([]);
  const [isReccsLoading, setIsReccsLoading] = useState(false);

  const handleRecommend = async () => {
    setIsReccsLoading(true);
    await getRecommendations(selectedTracksForRecommendations);
    setSelectedTracksForRecommendations([]);
    setIsReccsLoading(false);
  };

  const handleTrackSelect = (isSelected, track) => {
    track.isSelected = isSelected;
    let newSelectedTracks = [...selectedTracksForRecommendations];

    if (isSelected) {
      newSelectedTracks.push(track);
    } else {
      const indexToRemove = newSelectedTracks.findIndex(t => t.id === track.id);
      if (indexToRemove !== -1) {
        newSelectedTracks.splice(indexToRemove, 1);
      }
    }
    setSelectedTracksForRecommendations(newSelectedTracks);
  };

  const handleFinish = () => {
    router.push('/result');
  };

  useEffect(() => {
    if (selectedTracks.length < 1 && currentTracks?.length < 1) router.push('/');
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.tracks}>
        {(currentTracks || []).map((track, key) => {
          return (
            <div key={key}>
              <Loader isLoading={isReccsLoading}>
                <TrackCard track={track} onSelect={(e) => handleTrackSelect(e, track)} />
              </Loader>
            </div>
          );
        })}
      </div>
      <div className={styles.bottomButtons}>
        <Button text={'Recommend'} type={'primary'} isLoading={isReccsLoading} onClick={() => handleRecommend()} disabled={selectedTracksForRecommendations.length < 1 || selectedTracks.length > 15} />
        <Button text={'Finish'} onClick={() => handleFinish()} />
      </div>
    </div >
  );
};

export default RecommendationsPage;