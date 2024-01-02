import React, { useContext, useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import TrackCard from 'components/cards/TrackCard/TrackCard';
import Button from 'components/Button/Button';
import TrackTree from 'components/TrackTree/TrackTree';
import { StorageContext } from 'contexts/StorageContext';

const ResultPage = () => {
  const router = useRouter();
  const [isTreeView, setIsTreeView] = useState(false);
  const { selectedTracks, trackTree, triggerRestart } = useContext(StorageContext);

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.topButtons}>
        <Button disabled={!isTreeView} text={'Tracks'} onClick={() => setIsTreeView(false)} />
        <Button disabled={isTreeView} text={'Tree'} onClick={() => setIsTreeView(true)} />
      </div>
      {isTreeView && trackTree && selectedTracks ? <TreeView /> : <TrackView />}
      <div className={styles.bottomButtons}>
        <Button text={'Restart'} onClick={() => { triggerRestart(); router.push('/'); }} />  
      </div>
    </div>
  );
};

const TreeView = () => {
  const { trackTree } = useContext(StorageContext);

  return (
    <div className={styles.tree}>
      <TrackTree trackTree={trackTree} />
    </div>
  );
};

const TrackView = () => {
  const [selectedTracksForRecommendations, setSelectedTracksForRecommendations] = useState([]);
  const { selectedTracks } = useContext(StorageContext);

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
        <div key={key}>
          <TrackCard track={track} onSelect={(e) => handleTrackSelect(e, track)}/>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;