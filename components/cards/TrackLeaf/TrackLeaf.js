import Card from '../Card/Card';
import styles from './TrackLeaf.module.scss';
// import classNames from 'classnames';
import React, { useState } from 'react';
import Image from 'next/image';

const TrackLeaf = ({ track }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const navigateToTrack = () => {
    console.info('navigateToTrack: ', track.href);
    window.open(track.href, '_blank');
  };

  const handleLoadingComplete = () => {
    setIsImageLoading(false);
  };

  const handleLoadingError = () => {
    console.error('Error loading image');
    setIsImageLoading(false);
  };

  return (
    <div onClick={() => navigateToTrack()}>
      <Card className={styles.card}>
        <Image
          src={track.img}
          alt={`Album cover for ${track.name}`}
          onLoad={handleLoadingComplete}
          onError={handleLoadingError}
          width={track.imgDim}
          height={track.imgDim}
          className={isImageLoading ? styles.isLoading : styles.albumCover}
        />
      </Card>
    </div>
  );
};

export default TrackLeaf;