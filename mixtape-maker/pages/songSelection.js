import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import styles from './pageStyles/songSelection.module.scss';
import SongCard from 'components/cards/SongCard/SongCard';

const SongSelectionPage = () => {
  const router = useRouter();
  const { searchedSongs, searchSongs } = useContext(SpotifyAPIContext);

  const handleNoSongs = async () => {
    const songTitleQuery = window.sessionStorage.getItem('search_query_title');

    // Users shouldn't be here if they haven't made a query yet, send them back
    if (!songTitleQuery) router.push('/');
    await searchSongs(songTitleQuery);
  }

  useEffect(() => {
    // Make sure we have songs
    if (searchedSongs.length < 1) handleNoSongs();
  }, [])

  return (
    <div className={styles.screenWrapper}>
      {(searchedSongs || []).map((song, key) => {
        return (
          <SongCard key={key} song={song} index={key} handleSongClick={() => {}} />
        );
      })}
    </div>
  );
};

export default SongSelectionPage;