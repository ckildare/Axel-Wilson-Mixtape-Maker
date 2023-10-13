import Line from '../../gradient/Line/Line.js';

import styles from './header.module.scss';

export default function Header() {

  return (
    <div className={styles.headerBody}>
      <p className={styles.headerTitle}>Axel Wilson's Mixtape Maker</p>
      <Line size={2} />
    </div>
  )
};