import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";

import { DEFAULT_LOCATION } from "../constants/map";

import { RootState } from "./index";

interface AppState {
  mapDefaultLocation: YMapLocationRequest;
  chooseOnMap: {
    isActive: boolean;
  };
}

const initialState: AppState = {
  mapDefaultLocation: DEFAULT_LOCATION,
  chooseOnMap: {
    isActive: false,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleChooseOnMap: (state, action: PayloadAction<boolean>) => {
      state.chooseOnMap.isActive =
        action.payload ?? !state.chooseOnMap.isActive;
    },
  },
});

export const { toggleChooseOnMap } = appSlice.actions;

export const selectMapDefaultLocation = (state: RootState) => {
  return state.mapDefaultLocation;
};

export const selectIsChooseOnMapActive = (state: RootState) => {
  return state.chooseOnMap.isActive;
};

export default appSlice.reducer;
