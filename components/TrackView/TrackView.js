import React from 'react';
import TrackCard from './TrackCard/TrackCard';
import styles from './TrackView.module.scss';

const TrackView = ({ tracks, handleTrackSelect, handlePaginate, pageNumber }) => {

  return (
    <div className={styles.trackView}>
      {pageNumber !== null &&
        <div className={styles.topRow}>
          <div
            className={styles.pagination}
            onClick={() => handlePaginate(pageNumber + 1)}>
            More
          </div>
          {pageNumber > 0 && <div
            className={styles.pagination}
            onClick={() => handlePaginate(pageNumber - 1)}>
            Previous
          </div>
          }
        </div>}
      <div className={styles.searchTracks}>
        {(tracks || []).map((track, key) => {
          return (
            <TrackCard key={key} track={track} onSelect={(e) => handleTrackSelect(e, track)} />
          );
        })}
      </div>
    </div>
  );
};

export default TrackView;