import React from "react";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";
import Autocomplete, {
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
        sx={{ ".MuiAutocomplete-inputRoot": { padding: "8px !important" } }}
        options={options}
        fullWidth
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
              {option.title} <br />
              {option.subtitle}
            </li>
          );
        }}
      />
      {dragHandle}
    </div>
  );
}
