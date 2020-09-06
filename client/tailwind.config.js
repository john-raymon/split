const uiLibraryTailwindConfig = require("@chec/ui-library/tailwind.config.js");

module.exports = {
  theme: {
    fontFamily: {
      mont: ["Montserrat"]
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "7rem",
      "10xl": "8rem"
    },
    extend: {
      borderRadius: {
        xl: "1.5rem",
        full: "9999px",
        ...uiLibraryTailwindConfig.theme.extend.borderRadius
      }
    }
  },
  variants: {
    transitionProperty: ["responsive", "hover", "focus"]
  }
};
