import { useTheme } from "./ThemeContext";
import { useMouseCoordinates } from "./useMouseCoordinates";

export function About() {
  const theme = useTheme();
  const [clientX, clientY] = useMouseCoordinates();
  const style =
    theme === "dark"
      ? {
          backgroundColor: "gray",
          color: "white",
        }
      : {};
  return (
    <div style={style}>
      {theme}
      Mouse coordinates: {clientX} {clientY}
      <h1>About</h1>
    </div>
  );
}
