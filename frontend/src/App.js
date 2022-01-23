import {useState} from "react"
import './App.css';
import axios from "axios";
import {useGetRecommendedSongs, useSelectSong} from "./hooks"

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
    <div className="App">
        {songs.map(song => <div>{song.name}</div>)}
        <button onClick={handleClick}>get hello world</button>
    </div>
  );
}

export default App;
