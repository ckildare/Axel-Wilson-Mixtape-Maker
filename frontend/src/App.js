import {useState} from "react"
import './App.css';
import axios from "axios";
import {useSelectSong} from "./hooks"

function App() {
    const [song, setSong] = useState(null)
    const selectSong = useSelectSong()

    async function handleClick(){
        console.dir(selectSong)
        const testS = await selectSong("Hey Jude", "Beatles")
        setSong(testS)
    }
  return (
    <div className="App">
        song:
        {song ? song.name : "null"} 
        <button onClick={handleClick}>get hello world</button>
    </div>
  );
}

export default App;
