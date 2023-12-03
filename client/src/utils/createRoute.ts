import { LngLat } from "@yandex/ymaps3-types/common/types/lng-lat";
import { nanoid } from "nanoid";

import { TRouteFeature } from "../types/geo";

interface ICreateRouteArgs {
  id?: string;
  coordinates?: LngLat[];
}

export const createRoute = (args?: ICreateRouteArgs): TRouteFeature => ({
  id: args?.id ?? `route-${nanoid()}`,
  geometry: {
    type: "LineString",
    coordinates: args?.coordinates ?? [[0, 0]],
  },
  style: {
    stroke: [{ width: 5, color: "#196dff" }],
  },
});
