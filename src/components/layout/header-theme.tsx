import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

/**
 * Website Change Requirements v1.0 §3 — both header options are built and can
 * be switched live without a rebuild. The switch is development-only; the
 * chosen option is persisted so a reviewer can compare them across pages.
 */
export type HeaderTheme = "light" | "dark";

const STORAGE_KEY = "shrineo.headerTheme";
const DEFAULT_THEME: HeaderTheme = "dark";

type Value = { theme: HeaderTheme; setTheme: (theme: HeaderTheme) => void };

const HeaderThemeContext = createContext<Value | null>(null);

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<HeaderTheme>(DEFAULT_THEME);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") setThemeState(stored);
  }, []);

  const setTheme = useCallback((next: HeaderTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <HeaderThemeContext.Provider value={value}>{children}</HeaderThemeContext.Provider>;
}

export function useHeaderTheme(): Value {
  return useContext(HeaderThemeContext) ?? { theme: DEFAULT_THEME, setTheme: () => {} };
}

/** Development-only comparison switch. Never rendered in a production build. */
export function HeaderThemeSwitch() {
  return null;
}
