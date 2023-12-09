import * as React from "react";

import { Map } from "../Map";

import styles from "./PageContainer.module.css";



export function PageContainer() {
  return (
    <div className={styles.root}>
      <Map />
    </div>
  );
}
