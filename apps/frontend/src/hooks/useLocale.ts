import { useMemo } from "react";

export type Locale = "es" | "en";

/**
 * Returns the current locale based on navigator.language.
 * Defaults to "es" for es-* and "en" for everything else.
 */
export function useLocale(): Locale {
  return useMemo(() => {
    if (typeof navigator === "undefined") return "es";
    const lang = navigator.language?.toLowerCase() ?? "";
    return lang.startsWith("es") ? "es" : "en";
  }, []);
}
