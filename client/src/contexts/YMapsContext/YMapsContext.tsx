import React, { createContext, useEffect, useState } from "react";

import { IYMapModules, loadYmapsModules } from "../../ymaps";

export const YMapsContext = createContext<IYMapModules | null>(null);

interface IYMapsProvider {
  children: React.ReactNode;
}

export function YMapsProvider({ children }: IYMapsProvider) {
  const [modules, setModules] = useState<IYMapModules | null>(null);

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
    <YMapsContext.Provider value={modules}>{children}</YMapsContext.Provider>
  );
}
