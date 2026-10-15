import { Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <Typography variant="h4" component="h1" className="font-bold tracking-tight text-gray-900">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" className="mt-1 text-gray-500">
          {subtitle}
        </Typography>
      )}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export default PageHeader;
