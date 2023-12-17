import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./DestinationInput.module.css";

interface IDestinationInputProps {
  value: string;
  onChange(string: string): void;
  onFocus(evt: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(evt: React.FocusEvent<HTMLInputElement>): void;
  id: string;
  placeholder: string;
  dragHandle?: React.ReactNode;
  onChooseOnMapClick(): void;
}

export function DestinationInput({
  id,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  dragHandle,
  onChooseOnMapClick,
}: IDestinationInputProps) {
  return (
    <div className={styles.container}>
      <Autocomplete
        id={id}
        placeholder={placeholder}
        fullWidth
        size="small"
        sx={{ background: "white" }}
        value={value}
        onInputChange={(event, newInputValue) => {
          onChange(newInputValue);
        }}
        filterOptions={(x) => x}
        getOptionLabel={(option) => option}
        open={true}
        includeInputInList
        noOptionsText="No locations"
        onFocus={onFocus}
        onBlur={onBlur}
        options={["1", "2", "3"]}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Favorites"
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
        )}
        renderOption={(props, option) => {
          return (
            <li id="wtfisthis" {...props}>
              {option}
            </li>
          );
        }}
      />
      {dragHandle}
    </div>
  );
}
