import * as React from "react";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

import { YMapsProvider } from "../../contexts/YMapsContext";
import { store } from "../../redux";
import { useChangePageHeightOnWindowResize } from "../../utils/useChangePageHeightOnWindowResize";
import { PageContainer } from "../PageContainer";

export function App() {
  useChangePageHeightOnWindowResize();

  return (
    <React.StrictMode>
      <CssBaseline />
      <Provider store={store}>
        <YMapsProvider>
          <PageContainer />
        </YMapsProvider>
      </Provider>
    </React.StrictMode>
  );
}
