import { useCallback, useEffect, useMemo, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import { getErrorMessage } from "../utils/errors";

interface TasksResult {
  requestId: number;
  tasks: Task[];
  error: string | null;
}

export interface TaskSummary {
  total: number;
  completed: number;
  pending: number;
  progress: number;
}

export const useTasks = () => {
  const [requestId, setRequestId] = useState(0);
  const [result, setResult] = useState<TasksResult | null>(null);

  useEffect(() => {
    let active = true;
    taskService
      .getTasks()
      .then((tasks) => active && setResult({ requestId, tasks, error: null }))
      .catch((error: unknown) =>
        active && setResult({ requestId, tasks: [], error: getErrorMessage(error) }),
      );
    return () => {
      active = false;
    };
  }, [requestId]);

  const loading = result?.requestId !== requestId;
  const tasks = useMemo(() => result?.tasks ?? [], [result]);

  const stats = useMemo<TaskSummary>(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    return {
      total,
      completed,
      pending: total - completed,
      progress: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [tasks]);

  const replaceTask = useCallback((updated: Task) => {
    setResult((prev) =>
      prev && { ...prev, tasks: prev.tasks.map((task) => (task.id === updated.id ? updated : task)) },
    );
  }, []);

  const removeTask = useCallback((id: number) => {
    setResult((prev) => prev && { ...prev, tasks: prev.tasks.filter((task) => task.id !== id) });
  }, []);

  const refresh = useCallback(() => setRequestId((id) => id + 1), []);

  return { tasks, stats, loading, error: result?.error ?? null, refresh, replaceTask, removeTask };
};
