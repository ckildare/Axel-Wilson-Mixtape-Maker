import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './TrackCard.module.scss';

const TrackCard = ({
  trackID,
  onSelect,
  parentIsLoading
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = () => {
    setIsSelected(!isSelected);
    onSelect(!isSelected);
  };

  useEffect(() => { setIsLoading(true); }, [trackID]);
  useEffect(() => { setIsSelected(false); }, [parentIsLoading, isLoading]);

  return (
    <div
      className={classNames(styles.trackCard, isSelected ? styles.selected : styles.unSelected)}
      onClick={() => handleSelectChange()}
    >
      <div className={(isLoading || parentIsLoading) ? styles.loader : styles.trackContent}>
        <input
          type="checkbox"
          checked={isSelected}
          className={styles.checkbox}
          readOnly
        />
        <iframe
          src={`https://open.spotify.com/embed/track/${trackID}?utm_source=generator&theme=0`}
          onLoad={() => setIsLoading(false)}
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};

export default TrackCard;