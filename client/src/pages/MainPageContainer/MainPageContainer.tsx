import * as React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function MainPageContainer() {
  return (
    <Box px={2} pt={10}>
      <Typography variant="h5" component="h1" textAlign="center">
        Привет от Velez Trip!
      </Typography>
      <Typography variant="h5" component="h2" textAlign="center" mt={2}>
        <NavLink to="/create">Создайте свой первый маршрут</NavLink>
      </Typography>
    </Box>
  );
}
