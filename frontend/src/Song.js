export const Song = ({ song, handleCheck }) => {
    return (
        <div className="track">
            <div class="cover-art">
            <img src={song.coverArt} alt="Cover art"></img>
            </div>
            <div className="track-text">
                <span>{song.artistName}</span>
                <a className="b" href={song.uri}>{song.name}</a>
            </div>
            <div class="like-button">
                <form>
                    <input
                        type="button"
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
