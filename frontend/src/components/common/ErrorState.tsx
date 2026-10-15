import { Alert, AlertTitle, Button } from "@mui/material";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Alert
    severity="error"
    variant="outlined"
    className="rounded-2xl bg-white"
    action={
      <Button color="inherit" size="small" onClick={onRetry}>
        Retry
      </Button>
    }
  >
    <AlertTitle>Couldn't load data</AlertTitle>
    {message}
  </Alert>
);

export default ErrorState;
