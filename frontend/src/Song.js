export const Song = ({ song, handleCheck }) => {
    return (
        <div className="track">
            <div className="track-info">
                <span>{song.artistName}</span>
                <span>{song.name}</span>
                <span>Album Name</span>
            </div>
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
    );
};
