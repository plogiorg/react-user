export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AppThemeConfig = DeepPartial<{
  colors: {
    neutral: {
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
    };
    primary: {
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
      secondary: string;
      tertiary: string;
    };
    success: {
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
    };
    highlight: {
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
    };
    error: {
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
    };
    warning: {
      lighter: string;
      light: string;
      regular: string;
      dark: string;
      darker: string;
    };
  };
  borderRadius: {
    default: string;
    checkbox: string;
    modal: string;
    card: string;
    alert: string;
  };
  font: {
    default: string;
  };
}>;
