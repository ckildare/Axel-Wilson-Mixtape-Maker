import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.scss'
import SongCard from 'components/cards/SongCard/SongCard';
import Button from 'components/Button/Button';
import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';

const RecommendationsPage = () => {
  const router = useRouter();
  const { getRecommendations, recommendedSongs } = useContext(SpotifyAPIContext);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  const handleRecommend = async () => {
    await getRecommendations(recommendedSongs[selectedSongIndex]);
    router.push('/recommendations');
  }

  const handleFinish = () => {
    router.push('/result');
  }

  useEffect(() => {
    if (recommendedSongs.length == 0) router.push('/songSelection');
  }, []);

  return (
    <div className={styles.screenWrapper}>
      {(recommendedSongs || []).map((song, key) => {
        return (
          <div key={key} onClick={() => { setSelectedSongIndex(key) }}>
            <SongCard song={song} isSelected={selectedSongIndex === key} />
          </div>
        );
      })}
      <Button text={'Recommend'} onClick={() => handleRecommend()} disabled={!selectedSongIndex} />
      <Button text={'Finish'} onClick={() => handleFinish()} />
    </div>
  )
};

export default RecommendationsPage;