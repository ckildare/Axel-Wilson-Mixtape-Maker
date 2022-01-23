import { useState } from "react";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { FirstPage } from "./FirstPage";
import { HowToPage } from "./HowToPage";
import "./App.css";
import { SongsPage } from "./SongsPage";
import { ResultsPage } from "./ResultsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<FirstPage />} />
                <Route path="/tutorial" element={<HowToPage />} />
                <Route path="/songs" element={<SongsPage />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
