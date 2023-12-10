import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  ETransportType,
  TCreateTripFormValues,
} from "../../../../types/createTripFormTypes";
import { ETripFormActionKind, TActions } from "../../tripFormReducer";

import { TransportTypeSelect } from "./components/TransportTypeSelect/TransportTypeSelect";
import { DifficultySelect, PriceSelect } from "./components";

interface IInputProps {
  value: string;
  onChange(evt: React.ChangeEvent<HTMLTextAreaElement>): void;
}

function TitleInput({ value, onChange }: IInputProps) {
  return (
    <TextField
      size="medium"
      fullWidth
      multiline
      maxRows={3}
      label="Название"
      value={value}
      onChange={onChange}
    />
  );
}

function DescriptionInput({ value, onChange }: IInputProps) {
  return (
    <TextField
      size="small"
      fullWidth
      sx={{ my: 2 }}
      multiline
      minRows={4}
      maxRows={10}
      label="Расскажите о путешествии"
      value={value}
      onChange={onChange}
    />
  );
}

function RatingSelectsContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" alignItems="center" pr={1}>
      {children}
    </Box>
  );
}

interface IMainInfoBlockProps {
  tripFormValues: TCreateTripFormValues;
  tripFormDispatch: React.Dispatch<TActions>;
}

export function MainInfoBlock({
  tripFormValues,
  tripFormDispatch,
}: IMainInfoBlockProps) {
  const onTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    tripFormDispatch({
      type: ETripFormActionKind.INPUT_CHANGE,
      payload: { name: "title", value: evt.target.value },
    });
  };

  const onDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    tripFormDispatch({
      type: ETripFormActionKind.INPUT_CHANGE,
      payload: { name: "description", value: evt.target.value },
    });
  };

  const onDifficultyChange = (
    _evt: React.SyntheticEvent,
    value?: number | null,
  ) => {
    tripFormDispatch({
      type: ETripFormActionKind.RATING_CHANGE,
      payload: { name: "difficulty", value: value ?? 1 },
    });
  };

  const onPriceChange = (_evt: React.SyntheticEvent, value?: number | null) => {
    tripFormDispatch({
      type: ETripFormActionKind.RATING_CHANGE,
      payload: { name: "price", value: value ?? 1 },
    });
  };

  const onChangeTransportType = (
    _evt: React.MouseEvent<HTMLElement>,
    value: ETransportType,
  ) => {
    tripFormDispatch({
      type: ETripFormActionKind.SELECT_CHANGE,
      payload: { name: "transportType", value },
    });
  };

  return (
    <>
      <Typography variant="h5" component="h2" mb={2}>
        Общая информация
      </Typography>
      <TitleInput value={tripFormValues.title} onChange={onTitleChange} />
      <DescriptionInput
        value={tripFormValues.description}
        onChange={onDescriptionChange}
      />
      <RatingSelectsContainer>
        <DifficultySelect
          value={tripFormValues.difficulty}
          onChange={onDifficultyChange}
        />
        <PriceSelect value={tripFormValues.price} onChange={onPriceChange} />
      </RatingSelectsContainer>
      <Box mt={2}>
        <TransportTypeSelect
          value={tripFormValues.transportType}
          onChange={onChangeTransportType}
        />
      </Box>
    </>
  );
}
