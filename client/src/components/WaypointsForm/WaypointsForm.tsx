import { DeleteIcon } from "@chakra-ui/icons";
import { Button, FormControl, IconButton, Input } from "@chakra-ui/react";
import React from "react";

import { TRouteFeature, TWaypointFeature } from "../../types/geo";
import { createRoute } from "../../utils/createRoute";
import { createWaypoint } from "../../utils/createWaypoint";

import { renameWaypoints } from "./utils";

import styles from "./WaypointsForm.module.css";

interface IWaypointsFormProps {
  waypoints: TWaypointFeature[];
  activeWaypointId: string | null;

  onRouteBuilt(route: TRouteFeature): void;
  onActiveWaypointChange(waypointId: string | null): void;
  onWaypointsChange(waypoints: TWaypointFeature[]): void;
}

export function WaypointsForm(props: IWaypointsFormProps) {
  const { waypoints, onRouteBuilt, onActiveWaypointChange, onWaypointsChange } =
    props;

  const onFormChange = (evt: React.ChangeEvent<HTMLFormElement>) => {
    const nextWaypoints = waypoints.slice();
    const waypointToChangeIdx = waypoints.findIndex(
      (w) => w.id === evt.target.name,
    );

    nextWaypoints[waypointToChangeIdx].properties.inputValue = evt.target.value;

    onWaypointsChange(nextWaypoints);
  };

  const onAddWaypointClick = () => {
    const newWaypoint = createWaypoint();
    const nextWaypoints = [...waypoints, newWaypoint];
    const renamedWaypoints = renameWaypoints(nextWaypoints);

    onWaypointsChange(renamedWaypoints);
  };

  const onWaypointDeleteClick = (id: string) => {
    const newWaypoints = waypoints.filter((w) => w.id !== id);
    const renamedWaypoints = renameWaypoints(newWaypoints);

    onWaypointsChange(renamedWaypoints);
    onActiveWaypointChange(null);
  };

  const onWaypointFocus = (waypointId: string) => {
    onActiveWaypointChange(waypointId);
  };

  const onBuildRouteClick = async () => {
    const res = await fetch(
      "https://graphhopper.com/api/1/route?key=f2b4cb43-64dd-46f5-94a5-3212fdbbd65e",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: waypoints.map((w) => w.geometry.coordinates),
          snap_preventions: ["motorway", "ferry", "tunnel"],
          details: ["road_class", "surface"],
          profile: "car",
          locale: "ru",
          instructions: true,
          calc_points: true,
          points_encoded: false,
        }),
      },
    );

    const json = await res.json();

    const newRoute = createRoute({
      coordinates: json.paths[0].points.coordinates,
    });
    console.log(json.paths[0].points.coordinates);
    onRouteBuilt(newRoute);
  };

  return (
    <section className={styles.root}>
      <form action="#" onChange={onFormChange}>
        {waypoints.map((waypoint) => {
          return (
            <FormControl className={styles.formControl} key={waypoint.id}>
              <div className={styles.waypointInput}>
                <Input
                  name={waypoint.id}
                  placeholder={waypoint.properties.placeholder}
                  defaultValue={waypoint.properties.inputValue}
                  onFocus={() => onWaypointFocus(waypoint.id)}
                />
                <IconButton
                  className={styles.deleteWaypointButton}
                  icon={<DeleteIcon />}
                  isDisabled={waypoints.length === 2}
                  onClick={() => onWaypointDeleteClick(waypoint.id)}
                  aria-label="delete waypoint"
                />
              </div>
            </FormControl>
          );
        })}
      </form>
      <Button
        className={styles.addButton}
        colorScheme="teal"
        variant="ghost"
        size="sm"
        onClick={onAddWaypointClick}
      >
        Добавить остановку
      </Button>
      <Button
        className={styles.buildRouteButton}
        colorScheme="teal"
        onClick={onBuildRouteClick}
      >
        Построить маршрут
      </Button>
    </section>
  );
}
