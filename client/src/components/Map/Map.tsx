import React, { useContext } from "react";
import { BehaviorType } from "@yandex/ymaps3-types";
import { YMapCamera, YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";

import { YMapsContext } from "../../contexts/YMapsContext";
import {
  selectIsChooseOnMapActive,
  selectMapDefaultLocation,
  setMarkerCoordinates,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Marker } from "./components/Marker";

import styles from "./Map.module.css";

export function Map() {
  const dispatch = useAppDispatch();
  const { modules, mapRef } = useContext(YMapsContext);

  const isChooseOnMapActive = useAppSelector(selectIsChooseOnMapActive);
  const mapLocation = useAppSelector(selectMapDefaultLocation);

  const onCardMoveEnd = (args: {
    type: BehaviorType;
    location: Required<YMapLocation>;
    camera: YMapCamera;
  }) => {
    dispatch(setMarkerCoordinates(args.location.center));
  };

  if (!modules) {
    return <div>Загрузка...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapZoomControl,
    YMapListener,
  } = modules;

  return (
    <div className={styles.root}>
      <YMap location={mapLocation} mode="vector" ref={mapRef}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapControls position="right">
          <YMapZoomControl />
        </YMapControls>
        {isChooseOnMapActive && (
          <>
            <YMapListener onActionEnd={onCardMoveEnd} />
            <Marker />
          </>
        )}
      </YMap>
    </div>
  );
}
