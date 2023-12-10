import React from "react";
import Box from "@mui/material/Box";

import { DestinationsBlock, MainInfoBlock } from "./components";

export function CreateTripForm() {
  return (
    <Box component="form" py={3}>
      <Box px={2}>
        <MainInfoBlock />
      </Box>
      <Box pl={2} mt={2}>
        <DestinationsBlock />
      </Box>
    </Box>
  );
}
