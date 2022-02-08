import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelectSong } from "./hooks";
export const FirstPage = ({setSelectedSong}) => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState(null)
    const selectSong = useSelectSong();

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");

    const handleSearch = async (e) => {
        setErrorMsg(null)
        e.preventDefault()

        if (!title || !artist)
            setErrorMsg("Please provide a title and artist.")
        const song = await selectSong(title, artist)
        console.dir(song)
        setSelectedSong(song)
        navigate("/songs")
    }

    return (
        <div className="row">
            <div className="col-8 col-s-8">
                <h1>Welcome to Axel Wilson's Mixtape Maker!</h1>\
                <div class="error-box">
                    <div class="error-message">
                        {errorMsg && <p className="error-message">{errorMsg}</p>}
                    </div>
                </div>
                <form>
                    <label htmlFor="trackTitle">Song Title: </label>
                    <br />
                    <input
                        type="text"
                        id="trackTitle"
                        name="trackTitle"
                        placeholder="Search for Song Title..."
                        onChange={e => setTitle(e.target.value)}
                    />
                    <br />
                </form>
                <form>
                    <label htmlFor="artist">Artist: </label>
                    <br />
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        placeholder="Search for Artist..."
                        onChange={e => setArtist(e.target.value)}
                    />
                </form>
                <a href="songviewer.html">
                    <div className="button2" onClick={handleSearch}>Search</div>
                </a>
            </div>

            <div className="col-2 col-s-2">
                <Link to="/tutorial">
                    <div className="button center">How To Use</div>
                </Link>
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
