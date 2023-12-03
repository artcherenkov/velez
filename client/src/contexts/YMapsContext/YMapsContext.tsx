import React, { createContext, useEffect, useState } from "react";

import { loadYmapsModules } from "../../ymaps";
import { IYMapModules } from "../../ymaps/types";

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
        clearInterval(intervalId); // Очистить интервал, когда ymaps3 стал доступен
        const loadedModules: IYMapModules = await loadYmapsModules();
        setModules(loadedModules);
      }
    }

    intervalId = setInterval(loadModules, 50); // Проверять каждые 500 мс

    return () => {
      clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
    };
  }, []);

  return (
    <YMapsContext.Provider value={modules}>{children}</YMapsContext.Provider>
  );
}
