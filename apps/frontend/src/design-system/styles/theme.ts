const theme = {
  border: {
    width: {
      thin: "0.0625rem", // 1px
      medium: "0.125rem", // 2px
      thick: "0.25rem", // 4px
    },
    style: {
      // TODO remove
      solid: "solid",
      dashed: "dashed",
      dotted: "dotted",
      none: "none",
    },
    radius: {
      sm: "0.25rem", // 4px
      md: "0.5rem", // 8px
      lg: "1rem", // 16px
      xl: "1.75rem", // 28px
      full: "9999px", // 100%
    },
  },
  // TODO check if secondary and disruptive are distinct enough, choose different secondary?
  color: {
    primary: "#1fcc79",
    "primary-light": "#e3fff8",
    "primary-dark": "#1bb169",
    secondary: "#ff8080",
    "secondary-light": "#ffcccc",
    "secondary-dark": "#e66666",
    "secondary-hover": "#d95454",
    disruptive: "#ff0000",
    "disruptive-dark": "#cc0000",
    "main-text": "#3e5481",
    "secondary-text": "#9fa5c0",
    outline: "#d0dbea",
    disabled: "#f4f5f7",
    "dark-gray": "#666666",
    ochre: "#ffbf10",
    orange: "#ff8c00",
    green: "#48b376",
    black: "#000000",
    white: "#ffffff",
    none: "transparent",
  },
  spacing: {
    none: 0, // 0px
    xxs: "0.25rem", // 4px
    xs: "0.5rem", // 8px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },
  font: {
    family: {
      text: '"Inter", sans-serif',
    },
    size: {
      xxs: "0.75rem", // 12px
      xs: "0.875rem", // 14px
      sm: "1rem", // 16px
      md: "1.125rem", // 18px
      lg: "1.25rem", // 20px
      xl: "1.5rem", // 24px
      xxl: "2rem", // 32px
    },
    weight: {
      light: 300,
      medium: 500,
      bold: 700,
    },
  },
};

export default theme;
