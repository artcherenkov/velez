import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./DestinationInput.module.css";

interface IDestinationInputProps {
  value: string;
  onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
  id: string;
  placeholder: string;
  dragHandle?: React.ReactNode;
  onChooseOnMapClick(): void;
}

export function DestinationInput({
  id,
  value,
  onChange,
  placeholder,
  dragHandle,
  onChooseOnMapClick,
}: IDestinationInputProps) {
  return (
    <div className={styles.container}>
      <TextField
        id={id}
        placeholder={placeholder}
        fullWidth
        size="small"
        sx={{ background: "white" }}
        value={value}
        onChange={onChange}
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
