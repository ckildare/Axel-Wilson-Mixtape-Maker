import styles from './TrackCard.module.scss';
import Card from 'components/cards/Card/Card';
import React from 'react';

const TrackCard = ({ track, isSelected }) => {
  return (
    <Card
      className={styles.trackCard}
    >
      <input type={'checkbox'} checked={isSelected} readOnly/>
      <div className={styles.trackData}>
        <div>{track.name}</div>
        <div>{track.artists.map(artist => artist.name).join(', ')}</div>
      </div>
    </Card>
  );
};

export default TrackCard;