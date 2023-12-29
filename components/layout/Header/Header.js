import Line from '../../gradient/Line/Line.js';
import styles from './Header.module.scss';
import React from 'react';

const Header = () => {
  return (
    <div className={styles.headerBody}>
      <p className={styles.headerTitle}>Axel Wilson&apos;s Mixtape Maker</p>
      <Line size={2} />
    </div>
  );
};

export default Header;