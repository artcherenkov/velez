import React from "react";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { TPlace } from "../DestinationsBlock";

import styles from "./DestinationInput.module.css";

interface IDestinationInputProps {
  value: string;
  onInputChange(
    event: React.SyntheticEvent,
    value: string,
    reason: string,
  ): void;
  onFocus(evt: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(evt: React.FocusEvent<HTMLInputElement>): void;
  id: string;
  loading: boolean;
  placeholder: string;
  onClose(): void;
  dragHandle?: React.ReactNode;
  options: TPlace[];
  onChooseOnMapClick(): void;
  onOptionChange(
    event: React.SyntheticEvent,
    value: TPlace | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TPlace>,
  ): void;
}

export function DestinationSuggest({
  id,
  value,
  onInputChange,
  onFocus,
  onBlur,
  onClose,
  placeholder,
  loading,
  dragHandle,
  onChooseOnMapClick,
  options,
  onOptionChange,
}: IDestinationInputProps) {
  const endAdornment = React.useMemo(
    () => (
      <Button
        id="wtf"
        onClick={onChooseOnMapClick}
        size="small"
        sx={{ fontSize: 10 }}
      >
        На карте
      </Button>
    ),
    [onChooseOnMapClick],
  );

  const renderInput = React.useCallback(
    (params: AutocompleteRenderInputParams) => {
      return (
        <TextField
          {...params}
          fullWidth
          InputProps={{ ...params.InputProps, endAdornment }}
        />
      );
    },
    [endAdornment],
  );

  return (
    <div className={styles.container}>
      <Autocomplete
        sx={{
          ".MuiAutocomplete-inputRoot": { padding: "8px !important" },
          ".MuiPopper-root": { outline: "2px solid red", borderRadius: 4 },
        }}
        options={options}
        fullWidth
        placeholder="Введите адрес или название места"
        autoComplete
        includeInputInList
        filterSelectedOptions
        inputValue={value}
        noOptionsText="Места не найдены"
        loadingText="Загрузка..."
        filterOptions={(x) => x}
        onInputChange={onInputChange}
        getOptionLabel={(option) => option.title}
        onFocus={onFocus}
        onChange={onOptionChange}
        onClose={onClose}
        loading={loading}
        renderInput={renderInput}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <Box display="flex" flexDirection="column">
                <Typography>{option.title}</Typography>
                <Typography variant="body2" color={grey.A700}>
                  {option.subtitle}
                </Typography>
              </Box>
            </li>
          );
        }}
      />
      {dragHandle}
    </div>
  );
}
