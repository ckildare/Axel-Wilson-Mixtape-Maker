import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import styles from './index.module.scss';
import SongCard from 'components/cards/SongCard/SongCard';
import Button from 'components/Button/Button';

const SongSelectionPage = () => {
  const router = useRouter();
  const { searchedSongs, searchSongs, getRecommendations, recommendedSongs } = useContext(SpotifyAPIContext);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  const handleNoSongs = async () => {
    const songTitleQuery = window.sessionStorage.getItem('search_query_title');

    // Users shouldn't be here if they haven't made a query yet, send them back
    if (!songTitleQuery) router.push('/');
    await searchSongs(songTitleQuery);
  };

  const handleButtonClick = async () => {
    const selectedSong = searchedSongs[selectedSongIndex];

    await getRecommendations(selectedSong);
    if (recommendedSongs.length < 1) {
      // TODO: display no recommendations found message
      console.log('no recommendations found');
    } else {
      router.push('/recommendations');
    }
  };

  useEffect(() => {
    // Make sure we have songs
    if (searchedSongs.length < 1) handleNoSongs();
  }, []);

  return (
    <div className={styles.screenWrapper}>
      {(searchedSongs || []).map((song, key) => {
        return (
          <div key={key} onClick={() => { setSelectedSongIndex(key) }}>
            <SongCard song={song} isSelected={selectedSongIndex === key} />
          </div>
        );
      })}
      <Button text={'Recommend'} onClick={() => handleButtonClick()} disabled={!selectedSongIndex} />
    </div>
  );
};

export default SongSelectionPage;