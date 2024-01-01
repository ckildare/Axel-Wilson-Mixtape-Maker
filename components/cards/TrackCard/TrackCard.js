import { getTokenFromSessionStorage } from 'utils/sessionStorageUtils';
// import styles from './TrackCard.module.scss';
import React, { useEffect, useState } from 'react';

const TrackCard = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: 'Your App Name',
          getOAuthToken: async (callback) => {
            const token = await getTokenFromSessionStorage();
            console.log('token: ', token);
            callback(token);
          },
        });

        player.addListener('ready', ({ device_id }) => {
          console.log(`Ready with Device ID: ${device_id}`);
          setDeviceId(device_id);
        });

        player.connect();
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <TrackCardEmbed deviceId={deviceId} />
  );
};

const TrackCardEmbed = ({ deviceId }) => {
  const handlePlayClick = () => {
    // Use the deviceId to play the track or perform other actions
    fetch(`/api/play-track?deviceId=${deviceId}&trackId=${track.id}`, {
      method: 'POST',
    });
  };

  return (
    <div>
      <button onClick={handlePlayClick}>Play Track</button>
    </div>
  );
};

export default TrackCard;