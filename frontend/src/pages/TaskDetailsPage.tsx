import { Button, Card, CardContent, Chip, CircularProgress, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loader from "../components/common/Loader";
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, DeleteIcon, EditIcon } from "../components/common/icons";
import { useNotification } from "../hooks/useNotification";
import { useTask } from "../hooks/useTask";
import { taskService } from "../services/taskService";
import { getErrorMessage } from "../utils/errors";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const id = Number(taskId);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { task, loading, error, notFound, setTask, retry } = useTask(id);
  const [toggling, setToggling] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const backLink = (
    <Button component={Link} to="/tasks" color="inherit" startIcon={<ArrowLeftIcon className="h-4 w-4" />} className="mb-6 text-gray-600">
      Back to tasks
    </Button>
  );

  if (loading) {
    return (
      <div>
        {backLink}
        <Loader variant="detail" count={3} />
      </div>
    );
  }

  if (error && !notFound) {
    return (
      <div>
        {backLink}
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  if (!task) {
    return (
      <div>
        {backLink}
        <EmptyState
          title="Task not found"
          message={`We couldn't find a task with ID "${taskId}". It may have been deleted.`}
          action={
            <Button component={Link} to="/tasks" variant="contained" disableElevation>
              Go to tasks
            </Button>
          }
        />
      </div>
    );
  }

  const handleToggle = async () => {
    setToggling(true);
    try {
      const updated = await taskService.toggleTask(task);
      setTask(updated);
      notify(updated.completed ? "Task marked as completed" : "Task moved back to pending");
    } catch (toggleError) {
      notify(getErrorMessage(toggleError), "error");
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await taskService.deleteTask(task.id);
      notify("Task deleted");
      navigate("/tasks", { replace: true });
    } catch (deleteError) {
      notify(getErrorMessage(deleteError), "error");
      setDeleting(false);
    }
  };

  return (
    <div>
      {backLink}

      <Card elevation={0} className="overflow-hidden rounded-3xl border border-gray-200">
        <div
          className={`h-2 ${
            task.completed
              ? "bg-gradient-to-r from-emerald-400 to-teal-500"
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          }`}
        />
        <CardContent className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Chip
              icon={task.completed ? <CheckCircleIcon className="h-4 w-4" /> : <ClockIcon className="h-4 w-4" />}
              label={task.completed ? "Completed" : "Pending"}
              color={task.completed ? "success" : "warning"}
              className="font-medium"
            />
            <span className="text-sm text-gray-400">Task #{task.id}</span>
          </div>

          <Typography
            variant="h4"
            component="h1"
            className={`mt-4 font-bold tracking-tight ${task.completed ? "text-gray-400 line-through" : "text-gray-900"}`}
          >
            {task.title}
          </Typography>

          <Typography
            className={`mt-4 leading-relaxed whitespace-pre-line ${
              task.description ? "text-gray-600" : "italic text-gray-400"
            }`}
          >
            {task.description ?? "No description provided for this task."}
          </Typography>

          <Divider className="my-8" />

          <div className="flex flex-wrap gap-3">
            <Button
              variant="contained"
              color={task.completed ? "warning" : "success"}
              disableElevation
              onClick={handleToggle}
              disabled={toggling}
              startIcon={
                toggling ? (
                  <CircularProgress size={16} color="inherit" />
                ) : task.completed ? (
                  <ClockIcon className="h-4 w-4" />
                ) : (
                  <CheckCircleIcon className="h-4 w-4" />
                )
              }
            >
              {task.completed ? "Mark as pending" : "Mark as completed"}
            </Button>
            <Button
              component={Link}
              to={`/tasks/${task.id}/edit`}
              variant="outlined"
              startIcon={<EditIcon className="h-4 w-4" />}
            >
              Edit
            </Button>
            <Button
              color="error"
              onClick={() => setConfirmOpen(true)}
              startIcon={<DeleteIcon className="h-4 w-4" />}
              className="sm:ml-auto"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete task?"
        message={`"${task.title}" will be permanently removed. This action cannot be undone.`}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default TaskDetailsPage;
