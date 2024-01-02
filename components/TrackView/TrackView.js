import React from 'react';
import TrackCard from './TrackCard/TrackCard';
import styles from './TrackView.module.scss';

const TrackView = ({tracks, handleTrackSelect}) => {

  return (
    <div className={styles.searchTracks}>
      {(tracks || []).map((track, key) => {
        return (
          <TrackCard key={key} track={track} onSelect={(e) => handleTrackSelect(e, track)} />
        );
      })}
    </div>
  );
};

export default TrackView;