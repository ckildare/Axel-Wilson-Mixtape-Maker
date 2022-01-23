
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";
import { useGetRecommendedSongs } from "./hooks";

const Song = ({song, handleCheck}) => {
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
    )
}

export const SongsPage = ({songs, setSongs}) => {
    const [currSongPage, setCurrSongPage] = useState(songs)
    console.dir(currSongPage)
  const [loading, setLoading] = useState(false)
    const [checkedSongs, setCheckedSongs] = useState([])

    const getRecommendedSongs = useGetRecommendedSongs()
    
    // Load initial recs using only song in songs
   useEffect(() => {
        setLoading(true)
        const songsCopy = [...songs]
        setSongs([])
        getRecommendedSongs(songsCopy).then(rec => {
            setCurrSongPage(rec)
            setLoading(false)
        })
    }, [])

    
    const handleSelectSong = (e, song) => {
        const checked = e.target.checked;
        if (checked) {
            song.checked = true
            const newSongs = [...checkedSongs, song]
            setCheckedSongs(newSongs)
        } else {
            // Remove song
            const index = checkedSongs.indexOf(song);
            if (index >= 0){
                const newItems = [...checkedSongs]
                newItems.splice(index, 1)
                setCheckedSongs(newItems)
            }
        }
    }

    const loadNextRecs = async () => {
        getRecommendedSongs(checkedSongs).then(loaded => {
            setSongs([...songs, ...loaded])
            setCurrSongPage([...loaded])
        })
    }
    
    return (
        <div className="row">
            {loading && <div style={{textAlign: "center"}}>Loading...</div>}
            <div className="col-8 col-s-8">
                {currSongPage.map((song, index) => <Song key={index} song={song} handleCheck={e => handleSelectSong(e, song)}/>)}
            </div>

            <div className="col-2 col-s-2">
                <div className="button center">
                    <a href="tutorial.html">How To Use</a>
                </div>
            </div>

            <div onClick={loadNextRecs}>load next lol</div>

            <div className="col-2 col-s-2">
                <img src="img/axel.jpg" alt="Mugshot of Alex Wilson" />
                <a href="https://open.spotify.com/">
                    <img src="img/spotify-logo.png" alt="Spotify Logo" />
                </a>
            </div>
            
        </div>
    );
};
