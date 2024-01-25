import { FC, ReactNode, createContext, useContext } from "react";
import { AppThemeConfig } from "../../types";

export const createTheme = (themeConfig: AppThemeConfig) => {
  return {
    "--color-neutral-lighter": themeConfig.colors?.neutral?.lighter,
    "--color-neutral-light": themeConfig.colors?.neutral?.light,
    "--color-neutral-regular": themeConfig.colors?.neutral?.regular,
    "--color-neutral-dark": themeConfig.colors?.neutral?.dark,
    "--color-neutral-darker": themeConfig.colors?.neutral?.darker,
    "--color-brand-primary-lighter": themeConfig.colors?.primary?.lighter,
    "--color-brand-primary-light": themeConfig.colors?.primary?.light,
    "--color-brand-primary-regular": themeConfig.colors?.primary?.regular,
    "--color-brand-primary-dark": themeConfig.colors?.primary?.dark,
    "--color-brand-primary-darker": themeConfig.colors?.primary?.darker,
    "--color-brand-secondary-regular": themeConfig.colors?.primary?.secondary,
    "--color-brand-tertiary-regular": themeConfig.colors?.primary?.tertiary,
    "--color-success-lighter": themeConfig.colors?.success?.lighter,
    "--color-success-light": themeConfig.colors?.success?.light,
    "--color-success-regular": themeConfig.colors?.success?.regular,
    "--color-success-dark": themeConfig.colors?.success?.dark,
    "--color-success-darker": themeConfig.colors?.success?.darker,
    "--color-highlight-lighter": themeConfig.colors?.highlight?.lighter,
    "--color-highlight-light": themeConfig.colors?.highlight?.light,
    "--color-highlight-regular": themeConfig.colors?.highlight?.regular,
    "--color-highlight-dark": themeConfig.colors?.highlight?.dark,
    "--color-highlight-darker": themeConfig.colors?.highlight?.darker,
    "--color-error-lighter": themeConfig.colors?.error?.lighter,
    "--color-error-light": themeConfig.colors?.error?.light,
    "--color-error-regular": themeConfig.colors?.error?.regular,
    "--color-error-dark": themeConfig.colors?.error?.dark,
    "--color-error-darker": themeConfig.colors?.error?.darker,
    "--color-warning-lighter": themeConfig.colors?.warning?.lighter,
    "--color-warning-light": themeConfig.colors?.warning?.light,
    "--color-warning-regular": themeConfig.colors?.warning?.regular,
    "--color-warning-dark": themeConfig.colors?.warning?.dark,
    "--color-warning-darker": themeConfig.colors?.warning?.darker,
    "--border-radius-default": themeConfig.borderRadius?.default,
    "--border-radius-checkbox": themeConfig.borderRadius?.checkbox,
    "--border-radius-modal": themeConfig.borderRadius?.modal,
    "--border-radius-card": themeConfig.borderRadius?.card,
    "--border-radius-alert": themeConfig.borderRadius?.alert,
    "--font-default": themeConfig.font?.default,
  };
};

type ThemeContextState = {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    success: string;
    highlight: string;
    error: string;
    warning: string;
  };
};

const initialValues: ThemeContextState = {
  colors: {
    primary: "",
    secondary: "",
    tertiary: "",
    neutral: "",
    success: "",
    highlight: "",
    error: "",
    warning: "",
  },
};

const ThemeContext = createContext(initialValues);

type Props = {
  children: ReactNode;
};

export const ThemeContextProvider: FC<Props> = ({ children }) => {
  return (
    <ThemeContext.Provider value={initialValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
