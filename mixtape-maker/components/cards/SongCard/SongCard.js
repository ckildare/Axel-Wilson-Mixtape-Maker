const SongCard = ({ song, index, handleSongClick }) => {
  const { name, artists, album, duration_ms } = song;
  const artistNames = artists.map(artist => artist.name).join(', ');
  const albumName = album.name;
  const duration = convertMsToMinutesAndSeconds(duration_ms);

  return (
    <div
      className="song-card"
      onClick={() => handleSongClick(song)}
    >
      <div className="song-card__index">{index + 1}</div>
      <div className="song-card__info">
        <div className="song-card__name">{name}</div>
        <div className="song-card__artist">{artistNames}</div>
        <div className="song-card__album">{albumName}</div>
      </div>
      <div className="song-card__duration">{duration}</div>
    </div>
  );
}

export default SongCard;