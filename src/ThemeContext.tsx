import React, { useContext, useState } from "react";

type ThemeContextOptions = "light" | "dark";

export const ThemeContext = React.createContext<ThemeContextOptions>("light");

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeContextOptions>("dark");

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
