import {
  YMap,
  YMapControls,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapFeature,
  YMapListener,
  YMapMarker,
} from "@yandex/ymaps3-types";
import { YMapZoomControl } from "@yandex/ymaps3-types/packages/controls";
import { YMapDefaultMarker } from "@yandex/ymaps3-types/packages/markers";
import { ReactifiedEntity } from "@yandex/ymaps3-types/reactify";

export interface IYMapModules {
  YMap: ReactifiedEntity<typeof YMap>;
  YMapDefaultSchemeLayer: ReactifiedEntity<typeof YMapDefaultSchemeLayer>;
  YMapControls: ReactifiedEntity<typeof YMapControls>;
  YMapDefaultFeaturesLayer: ReactifiedEntity<typeof YMapDefaultFeaturesLayer>;
  YMapDefaultMarker: ReactifiedEntity<typeof YMapDefaultMarker>;
  YMapMarker: ReactifiedEntity<typeof YMapMarker>;
  YMapZoomControl: ReactifiedEntity<typeof YMapZoomControl>;
  YMapFeature: ReactifiedEntity<typeof YMapFeature>;
  YMapListener: ReactifiedEntity<typeof YMapListener>;
}
