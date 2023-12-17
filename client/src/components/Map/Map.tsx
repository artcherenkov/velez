import React, { useContext } from "react";
import { BehaviorType, LngLat } from "@yandex/ymaps3-types";
import { YMapCamera, YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";
import { debounce } from "lodash";

import { YMapsContext } from "../../contexts/YMapsContext";
import {
  selectIsChooseOnMapActive,
  selectMapDefaultLocation,
  setAddress,
  setMarkerCoordinates,
  setPreviewInputValue,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Marker } from "./components/Marker";

import styles from "./Map.module.css";

export function asyncDebounce<F extends (...args: any[]) => Promise<any>>(
  func: F,
  wait?: number,
) {
  const resolveSet = new Set<(p: any) => void>();
  const rejectSet = new Set<(p: any) => void>();

  const debounced = debounce((args: Parameters<F>) => {
    func(...args)
      .then((...res) => {
        resolveSet.forEach((resolve) => resolve(...res));
        resolveSet.clear();
      })
      .catch((...res) => {
        rejectSet.forEach((reject) => reject(...res));
        rejectSet.clear();
      });
  }, wait);

  return (...args: Parameters<F>): ReturnType<F> =>
    new Promise((resolve, reject) => {
      resolveSet.add(resolve);
      rejectSet.add(reject);
      debounced(args);
    }) as ReturnType<F>;
}

const getMarkerPositionDecode = asyncDebounce(async (lngLat: LngLat) => {
  const res = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=d9648c9b-24c7-43be-9cc8-0e40bef9c076&geocode=${lngLat.join(
      ",",
    )}&format=json`,
    { headers: { Referer: "http://localhost:8080" } },
  );

  const { response } = await res.json();

  console.log(response);

  return response.GeoObjectCollection.featureMember[0].GeoObject.name;
}, 1500);

export function Map() {
  const dispatch = useAppDispatch();
  const { modules, mapRef } = useContext(YMapsContext);

  const isChooseOnMapActive = useAppSelector(selectIsChooseOnMapActive);
  const mapLocation = useAppSelector(selectMapDefaultLocation);

  const onCardMoveEnd = async (args: {
    type: BehaviorType;
    location: Required<YMapLocation>;
    camera: YMapCamera;
  }) => {
    dispatch(setMarkerCoordinates(args.location.center));
    const address = await getMarkerPositionDecode(args.location.center);
    dispatch(setAddress(address));
    dispatch(setPreviewInputValue(address));
  };

  if (!modules) {
    return <div>Загрузка...</div>;
  }

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapZoomControl,
    YMapListener,
  } = modules;

  return (
    <div className={styles.root}>
      <YMap location={mapLocation} mode="vector" ref={mapRef}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapControls position="right">
          <YMapZoomControl />
        </YMapControls>
        {isChooseOnMapActive && (
          <>
            <YMapListener onActionEnd={onCardMoveEnd} />
            <Marker />
          </>
        )}
      </YMap>
    </div>
  );
}
