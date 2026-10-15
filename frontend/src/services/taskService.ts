import type { Task } from "../types/task";
import { apiClient } from "./apiClient";

export type TaskInput = Omit<Task, "id">;

const TASKS_PATH = "/tasks";

export const taskService = {
  getTasks: () => apiClient.get<Task[]>(TASKS_PATH),

  getTaskById: (id: number) => apiClient.get<Task>(`${TASKS_PATH}/${id}`),

  createTask: (input: TaskInput) => apiClient.post<Task>(TASKS_PATH, input),

  updateTask: (id: number, input: Partial<TaskInput>) => apiClient.patch<Task>(`${TASKS_PATH}/${id}`, input),

  toggleTask: (task: Task) => apiClient.patch<Task>(`${TASKS_PATH}/${task.id}`, { completed: !task.completed }),

  deleteTask: (id: number) => apiClient.delete(`${TASKS_PATH}/${id}`),
};
