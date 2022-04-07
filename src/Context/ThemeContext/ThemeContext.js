import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage/useLocalStorage";

export const ThemeContext = createContext({ theme: null, toggleTheme: null });

export function ThemeContextProvider({ children }) {
  const { GetLocalStorage, SetLocalStorage } = useLocalStorage();
  const [isLight, setIsLight] = useState(GetLocalStorage("themeState") ?? true);
  const theme = {
    background: isLight ? "#ffffff" : "#111828",
    color: isLight ? "#394347" : "#dadee1",
    depthColor: isLight ? "#dbe5f1" : "#202938",
    depthColorTwo: isLight ? "#dddddd" : "#101113",
    brandColor: isLight ? "#8a4af3" : "#4caf50"
  };
  const toggleTheme = () => {
    setIsLight(!isLight);
    SetLocalStorage("themeState", !isLight);
    const meta = document.querySelector('meta[name="theme-color"]');
    meta.content = theme.background;
  };
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta.content = theme.background;
  }, [theme.background]);
  return (
    <ThemeContext.Provider value={{ isLight, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
