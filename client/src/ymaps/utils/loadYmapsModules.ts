import React from "react";
import ReactDOM from "react-dom";

import { IYMapModules } from "../types";

const BASE_URL = "https://velez-trip.ru/api";

export async function loadSources() {
  await fetch(BASE_URL + "/load-ymaps")
    .then((response) => response.text())
    .then((script) => {
      const scriptTag = document.createElement("script");
      scriptTag.innerHTML = script;
      scriptTag.type = "text/javascript";
      document.head.appendChild(scriptTag);
    })
    .catch((error) =>
      console.error("Ошибка при загрузке API Яндекс Карт:", error),
    );
}

export async function loadYmapsModules(): Promise<IYMapModules> {
  const [ymaps3React] = await Promise.all([
    ymaps3.import("@yandex/ymaps3-reactify"),
    ymaps3.ready,
  ]);
  const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

  const YMapZoomControlModule = await ymaps3.import(
    "@yandex/ymaps3-controls@0.0.1",
  );
  const YMapDefaultMarkerModule = await ymaps3.import(
    "@yandex/ymaps3-markers@0.0.1",
  );

  return {
    YMap: reactify.module(ymaps3).YMap,
    YMapDefaultSchemeLayer: reactify.module(ymaps3).YMapDefaultSchemeLayer,
    YMapControls: reactify.module(ymaps3).YMapControls,
    YMapDefaultFeaturesLayer: reactify.module(ymaps3).YMapDefaultFeaturesLayer,
    YMapZoomControl: reactify.module(YMapZoomControlModule).YMapZoomControl,
    YMapDefaultMarker: reactify.module(YMapDefaultMarkerModule)
      .YMapDefaultMarker,
    YMapFeature: reactify.module(ymaps3).YMapFeature,
    YMapListener: reactify.module(ymaps3).YMapListener,
  };
}
