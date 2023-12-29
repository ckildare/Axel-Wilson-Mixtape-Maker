import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';
import Card from 'components/cards/Card/Card';
import React, { useState, useContext } from 'react';
// import styles from './index.module.scss';
import TextInput from 'components/TextInput/TextInput';

const TrackSearchPage = () => {
  const { searchTracks, searchedTracks } = useContext(SpotifyAPIContext);
  const router = useRouter();
  const [inputTrackTitle, setInputTrackTitle] = useState('');

  const handleSearchButtonClick = async (inputTrackTitle) => {
    window.sessionStorage.setItem('search_query_title', inputTrackTitle);
    await searchTracks(inputTrackTitle);

    if (searchedTracks.length == 1) {
      // TODO: display no tracks found message
      console.log('no tracks found');
    }

    router.push('/trackSelection');
  };

  return (
    <Card >
      penis
      <TextInput
        rowNumber={1}
        required
        autocorrect
        type={'tertiary'}
        placeHolder={'Enter Track Title'}
        onChange={(e) => setInputTrackTitle(e)}
      />
      <Button type={'tertiary'} text={'also penis'} onClick={() => handleSearchButtonClick(inputTrackTitle)} />
    </Card>
  );
};

export default TrackSearchPage;