import styles from './TrackCard.module.scss';
import React, { useState } from 'react';

import Image from 'next/image';
import classNames from 'classnames';

const TrackCard = ({ track, isSelected }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const trackImage = track?.album?.images[0];

  const handleLoadingComplete = () => {
    console.info('Image loaded');
    setIsImageLoading(false);
  };

  const handleLoadingError = () => {
    console.error('Error loading image');
    setIsImageLoading(false);
  };

  return (
    <div
      className={classNames(styles.trackCard, isSelected ? styles.selected : styles.unSelected)}
    >
      <Image
        src={trackImage.url}
        alt={`Cover art for ${track.name}`}
        onLoad={handleLoadingComplete}
        onError={handleLoadingError}
        width={64}
        height={64}
        className={isImageLoading ? styles.isLoading : styles.albumCover}
      />
      <div className={styles.trackData}>
        <div className={styles.title}>{track.name}</div>
        <div className={styles.author}>{track.artists.map(artist => artist.name).join(', ')}</div>
      </div>
    </div>
  );
};

export default TrackCard;