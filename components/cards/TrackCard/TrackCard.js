import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './TrackCard.module.scss';

const TrackCard = ({ track, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectChange = () => {
    setIsSelected(!isSelected);
    onSelect(!isSelected);
  };

  return (
    <div
      className={classNames(styles.trackCard, isSelected ? styles.selected : styles.unSelected)}
      onClick={() => handleSelectChange()}
    >
      <input
        type="checkbox"
        checked={isSelected}
        className={styles.checkbox}
        readOnly
      />
      <iframe
        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default TrackCard;