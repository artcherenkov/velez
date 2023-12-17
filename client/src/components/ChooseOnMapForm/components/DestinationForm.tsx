import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { DEFAULT_LOCATION } from "../../../constants/map";
import {
  selectPreviewInputValue,
  setActiveInputId,
  setDestinationCoordinates,
  setMapLocation,
  setMarkerCoordinates,
  toggleChooseOnMap,
} from "../../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

interface IDoneButtonProps {
  children: string;
  onClick(): void;
}

function DoneButton({ onClick, children }: IDoneButtonProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 2, py: 1 }}
      size="small"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

interface IDestinationOutputProps {
  label: string;
  value: string;
}

function DestinationOutput({ label, value }: IDestinationOutputProps) {
  return (
    <TextField
      label={label}
      value={value}
      variant="outlined"
      size="small"
      fullWidth
      InputProps={{ readOnly: true }}
    />
  );
}

export function DestinationForm() {
  const dispatch = useAppDispatch();
  const previewInputValue = useAppSelector(selectPreviewInputValue);

  const onDoneClick = () => {
    dispatch(setDestinationCoordinates());
    dispatch(setActiveInputId(null));
    dispatch(toggleChooseOnMap(false));
    dispatch(setMarkerCoordinates(null));
    dispatch(setMapLocation(DEFAULT_LOCATION));
  };

  return (
    <Box component="form" mt={4}>
      <DestinationOutput label="Пункт назначения" value={previewInputValue} />
      <DoneButton onClick={onDoneClick}>Готово</DoneButton>
    </Box>
  );
}
