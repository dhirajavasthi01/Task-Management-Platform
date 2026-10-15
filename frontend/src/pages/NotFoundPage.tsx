import { Button, Typography } from "@mui/material";
import { Link } from "react-router";

const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <Typography className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-8xl font-extrabold text-transparent">
      404
    </Typography>
    <Typography variant="h5" component="h1" className="mt-4 font-semibold text-gray-900">
      Page not found
    </Typography>
    <Typography className="mt-2 max-w-md text-gray-500">
      The page you are looking for doesn't exist or has been moved.
    </Typography>
    <Button component={Link} to="/" variant="contained" disableElevation className="mt-8">
      Back to dashboard
    </Button>
  </div>
);

export default NotFoundPage;
