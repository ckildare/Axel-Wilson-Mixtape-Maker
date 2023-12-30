import TrackLeaf from 'components/cards/TrackLeaf/TrackLeaf';
import styles from './TrackTree.module.scss';
// import classNames from 'classnames';
import React from 'react';
import Line from 'components/gradient/Line/Line';

const TrackTree = ({ trackTree }) => {
  console.info('TrackTree: ', trackTree);
  return (
    <div className={styles.treeWrapper}>
      {Object.entries(trackTree)
        .map(([rowNumber, row]) => {
          return (
            <div key={rowNumber} className={styles.row}>
              {(row.tracks || []).map((track, key) => {
                const isMiddle = key + 1 != row.tracks.length;
                return (
                  <div style={{ width: `${isMiddle ? '100%' : '4.75rem'}` }} key={key} className={styles.leafRow}>
                    <div key={key} className={styles.leafColumn}>
                      <TrackLeaf track={track} />
                      {track.isSelected ?
                        <div style={{ width: `${isMiddle ? '4.75rem' : '100%'}` }} className={styles.bottomConnectorWrapper}>
                          <Line className={styles.bottomConnector} />
                          <Line className={styles.bottomConnectorRight} />
                        </div>
                        : <div className={styles.bottomConnectorWrapper} />
                      }
                    </div>
                    {isMiddle &&
                      <div className={styles.rightConnectorWrapper}>
                        <Line className={styles.rightConnector} />
                        <Line className={styles.rightConnectorBottom} />
                      </div>
                    }
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default TrackTree;