import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { addTrip, selectDestinations } from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { DestinationsBlock, MainInfoBlock } from "./components";
import { DEFAULT_FORM_VALUES } from "./const";
import { tripFormReducer } from "./tripFormReducer";

export function CreateTripForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const destinations = useAppSelector(selectDestinations);
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
      <Box mt={4} px={2} mb={4}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => {
            console.log({ destinations, ...tripFormValues });
            dispatch(addTrip({ destinations, ...tripFormValues }));
            navigate("/trips");
          }}
        >
          Создать
        </Button>
      </Box>
    </Box>
  );
}
