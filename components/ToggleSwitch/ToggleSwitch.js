import React, { useState } from 'react';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = ({
  offText,
  onText,
  isOn, 
  handleToggle, 
  onColor
}) => {
  const [isOnState, setIsOnState] = useState(isOn);

  const handleToggleState = () => {
    setIsOnState(!isOnState);
    handleToggle();
  }

  return (
    <>
      <input
        checked={isOnState}
        onChange={() => handleToggleState()}
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