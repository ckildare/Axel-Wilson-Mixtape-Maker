import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import styles from './index.module.scss';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';

const SelectionPage = () => {
  const router = useRouter();
  const { getRecommendations, currentTracks, searchTracks } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [isLoadingReccs, setIsLoadingReccs] = useState(false);

  const handleButtonClick = async () => {
    setIsLoadingReccs(true);
    if (selectedTrackIndex === null) return;
    const targetTrack = currentTracks[selectedTrackIndex];

    setIsLoadingReccs(await getRecommendations(targetTrack) !== null);
    setSelectedTrackIndex(null);
  };

  useEffect(() => {
    if (!isLoadingReccs) return;
    if (currentTracks.length == 0) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
      return;
    }
    router.push('/recommendations');
  }, [isLoadingReccs]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentTracks?.length > 0) return;
      if (await searchTracks() == null) router.push('/');
    };
    fetchData();
  }, []);

  return (
    <div className={styles.screenWrapper}>
      {(currentTracks || []).map((track, key) => {
        return (
          <div key={key} onClick={() => { setSelectedTrackIndex(key == selectedTrackIndex ? null : key); }}>
            <TrackCard track={track} isSelected={selectedTrackIndex === key} />
          </div>
        );
      })}
      <Button text={'Recommend'} isLoading={isLoadingReccs} onClick={() => handleButtonClick()} disabled={selectedTrackIndex === null} />
    </div>
  );
};

export default SelectionPage;