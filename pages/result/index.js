import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import TrackTree from 'components/TrackTree/TrackTree';

const ResultPage = () => {
  const router = useRouter();
  const [isTreeView, setIsTreeView] = useState(false);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.topButtons}>
        <Button disabled={!isTreeView} text={'Tracks'} onClick={() => setIsTreeView(false)} />
        <Button disabled={isTreeView} text={'Tree'} onClick={() => setIsTreeView(true)} />
      </div>
      {isTreeView ? <TreeView /> : <TrackView/> }
      <div className={styles.bottomButtons}>
        <Button text={'Restart'} onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

const TreeView = () => {
  const router = useRouter();
  const { trackTree } = useContext(SpotifyAPIContext);

  useEffect(() => { if (!trackTree) router.push('/trackSelection'); }, []);

  return (
    <div className={styles.tree}>
      <TrackTree trackTree={trackTree} />
    </div>
  );
};

const TrackView = () => {
  const router = useRouter();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const { selectedTracks } = useContext(SpotifyAPIContext);

  useEffect(() => { if (!selectedTracks || selectedTracks?.length == 0) router.push('/trackSelection'); }, []);

  return (
    <div className={styles.tracks}>
      {selectedTracks.map((track, key) => (
        <div key={key} onClick={() => setSelectedTrackIndex(key === selectedTrackIndex ? null : key)}>
          <TrackCard track={track} isSelected={selectedTrackIndex === key} />
        </div>
      ))}
    </div>
  );
};

export default ResultPage;