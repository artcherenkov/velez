import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import {
  selectIsChooseOnMapActive,
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
    dispatch(toggleChooseOnMap(false));
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
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
