import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_KEY = "devmatch.theme";
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const themes = ["peach", "ocean", "forest", "grape", "sunset", "mono"];
  const [theme, setThemeState] = useState(() => localStorage.getItem(THEME_KEY) || "peach");

  const setTheme = (t) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme, themes }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
