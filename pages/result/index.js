import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';

const ResultPage = () => {
  const router = useRouter();
  const [isTreeView, setIsTreeView] = useState(false);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.topButtons}>
        <Button disabled={!isTreeView} text={'Tracks'} onClick={() => setIsTreeView(false)} />
        <Button disabled={isTreeView} text={'Tree'} onClick={() => setIsTreeView(true)} />
      </div>
      {isTreeView ? <TreeView router={router} /> : <TrackView router={router} /> }
      <div className={styles.bottomButtons}>
        <Button text={'Restart'} onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

const TreeView = (router) => {
  const { trackTree } = useContext(SpotifyAPIContext);
  console.log(router);

  return (
    <div className={styles.tree}>
      {trackTree}
    </div>
  );
}

const TrackView = (router) => {
  const { getTracks } = useContext(SpotifyAPIContext);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const [tracks, setTracks] = useState([]);

  const fetchTracks = async () => {
    try {
      const tracksResponse = await getTracks();
      if (!tracksResponse || tracksResponse?.length === 0) {
        router.push('/recommend');
        return;
      } 
      
      setTracks(tracksResponse);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  useEffect(() => {
    // Define a separate function to handle the asynchronous behavior
    const fetchData = async () => {
      await fetchTracks();
    };

    fetchData(); // Call the function inside useEffect
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <div className={styles.tracks}>
      {tracks.map((track, key) => (
        <div key={key} onClick={() => setSelectedTrackIndex(key === selectedTrackIndex ? null : key)}>
          <TrackCard track={track} isSelected={selectedTrackIndex === key} />
        </div>
      ))}
    </div>
  );
};

export default ResultPage;