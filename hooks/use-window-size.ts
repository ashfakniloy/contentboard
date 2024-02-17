import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

function getBreakPoint(
  windowWidth: number | undefined
): Breakpoint | undefined {
  if (windowWidth) {
    if (windowWidth < 640) {
      return "sm";
    } else if (windowWidth < 768) {
      return "md";
    } else if (windowWidth < 1024) {
      return "lg";
    } else if (windowWidth < 1280) {
      return "xl";
    } else {
      return "2xl";
    }
  } else {
    return undefined;
  }
}

function useWindowSize() {
  const isWindowClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState<Breakpoint | undefined>(
    isWindowClient ? getBreakPoint(window?.innerWidth) : undefined
  );

  useEffect(() => {
    function setSize() {
      setWindowSize(getBreakPoint(window?.innerWidth));
    }

    if (isWindowClient) {
      window?.addEventListener("resize", setSize);

      return () => window?.removeEventListener("resize", setSize);
    }
  }, [isWindowClient, setWindowSize]);

  return windowSize;
}

export default useWindowSize;
