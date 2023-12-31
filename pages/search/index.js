import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import Button from 'components/Button/Button';
import Card from 'components/cards/Card/Card';
import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.scss';
import TextInput from 'components/TextInput/TextInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import TrackCard from 'components/cards/TrackCard/TrackCard';

const SearchPage = () => {
  const { searchTracks, currentTracks, setIsArtistSearch, getRecommendations } = useContext(SpotifyAPIContext);
  const router = useRouter();
  const [inputTrackTitle, setInputTrackTitle] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingReccs, setIsLoadingReccs] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);

  const handleSearchButtonClick = async (isRetry) => {
    setIsLoadingSearch(true);
    await searchTracks(inputTrackTitle,  isRetry);

    if (currentTracks.length == 1) {
      // TODO: display no tracks found message
      console.log('no tracks found');
    }

    setIsLoadingSearch(false);
  };

  const handleRecommendClick = async () => {
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
      await searchTracks(null, false);
    };
    fetchData();
  }, []);

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
        <Button isLoading={isLoadingSearch} type={'tertiary'} text={'Search'} onClick={() => handleSearchButtonClick(false)} />
      </Card>
      {currentTracks.length > 0 &&
        <div className={styles.screenWrapper}>
          {(currentTracks || []).map((track, key) => {
            return (
              <div key={key} onClick={() => { setSelectedTrackIndex(key == selectedTrackIndex ? null : key); }}>
                <TrackCard track={track} isSelected={selectedTrackIndex === key} />
              </div>
            );
          })}
          <div className={styles.bottomButtons}>
            <Button text={'More Resuts'} onClick={() => handleSearchButtonClick(true)} />
            <Button text={'Recommend'} isLoading={isLoadingReccs} onClick={() => handleRecommendClick()} disabled={selectedTrackIndex === null} />
          </div>
        </div>}
      <Button type={'primary'} text={'About'} onClick={() => router.push('/about')} />
    </div>
  );
};

export default SearchPage;