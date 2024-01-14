import TrackLeaf from 'components/TrackTree/TrackLeaf/TrackLeaf';
import styles from './TrackTree.module.scss';
import React, { useMemo } from 'react';
import Line from 'components/gradient/Line/Line';

const TrackTree = ({ trackTree }) => {
  return (
    <div className={styles.treeWrapper}>
      {Object.entries(trackTree).map(([rowNumber, row]) => {
        return (<Row key={rowNumber} rowNumber={rowNumber} row={row} trackTree={trackTree} />);
      })}
    </div>
  );
};

const Row = ({ rowNumber, row, trackTree }) => {
  const outputs = row?.map((track, key) => track.isSelected ? key : undefined).filter(key => key !== undefined);
  const inputs = () => {
    if (rowNumber == 0) return null;
    if (rowNumber == 1) {
      const inputCount = Array.from(trackTree[rowNumber - 1] || []).filter(track => track.isSelected).length;
      console.log(`inputCount for row ${rowNumber}... ${inputCount} `);
      return {
        1: [2],
        2: [1, 3],
        3: [0, 2, 4],
        4: [0, 1, 3, 4],
        5: [0, 1, 2, 3, 4],
      }[inputCount] || [];
    }
    return Array
      .from(trackTree[rowNumber - 1] || [])
      .map((track, key) => track.isSelected ? key : undefined)
      .filter(key => key != undefined);
  };

  const routes = () => {
    if (rowNumber == 0 || !inputs() || !outputs) return [];
    let outputsLeft = [...outputs];
    let routesList = [];
    let difference = 1;

    while (outputsLeft.length > 0) {
      inputs().forEach(input => {
        outputsLeft.forEach((output, outputIX) => {
          if (input == output) outputsLeft.splice(outputIX, 1);
          if (Math.abs(input - output) == difference) {
            const offset = Math.min(input, output - 1);
            const newRoutes = Array.from(Array.from({ length: input > output ? difference + 1 : difference }, (_, index) => index + offset));
            routesList.push(...newRoutes || []);
            outputsLeft.splice(outputIX, 1);
          }
        });
      });

      difference = difference + 1;
    }

    return routesList;
  };

  const bottomConnector = (track, isMiddle) =>
    track.isSelected ?
      <div style={{ width: `${isMiddle ? '4.75rem' : '100%'}` }} className={styles.bottomConnectorWrapper}>
        <Line className={styles.bottomConnector} />
        <Line className={styles.bottomConnectorRight} />
      </div>
      : <div className={styles.bottomConnectorWrapper} />;

  const rightConnector = (isMiddle, key) =>
    (isMiddle && routes().includes(key)) &&
    <div className={styles.rightConnectorWrapper}>
      <Line className={styles.rightConnector} />
      <Line className={styles.rightConnectorBottom} />
    </div>;

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
            {rightConnector(isMiddle, key)}
          </div>
        );
      })}
    </div>
  );
};

export default TrackTree;