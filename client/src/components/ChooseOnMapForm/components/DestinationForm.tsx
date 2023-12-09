import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { toggleChooseOnMap } from "../../../redux/appSlice";
import { useAppDispatch } from "../../../redux/hooks";

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

  const onDoneClick = () => {
    dispatch(toggleChooseOnMap(false));
  };

  return (
    <Box component="form" mt={4}>
      <DestinationOutput label="Пункт назначения" value="destination" />
      <DoneButton onClick={onDoneClick}>Готово</DoneButton>
    </Box>
  );
}
