import Card from '../Card/Card';
import styles from './TrackLeaf.module.scss';
// import classNames from 'classnames';
import React from 'react';
import Image from 'next/image';

const TrackLeaf = ({ track }) => {
  console.info('TrackTree track: ', track);

  const navigateToTrack = () => {
    console.info('navigateToTrack: ', track.href);
    window.open(track.href, '_blank');
  };

  return (
    <div onClick={() => navigateToTrack()}>
      <Card className={styles.card}>
        <Image className={styles.art} width={track.imgDim} height={track.imgDim} src={track.img} alt={`Album cover for ${track.name}`} />
      </Card>
    </div>
  );
};

export default TrackLeaf;