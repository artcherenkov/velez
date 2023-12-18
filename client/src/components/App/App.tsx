import * as React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { YMapsProvider } from "../../contexts/YMapsContext";
import { CreateTripPageContainer } from "../../pages/CreateTripPageContainer";
import { MainPageContainer } from "../../pages/MainPageContainer";
import { TripsPageContainer } from "../../pages/TripsPageContainer/TripsPageContainer";
import { store } from "../../redux";
import { useChangePageHeightOnWindowResize } from "../../utils/useChangePageHeightOnWindowResize";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageContainer />,
  },
  {
    path: "/trips",
    element: <TripsPageContainer />,
  },
  {
    path: "/create",
    element: <CreateTripPageContainer />,
  },
]);

export function App() {
  useChangePageHeightOnWindowResize();

  return (
    <React.StrictMode>
      <CssBaseline />
      <Provider store={store}>
        <YMapsProvider>
          <RouterProvider router={router} />
        </YMapsProvider>
      </Provider>
    </React.StrictMode>
  );
}
