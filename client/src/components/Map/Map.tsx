import { LngLat } from "@yandex/ymaps3-types/common/types/lng-lat";
import React, { useContext, useState } from "react";

import { YMapsContext } from "../../contexts/YMapsContext";
import { TRouteFeature, TWaypointFeature } from "../../types/geo";

import styles from "./Map.module.css";
import { Marker } from "./components/Marker";
import { BASE_URL } from "../../ymaps";

const LOCATION = { center: [30.368501, 59.884941], zoom: 16 };

interface IMapProps {
  waypoints: TWaypointFeature[];
  route: TRouteFeature | null;
  activeWaypointId: string | null;
  onActiveWaypointChange(waypointId: string | null): void;
  onWaypointsChange(waypoints: TWaypointFeature[]): void;
}

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

export function Map(props: IMapProps) {
  const ymapsModules = useContext(YMapsContext);

  const { waypoints, route } = props;

  const [centerCoords, setCenterCoords] = useState<LngLat>([0, 0]);
  const [markerTitle, setMarkerTitle] = useState("");

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
          onActionEnd={async ({ location }) => {
            setCenterCoords(location.center);
            console.log(location.center);
            const { response } = await getGeocoded(location.center);
            setMarkerTitle(
              response.GeoObjectCollection.featureMember[0].GeoObject
                .metaDataProperty.GeocoderMetaData.text,
            );
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
        <Marker>{markerTitle}</Marker>

        <YMapControls position="right">
          <YMapZoomControl />
        </YMapControls>
        {route && <YMapFeature {...route} />}
      </YMap>
    </div>
  );
}
