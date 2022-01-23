import {useState} from "react"
import axios from "axios";
import {useGetRecommendedSongs, useSelectSong} from "./hooks"
import './App.css';

function App() {
    const [songs, setSongs] = useState([])
    const selectSong = useSelectSong()
    const getRecommendedSongs = useGetRecommendedSongs()

    async function handleClick(){
        const testS = await selectSong("Hey Jude", "Beatles");
        const recSongs = await getRecommendedSongs([testS])
        setSongs(recSongs)
    }
  return (
    <div class="row">
            <div class="col-8 col-s-8">
                <h1>
                    Search the Song Here!
                </h1>
                <form>
                    <label for="trackTitle">Song Title: </label><br/>
                    <input type="text" id="trackTitle" name="trackTitle" placeholder="Search for Song Title..." /><br/>
                </form>
                <form>
                    <label for="artist">Artist: </label><br/>
                    <input type="text" id="artist" name="artist" placeholder="Search for Artist..." />
                </form>
                <a href="songviewer.html">
                    <div class="button2">
                        Search
                    </div>
                    </a>
            </div>

            <div class="col-2 col-s-2">
                <a href="tutorial.html">
                <div class="button center">
                    How To Use
                </div>
                </a>
            </div>

            <div class="col-2 col-s-2">
                <img src="img/axel.jpg" alt="Mugshot of Alex Wilson" />
                <a href="https://open.spotify.com/">
                    <img src="img/spotify-logo.png" alt="Spotify Logo" />
                </a>
            </div>
        </div>
  );
}

export default App;
