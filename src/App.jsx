import { useState } from "react";
import "./App.css";
import Character from "./components/Character";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Final from "./components/Final";
import Status from "./components/Status";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/character" element={<Character />} />
        <Route path="/game" element={<Game />} />
        <Route path="/final" element={<Final />} />
        <Route path="/status" element={<Status />} />
        {/* Weitere Routen */}
        {/*<>
          <Character />
        </>*/}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
