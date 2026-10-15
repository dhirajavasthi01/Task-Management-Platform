import { lazy } from "react";

export const DashboardPage = lazy(() => import("../pages/DashboardPage"));
export const TasksPage = lazy(() => import("../pages/TasksPage"));
export const TaskDetailsPage = lazy(() => import("../pages/TaskDetailsPage"));
export const CreateTaskPage = lazy(() => import("../pages/CreateTaskPage"));
export const EditTaskPage = lazy(() => import("../pages/EditTaskPage"));
export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
