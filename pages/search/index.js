import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';
import Card from 'components/cards/Card/Card';
import React, { useState, useContext } from 'react';
import styles from './index.module.scss';
import TextInput from 'components/TextInput/TextInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';

const SearchPage = () => {
  const { searchTracks, currentTracks, setIsArtistSearch } = useContext(SpotifyAPIContext);
  const router = useRouter();
  const [inputTrackTitle, setInputTrackTitle] = useState('');

  const handleSearchButtonClick = async (inputTrackTitle) => {
    await searchTracks(inputTrackTitle);

    if (currentTracks.length == 1) {
      // TODO: display no tracks found message
      console.log('no tracks found');
    }

    router.push('/selection');
  };

  return (
    <div className={styles.screenWrapper}>
      <Card className={styles.searchCard}>
        <div className={styles.topRow}>
          <div className={styles.searchText}>Search for a Song</div>
          <ToggleSwitch
            className={styles.seedSettingPill}
            handleToggle={(isOn) => setIsArtistSearch(isOn)}
            onText={'Artist'}
            offText={'Title'}
            name={'artistOrTitle'}
          />
        </div>
        <TextInput
          rowNumber={1}
          required
          autocorrect
          type={'tertiary'}
          placeHolder={'Enter Track Title'}
          onChange={(e) => setInputTrackTitle(e)}
        />
        <Button type={'tertiary'} text={'Search'} onClick={() => handleSearchButtonClick(inputTrackTitle)} />
      </Card>
      <Button type={'primary'} text={'About'} onClick={() => router.push('/about')} />
    </div>
  );
};

export default SearchPage;