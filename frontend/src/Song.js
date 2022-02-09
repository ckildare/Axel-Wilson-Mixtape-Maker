export const Song = ({ song, handleCheck }) => {
    return (
        <div className="track">
            <div class="cover-art">
                <img src={song.coverArt} alt="Cover Art"></img>
            </div>
            <div className="track-text">
                <span>{song.name}</span>
                <span>{song.artistName}</span>
            </div>
            <div className="album-text">
                <span>{song.albumName}</span>
            </div>
            <div class="song-image"><img src="img/small-spotify.png" alt="Link to Song on Spotify" href={song.spotifyLink}></img></div>
            <div class="like-button">
                <form>
                    <input
                        type="checkbox"
                        id="like"
                        name="like"
                        value="like"
                        checked={song.checked ?? false}
                        onChange={handleCheck}
                    />
                </form>
            </div>
        </div>
    );
};
