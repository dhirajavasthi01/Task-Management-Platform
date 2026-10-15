import { Button, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router";

const RouteErrorPage = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "An unexpected error occurred.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <Typography variant="h4" component="h1" className="font-bold text-gray-900">
        Something went wrong
      </Typography>
      <Typography className="mt-2 max-w-md text-gray-500">{message}</Typography>
      <Button href="/" variant="contained" disableElevation className="mt-8">
        Reload app
      </Button>
    </div>
  );
};

export default RouteErrorPage;
