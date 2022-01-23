import { useEffect, useState } from "react";
import { useGetRecommendedSongs } from "./hooks";

const Song = ({song}) => {
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
                        />
                    </form>
                </div>
    )
}

export const SongsPage = ({songs, setSongs}) => {
    const [loading, setLoading] = useState(false)
    const getRecommendedSongs = useGetRecommendedSongs()
    const loadNextRecs = async () => {
        
    }
    // Load initial recs
    useEffect(() => {
        setLoading(true)
        const songsCopy = [...songs]
        setSongs([])
        getRecommendedSongs(songsCopy).then(rec => {
            setSongs(rec)
            setLoading(false)
        })
    }, [])
    return (
        <div className="row">
            {loading && <div style={{textAlign: "center"}}>Loading...</div>}
            <div className="col-8 col-s-8">
                {songs.map((song, index) => <Song key={index} song={song}/>)}
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
