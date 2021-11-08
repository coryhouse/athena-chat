import { useEffect, useState } from "react";

type Coords = {
  clientX: number;
  clientY: number;
};

/** Returns current mouse coordinates */
export function useMouseCoordinates() {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    const handler = ({ clientX, clientY }: Coords) => {
      setCoords([clientX, clientY]);
    };

    window.addEventListener("mousemove", handler);

    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  return coords;
}
