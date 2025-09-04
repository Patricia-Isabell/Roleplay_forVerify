import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Character from "./components/Character";
import Game from "./components/Game";
import Final from "./components/Final";
import Status from "./components/Status";
import Util from "./components/Util";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" loader={Layout} Component={Layout} />
        <Route index loader={Character} Component={Character} />
        <Route path="step-2" loader={Data} Component={Data} />
        <Route path="step-3" loader={Final} Component={Final} />
        <Route path="step-2" loader={Game} Component={Game} />
        <Route path="step-3" loader={Lib} Component={Lib} />
        <Route path="step-2" loader={Status} Component={Status} />
        <Route path="step-3" loader={Util} Component={Util} />

        <Route path="/" element={<Game />} />
        <Route path="/character" element={<Character />} />
        <Route path="/game" element={<Game />} />
        <Route path="/final" element={<Final />} />
        <Route path="/status" element={<Status />} />
        <Route path="/util" element={<Util />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
