import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import { YMapsProvider } from "../../contexts/YMapsContext";
import { useChangePageHeightOnWindowResize } from "../../utils/useChangePageHeightOnWindowResize";
import { PageContainer } from "../PageContainer";

export function App() {
  useChangePageHeightOnWindowResize();

  return (
    <React.StrictMode>
      <YMapsProvider>
        <CssBaseline />
        <PageContainer />
      </YMapsProvider>
    </React.StrictMode>
  );
}
