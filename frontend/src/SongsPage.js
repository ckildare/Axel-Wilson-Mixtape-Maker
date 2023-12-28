import React, { useEffect, useState } from "react";
import { useGetRecommendedSongs } from "./hooks";
import { Song } from "./Song";
import { Link } from "react-router-dom";

export const SongsPage = ({ songs, setSongs, selectedSong }) => {
    const [currSongPage, setCurrSongPage] = useState(songs);
    const [loading, setLoading] = useState(false);
    const [checkedSongs, setCheckedSongs] = useState([]);

    const getRecommendedSongs = useGetRecommendedSongs();

    // Load initial recs using selected song
    useEffect(() => {
        setLoading(true);
        setSongs([]);
        getRecommendedSongs([selectedSong]).then((rec) => {
            setCurrSongPage(rec);
            setLoading(false);
        });
    }, []);

    const handleSelectSong = (e, song) => {
        const checked = e.target.checked;
        if (checked) {
            song.checked = true;
            const newSongs = [...checkedSongs, song];
            setCheckedSongs(newSongs);
        } else {
            // Remove song
            const index = checkedSongs.indexOf(song);
            if (index >= 0) {
                song.checked = false;
                const newItems = [...checkedSongs];
                newItems.splice(index, 1);
                setCheckedSongs(newItems);
            }
        }
    };

    const loadNextRecs = async () => {
        setSongs([...songs, ...checkedSongs]);
        console.dir(checkedSongs);
        getRecommendedSongs(checkedSongs).then((loaded) => {
            setCurrSongPage([...loaded]);
            setCheckedSongs([]);
        });
    };

    return (
        <div className="row">
            {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
            <div className="col-8 col-s-8">
                <div class="results">
                    {currSongPage.map((song, index) => (
                        <Song
                            key={index}
                            song={song}
                            handleCheck={(e) => handleSelectSong(e, song)}
                        />
                    ))}
                </div>
                <div class="button3">
                    <div onClick={loadNextRecs}>Load More Songs</div>
                </div>
                <Link to="/results">
                    <div class="button3">Finish Process</div>
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
