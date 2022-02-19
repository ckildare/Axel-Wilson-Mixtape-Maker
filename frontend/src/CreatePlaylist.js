import React, { useState } from "react";
import { Song } from "./Song";
import { Link } from "react-router-dom";

const CreatePlaylist = ({ songs }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreatePlaylist = () => {
        console.log("created playlist...");
    };

    return (
        <div className="row">
            <div className="col-8 col-s-8">
                <h1>Create Spotify Playlist</h1>\
                <form>
                    <label htmlFor="trackTitle">Playlist Title: </label>
                    <br />
                    <input
                        type="text"
                        id="trackTitle"
                        name="trackTitle"
                        placeholder="Playlist title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                </form>
                <form>
                    <label htmlFor="artist">Description: </label>
                    <br />
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </form>
                <div className="button2" onClick={handleCreatePlaylist}>
                    Create
                </div>
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

export default CreatePlaylist;
