/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--cx-color-primary)",
        secondary: "var(--cx-color-secondary)",
        black: "var(--cx-color-black)",
        white: {
          DEFAULT: "var(--cx-color-white)",
          80: "var(--cx-color-white-80)",
        },
        neutral: {
          lighter: "var(--cx-color-neutral-lighter)",
          light: "var(--cx-color-neutral-light)",
          regular: "var(--cx-color-neutral-regular)",
          dark: "var(--cx-color-neutral-dark)",
          darker: "var(--cx-color-neutral-darker)",
        },
        brand: {
          primary: {
            lighter: "var(--cx-color-brand-primary-lighter)",
            light: "var(--cx-color-brand-primary-light)",
            regular: "var(--cx-color-brand-primary-regular)",
            dark: "var(--cx-color-brand-primary-dark)",
            darker: "var(--cx-color-brand-primary-darker)",
          },
          secondary: {
            regular: "var(--cx-color-brand-secondary-regular)",
          },
          tertiary: {
            regular: "var(--cx-color-brand-tertiary-regular)",
          },
        },
        success: {
          lighter: "var(--cx-color-success-lighter)",
          light: "var(--cx-color-success-light)",
          regular: "var(--cx-color-success-regular)",
          dark: "var(--cx-color-success-dark)",
          darker: "var(--cx-color-success-darker)",
        },
        highlight: {
          lighter: "var(--cx-color-highlight-lighter)",
          light: "var(--cx-color-highlight-light)",
          regular: "var(--cx-color-highlight-regular)",
          dark: "var(--cx-color-highlight-dark)",
          darker: "var(--cx-color-highlight-darker)",
        },
        error: {
          lighter: "var(--cx-color-error-lighter)",
          light: "var(--cx-color-error-light)",
          regular: "var(--cx-color-error-regular)",
          dark: "var(--cx-color-error-dark)",
          darker: "var(--cx-color-error-darker)",
        },
        warning: {
          lighter: "var(--cx-color-warning-lighter)",
          light: "var(--cx-color-warning-light)",
          regular: "var(--cx-color-warning-regular)",
          dark: "var(--cx-color-warning-dark)",
          darker: "var(--cx-color-warning-darker)",
        },
        text: {
          primary: "var(--cx-color-black)",
          secondary: "var(--cx-color-neutral-darker)",
          tertiary: "var(--cx-color-neutral-dark)",
          inverse: "var(--cx-color-white)",
          brand: "var(--cx-color-brand-primary-regular)",
          success: "var(--cx-color-success-dark)",
          highlight: "var(--cx-color-highlight-dark)",
          error: "var(--cx-color-error-dark)",
          "subtle-dark": "var(--cx-color-subtle-dark)",
        },
        gradient: {
          lighter: "var(--cx-color-gradient-lighter)",
          light: "var(--cx-color-gradient-light)",
          dark: "var(--cx-color-gradient-dark)",
        },
        background: {
          default: "var(--cx-color-white)",
          secondary: "var(--cx-color-neutral-lighter)",
          tertiary: "var(--cx-color-neutral-light)",
          inverse: "var(--cx-color-black)",
          brand: "var(--cx-color-brand-primary-regular)",
          success: "var(--cx-color-success-regular)",
          highlight: "var(--cx-color-highlight-regular)",
          warning: "var(--cx-color-warning-regular)",
          error: "var(--cx-color-error-regular)",
          overlay: {
            primary: "var(--cx-color-black-seethrough)",
            dark: "var(--cx-color-overlay-dark)",
          },
        },
        stroke: {
          primary: "var(--cx-color-neutral-light)",
          secondary: "var(--cx-color-neutral-regular)",
          tertiary: "var(--cx-color-neutral-dark)",
          brand: "var(--cx-color-brand-primary-regular)",
          success: "var(--cx-color-success-regular)",
          highlight: "var(--cx-color-highlight-regular)",
          warning: "var(--cx-color-warning-regular)",
          error: "var(--cx-color-error-regular)",
        },
        interaction: {
          button: {
            primary: {
              default: "var(--cx-color-brand-primary-regular)",
              hover: "var(--cx-color-brand-primary-dark)",
              pressed: "var(--cx-color-brand-primary-darker)",
              inverse: "var(--cx-color-white)",
              disabled: "var(--cx-color-neutral-light)",
            },
            secondary: {
              default: "var(--cx-color-brand-primary-regular)",
              hover: "var(--cx-color-brand-primary-dark)",
              pressed: "var(--cx-color-brand-primary-darker)",
              inverse: "var(--cx-color-white)",
              disabled: "var(--cx-color-neutral-light)",
            },
            text: {
              default: "var(--cx-color-brand-primary-regular)",
              hover: "var(--cx-color-brand-primary-dark)",
              pressed: "var(--cx-color-brand-primary-darker)",
              inverse: "var(--cx-color-white)",
              disabled: "var(--cx-color-neutral-darker)",
            },
          },
        },
        shadow: {
          primary: "var(--cx-color-neutral-darker)",
          secondary: "var(--cx-color-neutral-dark)",
        },
      },
      borderRadius: {
        btn: "var(--cx-border-radius-button)",
        base: "var(--cx-border-radius-default)",
        checkbox: "var(--cx-border-radius-checkbox)",
        modal: "var(--cx-border-radius-modal)",
        card: "var(--cx-border-radius-card)",
        alert: "var(--cx-border-radius-alert)",
      },
      fontFamily: {
        sans: ["var(--cx-font-default)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: "0.688rem",
        s: "0.875rem",
        "3xl": "2rem",
        "5xl": "2.75rem",
        label: "1rem",
      },
      backgroundImage: {
        tick: "url('/src/assets/icons/tick.svg')",
      },
      boxShadow: {
        base: "var(--cx-box-shadow-default)",
        modal: "var(--cx-box-shadow-modal)",
        tab: "var(--cx-box-shadow-tab)",
      },
      text: {
        xs: "12px",
      },
      borderWidth: {
        1.5: "1.5px",
        0.5: "0.5px",
      },
    },
  },
};
