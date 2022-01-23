import {useState} from "react"
import './App.css';
import axios from "axios";
import {useGetRecommendedSongs, useSelectSong} from "./hooks"

function App() {
    const [songs, setSongs] = useState([])
    const selectSong = useSelectSong()
    const getRecommendedSongs = useGetRecommendedSongs()

    async function handleClick(){
        console.log("selecting song...")
        const testS = await selectSong("Hey Jude", "Beatles");
        console.log("selected song:")
        console.dir(testS)
        console.log("getting rec songs...")
        const recSongs = await getRecommendedSongs([testS])
        console.log("got rec songs:")
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
