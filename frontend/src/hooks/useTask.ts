import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/apiClient";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import { getErrorMessage } from "../utils/errors";

interface TaskResult {
  id: number;
  requestId: number;
  task: Task | null;
  error: string | null;
  notFound: boolean;
}

export const useTask = (id: number) => {
  const [requestId, setRequestId] = useState(0);
  const [result, setResult] = useState<TaskResult | null>(null);

  useEffect(() => {
    let active = true;
    const request = Number.isInteger(id) && id > 0
      ? taskService.getTaskById(id)
      : Promise.reject(new ApiError("Task not found", 404));

    request
      .then((task) => active && setResult({ id, requestId, task, error: null, notFound: false }))
      .catch(
        (error: unknown) =>
          active &&
          setResult({
            id,
            requestId,
            task: null,
            error: getErrorMessage(error),
            notFound: error instanceof ApiError && error.status === 404,
          }),
      );
    return () => {
      active = false;
    };
  }, [id, requestId]);

  const setTask = useCallback(
    (task: Task) => setResult((prev) => ({ id: task.id, requestId: prev?.requestId ?? 0, task, error: null, notFound: false })),
    [],
  );

  const retry = useCallback(() => setRequestId((value) => value + 1), []);

  const current = result?.id === id && result.requestId === requestId ? result : null;

  return {
    task: current?.task ?? null,
    error: current?.error ?? null,
    notFound: current?.notFound ?? false,
    loading: current === null,
    setTask,
    retry,
  };
};
