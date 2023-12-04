import { useEffect } from "react";

export const useChangePageHeightOnWindowResize = () => {
  useEffect(() => {
    const onPageResize = () => {
      document.documentElement.style.setProperty(
        "--page-height",
        `${window.innerHeight}px`,
      );
    };
    window.addEventListener("resize", onPageResize);

    onPageResize();
  }, []);
};
