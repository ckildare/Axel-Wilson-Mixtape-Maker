const SongCard = ({ song, index, handleSongClick }) => {
  const { name, artists, album, duration_ms, href, images } = song;

  console.log(`song ${index}: ${JSON.stringify(song, null, 2)}`);

  return (
    <div
      className="song-card"
      onClick={() => handleSongClick(song)}
    >
      hi
    </div>
  );
}

export default SongCard;