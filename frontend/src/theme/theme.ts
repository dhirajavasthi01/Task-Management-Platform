import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#4f46e5" },
    secondary: { main: "#9333ea" },
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
    error: { main: "#ef4444" },
    background: { default: "#f8fafc" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", system-ui, "Segoe UI", Roboto, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
  },
});
