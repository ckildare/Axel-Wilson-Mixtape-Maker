import { useRouter } from 'next/router';
import TextInput from 'components/UserInput/TextInput/TextInput';
import styles from './SearchCard.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import ToggleSwitch from 'components/UserInput/ToggleSwitch/ToggleSwitch';
import Button from 'components/UserInput/Button/Button';
import { SearchContext } from 'contexts/SearchContext';
import { StorageContext } from 'contexts/StorageContext';
import TrackCard from 'components/TrackView/TrackCard/TrackCard';

const SearchCard = () => {
  const {
    isLoadingSearch,
    mapSearchParams,
    setIsTitleSearch,
    isTitleSearch,
    searchQuery,
    setSearchQuery
  } = useContext(SearchContext);
  const { getAccessToken } = useContext(StorageContext);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    window.location.href = 'api/auth/login';
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken();
      setToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    console.log('token', token);
  }, [token]);

  return (
    <div className={styles.searchCard}>
      <div className={styles.topRow}>
        <div className={styles.searchText}>Search for songs by</div>
        <ToggleSwitch
          className={styles.seedSettingPill}
          handleToggle={(isOn) => setIsTitleSearch(!isOn)}
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
        placeHolder={`Enter the song${isTitleSearch ? ' title' : '\'s artist'}...`}
        onChange={(e) => setSearchQuery(e)}
      />
      <div className={styles.searchButton}>
        <Button
          isLoading={isLoadingSearch}
          type={'tertiary'}
          text={'Search'}
          onClick={async () => router.push(`/search${mapSearchParams(searchQuery)}`)}
        />
        <Button
          isLoading={isLoadingSearch}
          type={'tertiary'}
          text={token == null ? 'Login with Spotify' : 'Logout'}
          onClick={async () => await handleLogin()}
        />
        {token && <WebPlayback token={token} />}
      </div>
    </div>
  );
};

const WebPlayback = ({ token }) => {
  const [player, setPlayer] = useState(null);
  const [currentPlayingTrackId, setCurrentPlayingTrackId] = useState(null);

  useEffect(() => {
    console.log('Setting up Spotify SDK');

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log('Spotify SDK is ready');

      const newPlayer = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(newPlayer);

      newPlayer.addListener('initialization_error', (error) => {
        console.error('Initialization Error', error);
      });

      newPlayer.addListener('authentication_error', (error) => {
        console.error('Authentication Error', error);
      });

      newPlayer.addListener('account_error', (error) => {
        console.error('Account Error', error);
      });

      newPlayer.addListener('playback_error', (error) => {
        console.error('Playback Error', error);
      });

      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      newPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      newPlayer.addListener('player_state_changed', (state) => {
        console.log('Player state changed', state);
        if (state && state.track_window && state.track_window.current_track) {
          const newTrackId = state.track_window.current_track.id;
          if (newTrackId !== currentPlayingTrackId) {
            setCurrentPlayingTrackId(newTrackId);
          }
        }
      });

      newPlayer.connect();
    };
  }, [token, currentPlayingTrackId]);

  useEffect(() => {
    console.log('currentPlayingTrackId', currentPlayingTrackId);
  }, [currentPlayingTrackId]);

  useEffect(() => {
    console.log('player', player);
  }, [player]);

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          {currentPlayingTrackId && (
            <TrackCard trackID={currentPlayingTrackId} parentIsLoading={currentPlayingTrackId == null} />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchCard;