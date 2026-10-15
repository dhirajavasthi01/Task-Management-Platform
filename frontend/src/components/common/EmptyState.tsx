import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { InboxIcon } from "./icons";

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

const EmptyState = ({ title, message, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
      <InboxIcon className="h-8 w-8" />
    </div>
    <Typography variant="h6" className="font-semibold text-gray-900">
      {title}
    </Typography>
    {message && (
      <Typography variant="body2" className="mt-1 max-w-sm text-gray-500">
        {message}
      </Typography>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
