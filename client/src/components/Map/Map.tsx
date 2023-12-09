import React, { useContext } from "react";
import { BehaviorType } from "@yandex/ymaps3-types";
import { YMapCamera, YMapLocation } from "@yandex/ymaps3-types/imperative/YMap";

import { YMapsContext } from "../../contexts/YMapsContext";
import { selectMapDefaultLocation } from "../../redux/appSlice";
import { useAppSelector } from "../../redux/hooks";

import { DefaultLayers } from "./components/DefaultLayers/DefaultLayers";

export function Map() {
  const ymapsModules = useContext(YMapsContext);

  const mapLocation = useAppSelector(selectMapDefaultLocation);

  const onCardMoveEnd = (args: {
    type: BehaviorType;
    location: Required<YMapLocation>;
    camera: YMapCamera;
  }) => {
    console.log(args.location);
  };

  if (!ymapsModules) {
    return <div>Загрузка...</div>;
  }

  return (
    <DefaultLayers ymapsModules={ymapsModules} mapLocation={mapLocation}>
      <ymapsModules.YMapListener onActionEnd={onCardMoveEnd} />
    </DefaultLayers>
  );
}
