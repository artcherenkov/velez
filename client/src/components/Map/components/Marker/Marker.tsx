import React from "react";

import { MapMarkerIcon } from "../../../../icons/MapMarkerIcon";

import styles from "./Marker.module.css";

export const Marker = () => {
  return (
    <div className={styles.marker}>
      <MapMarkerIcon />
    </div>
  );
};
