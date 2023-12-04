import { nanoid } from "nanoid";
import { useState } from "react";

import { TRouteFeature, TWaypointFeature } from "../../types/geo";
import { Map } from "../Map";
import { WaypointsForm } from "../WaypointsForm";

import styles from "./PageContainer.module.css";

const DEFAULT_WAYPOINTS: TWaypointFeature[] = [
  {
    id: `waypoint-${nanoid()}`,
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      inputValue: "",
      placeholder: "Начало",
    },
  },
  {
    id: `waypoint-${nanoid()}`,
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    properties: {
      inputValue: "",
      placeholder: "Конец",
    },
  },
];

export function PageContainer() {
  const [waypoints, setWaypoints] =
    useState<TWaypointFeature[]>(DEFAULT_WAYPOINTS);
  const [route, setRoute] = useState<null | TRouteFeature>(null);
  const [activeWaypointId, setActiveWaypointId] = useState<string | null>(null);

  return (
    <div className={styles.root}>
      <Map
        waypoints={waypoints}
        route={route}
        activeWaypointId={activeWaypointId}
        onActiveWaypointChange={setActiveWaypointId}
        onWaypointsChange={setWaypoints}
      />
    </div>
  );
}
