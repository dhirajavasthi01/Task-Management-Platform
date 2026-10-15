import { GlobalStyles, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router";
import NotificationProvider from "./context/NotificationProvider";
import { router } from "./routes/router";
import { theme } from "./theme/theme";

function App() {
  return (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
