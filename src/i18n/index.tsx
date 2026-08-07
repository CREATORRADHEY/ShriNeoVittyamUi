import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en } from "./en";
import { hi } from "./hi";

export const LANGUAGES = [
  { value: "en", label: "English", code: "EN", locale: "en" },
  { value: "hi", label: "\u0939\u093f\u0928\u094d\u0926\u0940", code: "HI", locale: "hi" },
  { value: "mr", label: "\u092e\u0930\u093e\u0920\u0940", code: "MR", locale: "mr" },
  { value: "bn", label: "\u09ac\u09be\u0982\u09b2\u09be", code: "BN", locale: "bn" },
  { value: "gu", label: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0", code: "GU", locale: "gu" },
  { value: "ta", label: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd", code: "TA", locale: "ta" },
  { value: "te", label: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41", code: "TE", locale: "te" },
  { value: "kn", label: "\u0c95\u0ca8\u0ccd\u0ca8\u0ca1", code: "KN", locale: "kn" },
  { value: "or", label: "\u0b13\u0b21\u0b3c\u0b3f\u0b06", code: "OR", locale: "or" },
] as const;

export type Language = (typeof LANGUAGES)[number]["value"];

/* Only English and Hindi are translated today; the remaining scripts fall back
   to English copy while rendering in their own Noto Sans face. */
const dictionaries: Partial<Record<Language, Record<string, string>>> = { en, hi };
const STORAGE_KEY = "shrineo.language";

type I18nValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some((l) => l.value === stored)) setLanguageState(stored as Language);
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      LANGUAGES.find((l) => l.value === language)?.locale ?? language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    if (typeof document !== "undefined") {
      const locale = LANGUAGES.find((l) => l.value === next)?.locale ?? next;
      document.documentElement.lang = locale;
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) =>
      dictionaries[language]?.[key] ?? dictionaries.en?.[key] ?? fallback ?? key,
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
