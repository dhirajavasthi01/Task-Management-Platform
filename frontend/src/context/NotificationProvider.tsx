import { Alert, Snackbar } from "@mui/material";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { NotificationContext, type NotificationSeverity } from "./NotificationContext";

interface Notification {
  key: number;
  message: string;
  severity: NotificationSeverity;
}

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);

  const notify = useCallback((message: string, severity: NotificationSeverity = "success") => {
    setNotification({ key: Date.now(), message, severity });
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        key={notification?.key}
        open={open}
        autoHideDuration={3000}
        onClose={(_, reason) => reason !== "clickaway" && setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={notification?.severity ?? "success"}
          variant="filled"
          className="w-full shadow-lg"
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
