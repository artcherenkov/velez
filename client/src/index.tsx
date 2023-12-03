import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { App } from "./components/App";
import { YMapsProvider } from "./contexts/YMapsContext";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { loadSources } from "./ymaps";

window.ymaps3 = undefined;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

loadSources();

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <YMapsProvider>
        <App />
      </YMapsProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

reportWebVitals();
