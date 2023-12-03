import { LngLat } from "@yandex/ymaps3-types/common/types/lng-lat";
import { nanoid } from "nanoid";

import { TWaypointFeature } from "../types/geo";

interface ICreateNewWaypointArgs {
  id?: string;
  coordinates?: LngLat;
  inputValue?: string;
  placeholder?: string;
}

export const createWaypoint = (
  args?: ICreateNewWaypointArgs,
): TWaypointFeature => ({
  id: args?.id ?? `waypoint-${nanoid()}`,
  geometry: {
    type: "Point",
    coordinates: args?.coordinates ?? [0, 0],
  },
  properties: {
    inputValue: args?.inputValue ?? "",
    placeholder: args?.placeholder ?? "Остановка",
  },
});
