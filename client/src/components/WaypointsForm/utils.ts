import { TWaypointFeature } from "../../types/geo";

const renameWaypoint = (
  waypoint: TWaypointFeature,
  idx: number,
  waypoints: TWaypointFeature[],
): TWaypointFeature => {
  let placeholder: string;

  switch (idx) {
    case 0:
      placeholder = "Начало";
      break;
    case waypoints.length - 1:
      placeholder = "Конец";
      break;
    default:
      placeholder = `Остановка ${idx}`;
  }

  waypoint.properties.placeholder = placeholder;

  return waypoint;
};

export const renameWaypoints = (
  waypoints: TWaypointFeature[],
): TWaypointFeature[] => {
  return waypoints.map(renameWaypoint);
};
