import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import {Provider} from 'react-redux';
import store from "./redux/store.js";
import { AppThemeProvider } from "./context/ThemeModeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <AppThemeProvider>
          <CssBaseline />
          <div onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </AppThemeProvider>
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
