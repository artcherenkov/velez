import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";

import { DEFAULT_LOCATION } from "../constants/map";

import { RootState } from "./index";

type TDestination = {
  id: string;
  placeholder: string;
};

interface AppState {
  mapDefaultLocation: YMapLocationRequest;
  createTripForm: {
    chooseOnMap: {
      isActive: boolean;
    };
    destinations: TDestination[];
  };
}

const initialDestinations: TDestination[] = [
  { placeholder: "Точка 1", id: "wfjnwf" },
  { placeholder: "Точка 2", id: "vnemf" },
  { placeholder: "Точка 3", id: "efnfjkef" },
];

const initialState: AppState = {
  mapDefaultLocation: DEFAULT_LOCATION,
  createTripForm: {
    chooseOnMap: {
      isActive: false,
    },
    destinations: initialDestinations,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleChooseOnMap: (state, action: PayloadAction<boolean>) => {
      state.createTripForm.chooseOnMap.isActive =
        action.payload ?? !state.createTripForm.chooseOnMap.isActive;
    },
    reorderDestinations: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>,
    ) => {
      const { startIndex, endIndex } = action.payload;

      const result = Array.from(state.createTripForm.destinations);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      state.createTripForm.destinations = result;
    },
  },
});

export const { toggleChooseOnMap, reorderDestinations } = appSlice.actions;

export const selectMapDefaultLocation = (state: RootState) => {
  return state.mapDefaultLocation;
};

export const selectIsChooseOnMapActive = (state: RootState) => {
  return state.createTripForm.chooseOnMap.isActive;
};

export const selectDestinations = (state: RootState) => {
  return state.createTripForm.destinations;
};

export default appSlice.reducer;
