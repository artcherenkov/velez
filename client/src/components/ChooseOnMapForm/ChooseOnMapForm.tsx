import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import { DEFAULT_LOCATION } from "../../constants/map";
import {
  selectIsChooseOnMapActive,
  selectPlacesPreviewActive,
  setActiveInputId,
  setLineString,
  setMapLocation,
  setMarkerCoordinates,
  toggleChooseOnMap,
  togglePlacesPreview,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Map } from "../Map";

import { BackButton, Content, DestinationForm, Title } from "./components";

import styles from "./ChooseOnMapForm.module.css";

export function ChooseOnMapForm() {
  const dispatch = useAppDispatch();
  const chooseOnMapActive = useAppSelector(selectIsChooseOnMapActive);
  const placesPreviewActive = useAppSelector(selectPlacesPreviewActive);

  const onClose = () => {
    dispatch(setActiveInputId(null));
    dispatch(toggleChooseOnMap(false));
    dispatch(setMarkerCoordinates(null));
    dispatch(setMapLocation(DEFAULT_LOCATION));
    dispatch(togglePlacesPreview(false));
  };

  return (
    <Drawer
      anchor="bottom"
      open={chooseOnMapActive || placesPreviewActive}
      onClose={onClose}
      keepMounted
      classes={{ paper: styles.mapContainer }}
    >
      <Map />
      {placesPreviewActive && (
        <Box position="absolute" top={8} right={8}>
          <IconButton
            size="large"
            sx={{ background: blue["800"], color: "#fff" }}
            onClick={() => {
              dispatch(togglePlacesPreview(false));
              setTimeout(() => {
                dispatch(setLineString(null));
              }, 300);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      {chooseOnMapActive && (
        <Content>
          <Box sx={{ display: "flex" }}>
            <BackButton onClick={onClose} />
            <Title>Выберите пункт</Title>
          </Box>
          <DestinationForm />
        </Content>
      )}
    </Drawer>
  );
}
