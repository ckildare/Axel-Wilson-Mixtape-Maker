import Line from '../../gradient/Line/Line.js';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.headerBody}>
      <p className={styles.headerTitle}>Axel Wilson's Mixtape Maker</p>
      <Line size={2} />
    </div>
  )
};

export default Header;