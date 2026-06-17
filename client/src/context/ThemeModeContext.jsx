import { useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeModeContext } from "./theme";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#0f766e",
    },
    background:
      mode === "light"
        ? {
            default: "#f8fafc",
            paper: "#ffffff",
          }
        : {
            default: "#0f172a",
            paper: "#111827",
          },
    text:
      mode === "light"
        ? {
            primary: "#0f172a",
            secondary: "#64748b",
          }
        : {
            primary: "#f8fafc",
            secondary: "#cbd5e1",
          },
    divider:
      mode === "light"
        ? "rgba(148, 163, 184, 0.24)"
        : "rgba(148, 163, 184, 0.22)",
    action: {
      hover:
        mode === "light"
          ? "rgba(37, 99, 235, 0.08)"
          : "rgba(96, 165, 250, 0.12)",
      selected:
        mode === "light"
          ? "rgba(37, 99, 235, 0.1)"
          : "rgba(96, 165, 250, 0.16)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 42,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

export const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("patrachar-theme-mode") || "light",
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const value = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("patrachar-theme-mode", next);
          return next;
        }),
    }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
