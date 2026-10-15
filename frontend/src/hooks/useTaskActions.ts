import { useCallback, useState } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import { getErrorMessage } from "../utils/errors";
import { useNotification } from "./useNotification";

interface UseTaskActionsOptions {
  onUpdated: (task: Task) => void;
  onDeleted: (id: number) => void;
}

export const useTaskActions = ({ onUpdated, onDeleted }: UseTaskActionsOptions) => {
  const { notify } = useNotification();
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);

  const toggle = useCallback(
    async (task: Task) => {
      onUpdated({ ...task, completed: !task.completed });
      try {
        const updated = await taskService.toggleTask(task);
        onUpdated(updated);
        notify(updated.completed ? "Task marked as completed" : "Task moved back to pending");
      } catch (error) {
        onUpdated(task);
        notify(getErrorMessage(error), "error");
      }
    },
    [onUpdated, notify],
  );

  const confirmDelete = useCallback(async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await taskService.deleteTask(pendingDelete.id);
      onDeleted(pendingDelete.id);
      notify("Task deleted");
      setPendingDelete(null);
    } catch (error) {
      notify(getErrorMessage(error), "error");
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete, onDeleted, notify]);

  return {
    toggle,
    requestDelete: setPendingDelete,
    deleteDialogProps: {
      open: pendingDelete !== null,
      title: "Delete task?",
      message: `"${pendingDelete?.title ?? ""}" will be permanently removed. This action cannot be undone.`,
      loading: deleting,
      onConfirm: confirmDelete,
      onClose: () => setPendingDelete(null),
    },
  };
};
