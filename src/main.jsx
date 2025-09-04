/* import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const routes = createRoutesFromElements(
  <>
    <Route index loader={step1Loader} Component={StepOne} />
    <Route path="step-2" loader={step2Loader} Component={StepTwo} />
    <Route path="step-3" loader={step3Loader} Component={StepThree} />
  </>
); */

/* const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
} */

import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

/* import Character from "./components/Character";
import Data from "./components/Data";
import Final from "./components/Final";
import Game from "./components/Game";
import Lib from "./components/Lib";
import Status from "./components/Status";
import Util from "./components/Util"; */

import { Data, Final, Game, Lib, Status, Util } from "./loaders"; // optional

const routes = createRoutesFromElements(
  <>
    <Character />
    <Data />
    <Final />
    <Game />
    <Lib />
    <Status />
    <Util />
  </>
);
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
