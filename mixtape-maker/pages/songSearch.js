import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from './api/SpotifyAPIContext';
import Card from '../components/cards/Card/Card';
import Button from '../components/Button/Button';
import TextInput from '../components/TextInput/TextInput';
import styles from '../styles/songSearch.module.scss';

import fetchSongSearch from './api/fetchSongSearch';

const SongSearchPage = () => {
  const { searchSongs, searchedSongs } = useContext(SpotifyAPIContext);
  const router = useRouter();

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

  const [isMobile, setIsMobile] = useState(false);
  const [inputSongTitle, setInputSongTitle] = useState('');

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth < 1150);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const handleSearchButtonClick = (inputSongTitle) => {
    searchSongs(inputSongTitle);

    if (searchedSongs.length < 1) {
      // TODO: display no songs found message
      console.log('no songs found');
    }

    router.push('/songSelection');
  };

  return (
    <Card >
      penis
      <TextInput
        rowNumber={1}
        required
        autocorrect
        type={'tertiary'}
        placeHolder={'Enter Song Title'}
        onChange={(e) => setInputSongTitle(e)}
      />
      <Button type={'tertiary'} text={"also penis"} onClick={() => handleSearchButtonClick(inputSongTitle)} />
    </Card>
  )
};

export default SongSearchPage;