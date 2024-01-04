import React from 'react';
import TrackCard from './TrackCard/TrackCard';
import styles from './TrackView.module.scss';

const TrackView = ({ 
  tracks,
  handleTrackSelect,
  pageNumber,
  isLoading,
  handlePaginate = () => {}
}) => {
  return (
    <div className={styles.trackView}>
      {pageNumber != null &&
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
            <TrackCard key={key} track={track} parentIsLoading={isLoading} onSelect={(e) => handleTrackSelect(e, track)} />
          );
        })}
      </div>
    </div>
  );
};

export default TrackView;