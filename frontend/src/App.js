import {useState} from "react"
import axios from "axios";
import {useGetRecommendedSongs, useSelectSong} from "./hooks"
import { FirstPage } from "./FirstPage";
import './App.css';
import { HowToPage } from "./HowToPage";

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
    <HowToPage/>
  );
}

export default App;
