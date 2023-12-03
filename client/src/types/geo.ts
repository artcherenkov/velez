import { DrawingStyle, LineStringGeometry } from "@yandex/ymaps3-types";
import { PointGeometry } from "@yandex/ymaps3-types/common/types";

export type TWaypointFeatureProperties = {
  placeholder: string;
  inputValue: string;
};

export type TWaypointFeature = {
  id: string;
  geometry: PointGeometry;
  source?: string;
  style?: DrawingStyle;
  properties: TWaypointFeatureProperties;
};

export type TRouteFeature = {
  id?: string;
  geometry: LineStringGeometry;
  style?: DrawingStyle;
};
