import React from "react";
import { useState } from "react";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { FirstPage } from "./FirstPage";
import { HowToPage } from "./HowToPage";
import "./App.css";
import { SongsPage } from "./SongsPage";
import { ResultsPage } from "./ResultsPage";
import CreatePlaylist from "./CreatePlaylist";

function App() {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={<FirstPage setSelectedSong={setSelectedSong} />}
                />
                <Route path="/tutorial" element={<HowToPage />} />
                <Route
                    path="/songs"
                    element={
                        <SongsPage
                            songs={songs}
                            setSongs={setSongs}
                            selectedSong={selectedSong}
                        />
                    }
                />
                <Route
                    path="/results"
                    element={<ResultsPage songs={songs} />}
                />
                <Route
                    path="/playlist"
                    element={<CreatePlaylist songs={songs} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
