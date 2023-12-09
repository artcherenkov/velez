import React, { useContext } from "react";
import { BehaviorType } from "@yandex/ymaps3-types";
import { LngLat } from "@yandex/ymaps3-types/common/types/lng-lat";
import { YMapCamera, YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";

import { YMapsContext } from "../../contexts/YMapsContext";
import { BASE_URL } from "../../ymaps";

import styles from "./Map.module.css";

const LOCATION = { center: [30.368501, 59.884941], zoom: 16 };

const getGeocoded = async (coords: LngLat) => {
  const res = await fetch(BASE_URL + `/geocode`, {
    method: "POST",
    body: JSON.stringify({ coords }),
    headers: {
      Referer: "http://localhost:3030/",
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export function Map() {
  const ymapsModules = useContext(YMapsContext);

  const onCardMoveEnd = (args: {
    type: BehaviorType;
    location: Required<YMapLocation>;
    camera: YMapCamera;
  }) => {
    console.log(args.location);
  };

  if (!ymapsModules) {
    return <div className={styles.root}>Loading...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapZoomControl,
    YMapListener,
  } = ymapsModules;

  return (
    <div className={styles.root}>
      <YMap location={LOCATION} mode="vector">
        <YMapListener onActionEnd={onCardMoveEnd} />
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapControls position="right">
          <YMapZoomControl />
        </YMapControls>
      </YMap>
    </div>
  );
}
