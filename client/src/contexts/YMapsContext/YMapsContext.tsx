import React, { createContext, useEffect, useRef, useState } from "react";
import { YMap } from "@yandex/ymaps3-types";

import { IYMapModules, loadYmapsModules } from "../../ymaps";

export const YMapsContext = createContext<{
  modules: IYMapModules | null;
  mapRef: React.Ref<YMap>;
}>({ modules: null, mapRef: null });

interface IYMapsProvider {
  children: React.ReactNode;
}

export function YMapsProvider({ children }: IYMapsProvider) {
  const [modules, setModules] = useState<IYMapModules | null>(null);
  const mapRef = useRef<YMap>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    async function loadModules() {
      if (typeof window.ymaps3 !== "undefined") {
        clearInterval(intervalId);
        const loadedModules: IYMapModules = await loadYmapsModules();
        setModules(loadedModules);
      }
    }

    intervalId = setInterval(loadModules, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <YMapsContext.Provider value={{ modules, mapRef }}>
      {children}
    </YMapsContext.Provider>
  );
}
