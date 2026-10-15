import { Card, CardContent, CircularProgress, Skeleton, Typography } from "@mui/material";
import { useMemo } from "react";

interface LoaderProps {
  variant?: "page" | "list" | "detail";
  count?: number;
  message?: string;
}

const Loader = ({ variant = "page", count = 4, message = "Loading..." }: LoaderProps) => {
  const placeholders = useMemo(() => Array.from({ length: count }, (_, index) => index), [count]);

  if (variant === "list") {
    return (
      <ul className="flex flex-col gap-4" aria-busy="true" aria-label={message}>
        {placeholders.map((key) => (
          <li key={key}>
            <Card elevation={0} className="rounded-2xl border border-gray-200">
              <CardContent className="flex items-start gap-4 p-5">
                <Skeleton variant="rounded" width={22} height={22} />
                <div className="flex-1">
                  <Skeleton variant="text" width="55%" height={28} />
                  <Skeleton variant="text" width="85%" />
                </div>
                <Skeleton variant="rounded" width={72} height={24} className="rounded-full" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "detail") {
    return (
      <Card elevation={0} className="rounded-2xl border border-gray-200" aria-busy="true">
        <CardContent className="flex flex-col gap-3 p-8">
          <Skeleton variant="rounded" width={96} height={26} className="rounded-full" />
          <Skeleton variant="text" width="60%" height={44} />
          {placeholders.map((key) => (
            <Skeleton key={key} variant="text" width={`${90 - key * 12}%`} />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4" role="status">
      <CircularProgress size={48} thickness={4} />
      <Typography variant="body2" className="text-gray-500">
        {message}
      </Typography>
    </div>
  );
};

export default Loader;
