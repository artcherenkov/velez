import React, { useReducer } from "react";
import Box from "@mui/material/Box";

import { DestinationsBlock, MainInfoBlock } from "./components";
import { DEFAULT_FORM_VALUES } from "./const";
import { tripFormReducer } from "./tripFormReducer";

export function CreateTripForm() {
  const [tripFormValues, tripFormDispatch] = useReducer(
    tripFormReducer,
    DEFAULT_FORM_VALUES,
  );

  return (
    <Box component="form" py={3}>
      <Box px={2}>
        <MainInfoBlock
          tripFormValues={tripFormValues}
          tripFormDispatch={tripFormDispatch}
        />
      </Box>
      <Box pl={2} mt={2}>
        <DestinationsBlock />
      </Box>
    </Box>
  );
}
