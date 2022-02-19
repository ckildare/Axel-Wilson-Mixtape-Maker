import React from "react";
import { Song } from "./Song";
import { Link } from "react-router-dom";

export const ResultsPage = ({ songs }) => {
    return (
        <div className="row">
            <div className="col-8 col-s-8">
                {songs.map((song, index) => (
                    <Song song={song} />
                ))}
                <Link to="/playlist">
                    <div className="button3">Create Spotify Playlist</div>
                </Link>
                <Link to="/">
                    <div className="button3">Return To Home</div>
                </Link>
            </div>

            <div className="col-2 col-s-2">
                <div className="button center">
                    <Link to="/tutorial">How To Use</Link>
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
