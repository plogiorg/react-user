import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeContextProvider } from "./contexts";
import App from "./App.tsx";

import "./index.css";
import { extendTheme } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";

const client = new QueryClient();

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: { surface: "#FDF0D1"},
        text: {primary: "#0A1D56"},
        primary: {
          600: "#0A1D56",
          solidHoverBg: "#492E87",
          solidBg:  "#0A1D56",
          solidColor: "#FDF0D1"
        },
        neutral: {
          softBg: "#FDF0D1"
        },


      },
    },
    dark: {
      palette: {
      },
    },
  },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <CssVarsProvider theme={theme}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
        </CssVarsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
