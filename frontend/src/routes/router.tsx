import { createBrowserRouter } from "react-router";
import AppLayout from "../components/layout/AppLayout";
import RouteErrorPage from "../pages/RouteErrorPage";
import {
  CreateTaskPage,
  DashboardPage,
  EditTaskPage,
  NotFoundPage,
  TaskDetailsPage,
  TasksPage,
} from "./lazyPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: "tasks",
        children: [
          { index: true, element: <TasksPage /> },
          { path: "new", element: <CreateTaskPage /> },
          { path: ":taskId", element: <TaskDetailsPage /> },
          { path: ":taskId/edit", element: <EditTaskPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
