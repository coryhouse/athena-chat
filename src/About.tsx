import { useTheme } from "./ThemeContext";

export function About() {
  const theme = useTheme();
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
