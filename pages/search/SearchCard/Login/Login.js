import React, { useState, useEffect, useContext } from 'react';
import TrackCard from 'components/TrackView/TrackCard/TrackCard';
import Button from 'components/UserInput/Button/Button';
import { StorageContext } from 'contexts/StorageContext';
import styles from './Login.module.scss';
import { ReccsContext } from 'contexts/ReccsContext';

const Login = () => {
  const { getAccessToken, removeAccessToken } = useContext(StorageContext);
  const [token, setToken] = useState(null);

  useEffect(() => console.log('token', token), [token]);

  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessToken();
      setToken(token);
    };
    getToken();
  }, []);

  return (
    <> {
      token == null ?
        <div>
          <Button
            type={'tertiary'}
            text={'Login with Spotify'}
            onClick={() => window.location.href = 'api/auth/login'}
          />
        </div>
        :
        <div className={styles.loggedIn}>
          <WebPlayback token={token} />
          <Button
            type={'tertiary'}
            text={'Logout'}
            onClick={() => { removeAccessToken(); setToken(null); }}
          />
        </div>
    } </>
  );
};

const WebPlayback = ({ token }) => {
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
  const { selectSeed } = useContext(ReccsContext);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: 'Axel Wilson\'s Mixtape Maker',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

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
        console.log('Player State Changed', state);
        if (state && state.track_window && state.track_window.current_track) {
          const newTrack = state.track_window.current_track;
          if (newTrack !== currentPlayingTrack) {
            setCurrentPlayingTrack(newTrack);
          }
        }
      });

      newPlayer.connect();
    };
  }, [token, currentPlayingTrack]);

  return (
    <div className={styles.card}> {
      currentPlayingTrack ?
        <TrackCard
          trackID={currentPlayingTrack.id}
          parentIsLoading={currentPlayingTrack == null}
          onSelect={isSelected => selectSeed(isSelected, currentPlayingTrack)}
        />
        :
        <div className={styles.placeholder}>Need to Change Device to Axel Wilson&apos;s Mixtape Maker</div>
    } </div>
  );
};

export default Login;