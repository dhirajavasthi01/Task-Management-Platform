import { Avatar, Button, Drawer, IconButton, Typography } from "@mui/material";
import { Suspense, useState, type ComponentType, type SVGProps } from "react";
import { Link, NavLink, Outlet } from "react-router";
import Loader from "../common/Loader";
import { CheckCircleIcon, DashboardIcon, ListIcon, MenuIcon, PlusIcon } from "../common/icons";

interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  end?: boolean;
}

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: DashboardIcon, end: true },
  { label: "All tasks", to: "/tasks", icon: ListIcon, end: true },
  { label: "New task", to: "/tasks/new", icon: PlusIcon },
];

const Brand = () => (
  <Link to="/" className="flex items-center gap-3 no-underline">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-md">
      <CheckCircleIcon className="h-6 w-6" />
    </div>
    <Typography variant="h6" className="font-bold tracking-tight text-gray-900">
      TaskFlow
    </Typography>
  </Link>
);

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className="flex h-full flex-col gap-8 p-6">
    <Brand />

    <nav className="flex flex-col gap-1">
      {navItems.map(({ label, to, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium no-underline transition-colors ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>

    <div className="mt-auto flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
      <Avatar className="bg-indigo-500">JD</Avatar>
      <div className="min-w-0">
        <Typography variant="body2" className="truncate font-semibold text-gray-900">
          John Doe
        </Typography>
        <Typography variant="caption" className="truncate text-gray-500">
          john@taskflow.dev
        </Typography>
      </div>
    </div>
  </div>
);

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white lg:block">
        <SidebarContent />
      </aside>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} className="lg:hidden">
        <div className="w-64">
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </div>
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
          <IconButton onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <MenuIcon />
          </IconButton>
          <Brand />
          <Button component={Link} to="/tasks/new" size="small" variant="contained" disableElevation>
            New
          </Button>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
          <Suspense fallback={<Loader message="Loading page..." />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
