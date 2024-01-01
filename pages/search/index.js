import { SpotifyAPIContext } from 'spotifyContext';
import { useRouter } from 'next/router';
import { getAccessTokenCookie } from 'utils/sessionStorageUtils';
import Button from 'components/Button/Button';
import Card from 'components/cards/Card/Card';
import React, { useState, useContext, useEffect } from 'react';
import styles from './index.module.scss';
import TextInput from 'components/TextInput/TextInput';
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Link from 'next/link';

const SearchPage = () => {
  const { searchTracks, currentTracks, setIsArtistSearch, getRecommendations } = useContext(SpotifyAPIContext);
  const router = useRouter();
  const [inputTrackTitle, setInputTrackTitle] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingReccs, setIsLoadingReccs] = useState(false);
  //
  const [token, setToken] = useState('');
  //
  const [selectedTracksForRecommendations, setSelectedTracksForRecommendations] = useState([]);

  const handleSearchButtonClick = async (isRetry) => {
    setIsLoadingSearch(true);
    await searchTracks(inputTrackTitle, isRetry);

    if (currentTracks.length == 1) {
      // TODO: display no tracks found message
      console.log('no tracks found');
    }

    setIsLoadingSearch(false);
  };

  const handleRecommendClick = async () => {
    setIsLoadingReccs(true);
    if (selectedTracksForRecommendations.length < 1) return;

    setIsLoadingReccs(await getRecommendations(selectedTracksForRecommendations) !== null);
    setSelectedTracksForRecommendations([]);
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

    console.log('newSelectedTracks: ', newSelectedTracks);
    setSelectedTracksForRecommendations(newSelectedTracks);
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
    async function getToken() {
      let token = getAccessTokenCookie();
      if (!token) {
        await fetch('/auth/token');
        token = getAccessTokenCookie();
      }
      console.log('token: ', token);
      if (token) setToken(token);
    }

    getToken();
  }, []);

  return (
    <div className={styles.screenWrapper}>
      {token === '' && <Login />}
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
          <div className={styles.searchTracks}>
            {(currentTracks || []).map((track, key) => {
              return (
                <TrackCard key={key} track={track} onSelect={(e) => handleTrackSelect(e, track)} />
              );
            })}
          </div>
          <div className={styles.bottomButtons}>
            <Button text={'More Resuts'} onClick={() => handleSearchButtonClick(true)} />
            <Button text={'Recommend'} isLoading={isLoadingReccs} onClick={() => handleRecommendClick()} disabled={selectedTracksForRecommendations.length < 1} />
          </div>
        </div>}
      <Button type={'primary'} text={'About'} onClick={() => router.push('/about')} />
    </div>
  );
};

const Login = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link href={'http://localhost:5000/auth/login'}>
          Login with Spotify
        </Link>
      </header>
    </div>
  );
};

export default SearchPage;