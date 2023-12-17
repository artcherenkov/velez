import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LngLat } from "@yandex/ymaps3-types";
import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";

import { TPlace } from "../components/CreateTripForm/components";
import { DEFAULT_LOCATION } from "../constants/map";

import { RootState } from "./index";

type TDestination = {
  id: string;
  placeholder: string;
  value: string;
  coordinates: LngLat | null;
};

interface AppState {
  mapDefaultLocation: YMapLocationRequest;
  createTripForm: {
    chooseOnMap: {
      isActive: boolean;
      activeInputId: string | null;
      markerCoordinates: LngLat | null;
      previewInputValue: string;
      address: string;
    };
    destinations: TDestination[];
    suggestions: TPlace[];
  };
}

type TReorderDestinationsPayload = PayloadAction<{
  startIndex: number;
  endIndex: number;
}>;

const initialDestinations: TDestination[] = [
  { placeholder: "Точка 1", id: "wfjnwf", value: "", coordinates: null },
  { placeholder: "Точка 2", id: "vnemf", value: "", coordinates: null },
  { placeholder: "Точка 3", id: "efnfjkef", value: "", coordinates: null },
];

const initialState: AppState = {
  mapDefaultLocation: DEFAULT_LOCATION,
  createTripForm: {
    chooseOnMap: {
      isActive: false,
      activeInputId: null,
      markerCoordinates: null,
      previewInputValue: "",
      address: "",
    },
    destinations: initialDestinations,
    suggestions: [],
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
    reorderDestinations: (state, action: TReorderDestinationsPayload) => {
      const { startIndex, endIndex } = action.payload;

      const result = Array.from(state.createTripForm.destinations);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      state.createTripForm.destinations = result;
    },
    setActiveInputId: (state, action: PayloadAction<string | null>) => {
      state.createTripForm.chooseOnMap.activeInputId = action.payload;
    },
    setMarkerCoordinates: (state, action: PayloadAction<LngLat | null>) => {
      const { chooseOnMap } = state.createTripForm;
      chooseOnMap.markerCoordinates = action.payload;
    },
    setDestinationCoordinates: (state) => {
      const {
        destinations,
        chooseOnMap: { activeInputId, markerCoordinates, address },
      } = state.createTripForm;
      const activeDestinationIndex = destinations.findIndex(
        (d) => d.id === activeInputId,
      );
      destinations[activeDestinationIndex].coordinates = markerCoordinates;
      destinations[activeDestinationIndex].value = address;
    },
    setMapLocation: (state, action: PayloadAction<YMapLocationRequest>) => {
      state.mapDefaultLocation = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.createTripForm.chooseOnMap.address = action.payload;
    },
    setPreviewInputValue: (state, action: PayloadAction<string>) => {
      state.createTripForm.chooseOnMap.previewInputValue = action.payload;
    },
    setActiveInputValue: (state, action: PayloadAction<string>) => {
      const {
        destinations,
        chooseOnMap: { activeInputId },
      } = state.createTripForm;
      const activeDestinationIndex = destinations.findIndex(
        (d) => d.id === activeInputId,
      );
      destinations[activeDestinationIndex].value = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<TPlace[]>) => {
      state.createTripForm.suggestions = action.payload;
    },
    setDestinationCoords: (
      state,
      action: PayloadAction<{ lngLat: LngLat; id: string }>,
    ) => {
      const { destinations } = state.createTripForm;
      const { id, lngLat } = action.payload;
      const activeDestinationIndex = destinations.findIndex((d) => d.id === id);
      destinations[activeDestinationIndex].coordinates = lngLat;
    },
  },
});

export const {
  toggleChooseOnMap,
  reorderDestinations,
  setActiveInputId,
  setMarkerCoordinates,
  setDestinationCoordinates,
  setMapLocation,
  setPreviewInputValue,
  setAddress,
  setActiveInputValue,
  setSuggestions,
  setDestinationCoords,
} = appSlice.actions;

export const selectMapDefaultLocation = (state: RootState) => {
  return state.mapDefaultLocation;
};

export const selectIsChooseOnMapActive = (state: RootState) => {
  return state.createTripForm.chooseOnMap.isActive;
};

export const selectDestinations = (state: RootState) => {
  return state.createTripForm.destinations;
};

export const selectDestinationsById = (
  state: RootState,
): { [id: string]: TDestination } => {
  return state.createTripForm.destinations.reduce((acc, d) => {
    return { ...acc, [d.id]: d };
  }, {});
};

export const selectActiveInputId = (state: RootState) => {
  return state.createTripForm.chooseOnMap.activeInputId;
};

export const selectMarkerCoordinates = (state: RootState) => {
  return state.createTripForm.chooseOnMap.markerCoordinates;
};

export const selectPreviewInputValue = (state: RootState) => {
  return state.createTripForm.chooseOnMap.previewInputValue;
};

export const selectSuggestions = (state: RootState) => {
  return state.createTripForm.suggestions;
};

export default appSlice.reducer;
