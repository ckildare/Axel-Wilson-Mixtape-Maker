import {Song} from "./Song"

export const ResultsPage = ({songs}) => {
    return (
        <div className="row">
            <div className="col-8 col-s-8">
                {songs.map((song, index) => <Song song={song}/>)}
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
