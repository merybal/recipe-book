import React from "react";
import theme from "./src/styles/theme";

type ThemeValue = string | number;
type ThemeObject = {
  [key: string]: ThemeValue | ThemeObject;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  function flattenTheme(
    obj: ThemeObject,
    prefix = "--"
  ): Record<string, string> {
    const result: Record<string, string> = {};

    for (const key in obj) {
      const value = obj[key];
      const newPrefix = `${prefix}${key}`;

      if (typeof value === "object" && value !== null) {
        Object.assign(result, flattenTheme(value, `${newPrefix}-`));
      } else {
        result[newPrefix] = String(value);
      }
    }

    return result;
  }

  const cssVars = flattenTheme(theme);

  return <div style={cssVars as React.CSSProperties}>{children}</div>;
};

export default ThemeProvider;
