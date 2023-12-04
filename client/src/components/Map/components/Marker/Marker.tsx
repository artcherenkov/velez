import React from "react";
import { MapMarkerIcon } from "../../../../icons/MapMarkerIcon";

import styles from "./Marker.module.css";

export const Marker = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.root}>
      <span className={styles.coords}>{children}</span>
      <MapMarkerIcon />
    </div>
  );
};
