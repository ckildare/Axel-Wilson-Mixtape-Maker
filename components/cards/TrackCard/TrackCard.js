import styles from './TrackCard.module.scss';
import React from 'react';

import Image from 'next/image';
import classNames from 'classnames';

const TrackCard = ({ track, isSelected }) => {
  const trackImage = track?.album?.images[0];
  return (
    <div
      className={classNames(styles.trackCard, isSelected ? styles.selected : styles.unSelected)}
    >
      <Image
        src={trackImage.url}
        alt={`Cover art for ${track.name}`}
        width={64}
        height={64}
        className={styles.albumCover}
      />
      <div className={styles.trackData}>
        <div className={styles.title}>{track.name}</div>
        <div className={styles.author}>{track.artists.map(artist => artist.name).join(', ')}</div>
      </div>
    </div>
  );
};

export default TrackCard;