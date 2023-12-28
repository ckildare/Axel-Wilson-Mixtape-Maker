import styles from './SongCard.module.scss';
import Card from 'components/cards/Card/Card';

const SongCard = ({ song, index, handleSongClick }) => {
  console.log(`song ${index}: ${JSON.stringify(song, null, 2)}`);

  return (
    <Card
      className={styles.songCard}
      onClick={() => handleSongClick(song)}
    >
      <input type={'checkbox'} />
      <div className={styles.songData}>
        <div>{song.name}</div>
        <div>{song.artists.map(artist => artist.name).join(', ')}</div>
      </div>
    </Card>
  );
}

export default SongCard;