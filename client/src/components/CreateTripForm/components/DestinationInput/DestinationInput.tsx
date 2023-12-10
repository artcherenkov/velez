import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./DestinationInput.module.css";

interface IDestinationInputProps {
  placeholder: string;
  dragHandle?: React.ReactNode;
  onChooseOnMapClick(): void;
}

export function DestinationInput({
  placeholder,
  dragHandle,
  onChooseOnMapClick,
}: IDestinationInputProps) {
  return (
    <div className={styles.container}>
      <TextField
        placeholder={placeholder}
        fullWidth
        size="small"
        sx={{ background: "white" }}
        InputProps={{
          endAdornment: (
            <Button
              onClick={onChooseOnMapClick}
              size="small"
              sx={{ fontSize: 10 }}
            >
              На карте
            </Button>
          ),
        }}
      />
      {dragHandle}
    </div>
  );
}
