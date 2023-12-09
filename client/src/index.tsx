import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { loadSources } from "./ymaps";

import "./index.css";

window.ymaps3 = undefined;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

loadSources();

root.render(<App />);

reportWebVitals();
