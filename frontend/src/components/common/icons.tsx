import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const createIcon = (paths: ReactNode) => {
  const Icon = ({ className = "h-5 w-5", ...props }: IconProps) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths}
    </svg>
  );
  return Icon;
};

export const DashboardIcon = createIcon(
  <>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </>,
);

export const ListIcon = createIcon(
  <>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3 6h.01M3 12h.01M3 18h.01" />
  </>,
);

export const PlusIcon = createIcon(<path d="M12 5v14M5 12h14" />);

export const EditIcon = createIcon(
  <>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </>,
);

export const DeleteIcon = createIcon(<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />);

export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </>,
);

export const CheckCircleIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </>,
);

export const ClockIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);

export const ArrowLeftIcon = createIcon(<path d="M19 12H5M12 19l-7-7 7-7" />);

export const RefreshIcon = createIcon(
  <>
    <path d="M21 12a9 9 0 1 1-2.6-6.4" />
    <path d="M21 3v6h-6" />
  </>,
);

export const InboxIcon = createIcon(
  <>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6Z" />
  </>,
);

export const MenuIcon = createIcon(<path d="M3 6h18M3 12h18M3 18h18" />);
