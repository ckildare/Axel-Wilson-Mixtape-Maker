import React, { useState, useEffect } from 'react';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({
  offText,
  onText,
  isOn = false, 
  handleToggle, 
  onColor
}) => {
  const [isOnState, setIsOnState] = useState(isOn);
  useEffect(() => handleToggle(isOnState), [isOnState]);

  return (
    <>
      <input
        checked={isOnState}
        onChange={() => setIsOnState(!isOnState)}
        className={styles.checkbox}
        id={'toggleSwitch'}
        type="checkbox"
      />
      <label
        style={{ background: isOnState && onColor }}
        className={styles.label}
        htmlFor={'toggleSwitch'}
      >
        {(offText && onText) && <div className={styles.toggleText}>{isOnState ? onText : offText}</div>}
        <span className={styles.button} />
      </label>
    </>
  );
};

export default ToggleSwitch;