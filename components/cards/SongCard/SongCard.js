import styles from './SongCard.module.scss';
import Card from 'components/cards/Card/Card';

const SongCard = ({ song, isSelected }) => {
  return (
    <Card
      className={styles.songCard}
    >
      <input type={'checkbox'} checked={isSelected} readOnly/>
      <div className={styles.songData}>
        <div>{song.name}</div>
        <div>{song.artists.map(artist => artist.name).join(', ')}</div>
      </div>
    </Card>
  );
}

export default SongCard;