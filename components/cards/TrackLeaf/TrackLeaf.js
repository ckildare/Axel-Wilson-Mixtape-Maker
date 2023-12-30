import styles from './TrackLeaf.module.scss';
// import classNames from 'classnames';
import React from 'react';

const TrackLeaf = ({track}) => {
  console.info('TrackTree leaf track: ', track.id);
  return (
    <div className={styles.treeWrapper}>
    </div>
  );
};

export default TrackLeaf;