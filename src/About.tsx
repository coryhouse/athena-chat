import { useContext } from "react";
import { ThemeContext } from "./App";

export function About() {
  const theme = useContext(ThemeContext);
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
      <h1>About</h1>
    </div>
  );
}
