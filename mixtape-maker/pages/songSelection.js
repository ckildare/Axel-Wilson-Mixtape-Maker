import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import styles from './styles/songSelection.module.scss'
import SongCard from 'components/cards/SongCard/SongCard';

const SongSelectionPage = () => {
  const router = useRouter();
  const { searchedSongs } = useContext(SpotifyAPIContext);

  return (
    <div>
      hi
      {(searchedSongs || []).map((song, key) => {
        return (
          <SongCard key={key} song={song} index={key} handleSongClick={() => {}} />
        );
      })}
    </div>
  );
};

export default SongSelectionPage;