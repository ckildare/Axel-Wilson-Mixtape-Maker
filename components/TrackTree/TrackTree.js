import TrackLeaf from 'components/TrackTree/TrackLeaf/TrackLeaf';
import styles from './TrackTree.module.scss';
import React from 'react';
import Line from 'components/gradient/Line/Line';

const TrackTree = ({ trackTree }) => {
  const bottomConnector = (track, isMiddle) =>
    track.isSelected ?
      <div style={{ width: `${isMiddle ? '4.75rem' : '100%'}` }} className={styles.bottomConnectorWrapper}>
        <Line className={styles.bottomConnector} />
        <Line className={styles.bottomConnectorRight} />
      </div>
      : <div className={styles.bottomConnectorWrapper} />;

  const rightConnector = (isMiddle) =>
    isMiddle &&
    <div className={styles.rightConnectorWrapper}>
      <Line className={styles.rightConnector} />
      <Line className={styles.rightConnectorBottom} />
    </div>;

  return (
    <div className={styles.treeWrapper}>
      {Object.entries(trackTree)
        .map(([rowNumber, row]) => {
          let inputsAndOutputIXs = [];
          trackTree[rowNumber - 1]?.forEach((track, key) => track.isSelected && inputsAndOutputIXs.push(key));
          row?.forEach((track, key) => track.isSelected && inputsAndOutputIXs.push(key));
          console.log(`inputsAndOutputIXs for row ${rowNumber}... ${inputsAndOutputIXs} `);
          const min = Math.min(...inputsAndOutputIXs);
          const max = Math.max(...inputsAndOutputIXs);
          console.log(`min:max for row ${rowNumber}... ${min}:${max} `);

          return (
            <div key={rowNumber} className={styles.row}>
              {(row || []).map((track, key) => {
                const isMiddle = key + 1 != row.length;

                return (
                  <div style={{ width: `${key + 1 != row.length ? '100%' : '4.75rem'}` }} key={key} className={styles.leafRow}>
                    <div key={key} className={styles.leafColumn}>
                      <TrackLeaf track={track} />
                      {bottomConnector(track, isMiddle)}
                    </div>
                    {rightConnector(isMiddle && (key + 1 > min && key < max))}
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