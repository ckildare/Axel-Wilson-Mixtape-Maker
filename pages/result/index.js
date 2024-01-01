import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { SpotifyAPIContext } from 'spotifyContext';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import TrackTree from 'components/TrackTree/TrackTree';
import { updateSessionTrackQuery } from 'utils/sessionStorageUtils';

const ResultPage = () => {
  const router = useRouter();
  const [isTreeView, setIsTreeView] = useState(false);
  const { selectedTracks, trackTree, useFinalTracks, restart } = useContext(SpotifyAPIContext);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTracks?.length > 0) return;

      const query = await updateSessionTrackQuery(selectedTracks);
      if (await useFinalTracks(query) == null) router.push('/recommendations');
    };
    fetchData();
  }, []);

  const handleRestart = () => {
    restart();
    router.push('/');
  };

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.topButtons}>
        <Button disabled={!isTreeView} text={'Tracks'} onClick={() => setIsTreeView(false)} />
        <Button disabled={isTreeView} text={'Tree'} onClick={() => setIsTreeView(true)} />
      </div>
      {isTreeView && trackTree && selectedTracks ? <TreeView /> : <TrackView />}
      <div className={styles.bottomButtons}>
        <Button text={'Restart'} onClick={() => handleRestart()} />
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
  const [selectedTracksForRecommendations, setSelectedTracksForRecommendations] = useState([]);
  const { selectedTracks } = useContext(SpotifyAPIContext);

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
    setSelectedTracksForRecommendations(newSelectedTracks);
  };

  return (
    <div className={styles.tracks}>
      {selectedTracks.map((track, key) => (
        <div key={key} onClick={() => handleTrackSelect(e, track)}>
          <TrackCard track={track} onSelect={(e) => handleTrackSelect(e, track)}/>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;