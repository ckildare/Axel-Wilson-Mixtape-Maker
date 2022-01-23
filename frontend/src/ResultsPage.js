export const ResultsPage = () => {
    return (
        <div className="row">
            <div className="col-8 col-s-8">
                <div className="track">
                    <div className="track-info">
                        <span>Artist Name</span>
                        <span>Track Name</span>
                        <span>Album Name</span>
                    </div>
                    <form>
                        <input
                            type="checkbox"
                            id="like"
                            name="like"
                            value="like"
                        />
                    </form>
                </div>
                <a href="index.html">
                    <div className="button3">
                        Return To Home
                    </div>
                </a>
            </div>

            <div className="col-2 col-s-2">
                <div className="button center">
                    <a href="tutorial.html">How To Use</a>
                </div>
            </div>

            <div className="col-2 col-s-2">
                <img src="img/axel.jpg" alt="Mugshot of Alex Wilson" />
                <a href="https://open.spotify.com/">
                    <img src="img/spotify-logo.png" alt="Spotify Logo" />
                </a>
            </div>
        </div>
    );
};
