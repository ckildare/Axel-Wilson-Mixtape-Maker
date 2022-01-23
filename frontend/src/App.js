import { useState } from "react";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { FirstPage } from "./FirstPage";
import { HowToPage } from "./HowToPage";
import "./App.css";
import { SongsPage } from "./SongsPage";

function App() {
    const [songs, setSongs] = useState([])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<FirstPage setSongs={setSongs}/>} />
                <Route path="/tutorial" element={<HowToPage />} />
                <Route path="/songs" element={<SongsPage songs={songs} setSongs={setSongs}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
