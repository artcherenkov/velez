import React from "react";
import { YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap";

import { IYMapModules } from "../../../../ymaps";

import styles from "../../Map.module.css";

interface IDefaultLayersProps {
  ymapsModules: IYMapModules;
  mapLocation: YMapLocationRequest;
  children?: React.ReactNode;
}

export function DefaultLayers(props: IDefaultLayersProps) {
  const { ymapsModules, mapLocation, children } = props;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapZoomControl,
  } = ymapsModules;

  return (
    <div className={styles.root}>
      <YMap location={mapLocation} mode="vector">
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapControls position="right">
          <YMapZoomControl />
        </YMapControls>
        {children}
      </YMap>
    </div>
  );
}
