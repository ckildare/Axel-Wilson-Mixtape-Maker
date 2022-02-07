export const Song = ({ song, handleCheck }) => {
    return (
        <div className="track">
            <div className="track-info">
                <span>{song.artistName}</span>
                <a className="b" href={song.uri}>{song.name}</a>
            </div>
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
