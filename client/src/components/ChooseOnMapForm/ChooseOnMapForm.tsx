import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { DEFAULT_LOCATION } from "../../constants/map";
import {
  selectIsChooseOnMapActive,
  setActiveInputId,
  setMapLocation,
  setMarkerCoordinates,
  toggleChooseOnMap,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Map } from "../Map";

import { BackButton, Content, DestinationForm, Title } from "./components";

import styles from "./ChooseOnMapForm.module.css";

export function ChooseOnMapForm() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectIsChooseOnMapActive);

  const onClose = () => {
    dispatch(setActiveInputId(null));
    dispatch(toggleChooseOnMap(false));
    dispatch(setMarkerCoordinates(null));
    dispatch(setMapLocation(DEFAULT_LOCATION));
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      keepMounted
      classes={{ paper: styles.mapContainer }}
    >
      <Map />
      <Content>
        <Box sx={{ display: "flex" }}>
          <BackButton onClick={onClose} />
          <Title>Выберите пункт</Title>
        </Box>
        <DestinationForm />
      </Content>
    </Drawer>
  );
}
