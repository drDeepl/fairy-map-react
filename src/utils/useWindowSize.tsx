import { useState, useLayoutEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  const updateWindowSize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  return { width: windowSize[0], height: windowSize[1] };
};