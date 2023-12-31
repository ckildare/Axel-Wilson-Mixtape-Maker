import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import TrackTree from 'components/TrackTree/TrackTree';
import { updateSessionStorageTrackQuery } from 'utils/tokenUtils';

const ResultPage = () => {
  const router = useRouter();
  const [isTreeView, setIsTreeView] = useState(false);
  const { selectedTracks, trackTree, useFinalTracks } = useContext(SpotifyAPIContext);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTracks?.length > 0) return;

      const query = await updateSessionStorageTrackQuery(selectedTracks);
      if (await useFinalTracks(query) == null) router.push(`/recommendations`);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.topButtons}>
        <Button disabled={!isTreeView} text={'Tracks'} onClick={() => setIsTreeView(false)} />
        <Button disabled={isTreeView} text={'Tree'} onClick={() => setIsTreeView(true)} />
      </div>
      {isTreeView && trackTree && selectedTracks ? <TreeView /> : <TrackView />}
      <div className={styles.bottomButtons}>
        <Button text={'Restart'} onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

const TreeView = () => {
  const { trackTree } = useContext(SpotifyAPIContext);

  return (
    <div className={styles.tree}>
      <TrackTree trackTree={trackTree} />
    </div>
  );
};

const TrackView = () => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const { selectedTracks } = useContext(SpotifyAPIContext);

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