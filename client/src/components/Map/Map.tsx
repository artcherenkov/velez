import { LngLat } from "@yandex/ymaps3-types/common/types/lng-lat";
import React, { useContext, useState } from "react";

import { YMapsContext } from "../../contexts/YMapsContext";
import { TRouteFeature, TWaypointFeature } from "../../types/geo";

import styles from "./Map.module.css";

const LOCATION = { center: [30.368501, 59.884941], zoom: 16 };

interface IMapProps {
  waypoints: TWaypointFeature[];
  route: TRouteFeature | null;
  activeWaypointId: string | null;
  onActiveWaypointChange(waypointId: string | null): void;
  onWaypointsChange(waypoints: TWaypointFeature[]): void;
}

export function Map(props: IMapProps) {
  const ymapsModules = useContext(YMapsContext);

  const {
    waypoints,
    route,
    activeWaypointId,
    onWaypointsChange,
    onActiveWaypointChange,
  } = props;

  const [newWaypointCoords, setNewWaypointCoords] = useState<LngLat>([0, 0]);

  const waypointToChangeIdx = waypoints.findIndex(
    (w) => w.id === activeWaypointId,
  );
  const isUpdatingFeatures = waypointToChangeIdx !== -1;

  if (!ymapsModules) {
    return <div className={styles.root}>Loading...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapDefaultMarker,
    YMapZoomControl,
    YMapFeature,
    YMapListener,
  } = ymapsModules;

  return (
    <div className={styles.root}>
      <YMap location={LOCATION} mode="vector">
        <YMapListener
          onClick={(_obj, evt) => {
            if (isUpdatingFeatures) {
              console.log("create");
              waypoints[waypointToChangeIdx].geometry.coordinates =
                evt.coordinates;
              waypoints[waypointToChangeIdx].properties.inputValue =
                evt.coordinates.toString();

              onActiveWaypointChange(null);
              onWaypointsChange(waypoints);
            }
          }}
          onPointerMove={(_obj, evt) => {
            setNewWaypointCoords(evt.coordinates);
          }}
        />
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        {waypoints.map((point, idx) => (
          <YMapDefaultMarker
            key={`coord=${idx}`}
            coordinates={point.geometry.coordinates}
            title={point.properties.placeholder}
            onDragEnd={(evt) => console.log(evt)}
          />
        ))}
        {isUpdatingFeatures && (
          <YMapDefaultMarker
            key="new waypoint"
            color="rgb(255, 51, 51, 0.3)"
            coordinates={newWaypointCoords}
            onDragEnd={(evt) => console.log(evt)}
          />
        )}

        <YMapControls position="right">
          <YMapZoomControl />
        </YMapControls>
        {route && <YMapFeature {...route} />}
      </YMap>
    </div>
  );
}
