import { createSlice } from "@reduxjs/toolkit";
import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";

import { DEFAULT_LOCATION } from "../constants/map";

import { RootState } from "./index";

interface AppState {
  mapDefaultLocation: YMapLocationRequest;
}

const initialState: AppState = {
  mapDefaultLocation: DEFAULT_LOCATION,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export const selectMapDefaultLocation = (state: RootState) =>
  state.mapDefaultLocation;

export default appSlice.reducer;
