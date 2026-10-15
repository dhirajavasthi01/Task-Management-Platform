import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Loader from "../components/common/Loader";
import PageHeader from "../components/common/PageHeader";
import TaskForm from "../components/tasks/TaskForm";
import { useNotification } from "../hooks/useNotification";
import { useTask } from "../hooks/useTask";
import { taskService, type TaskInput } from "../services/taskService";
import { getErrorMessage } from "../utils/errors";

const EditTaskPage = () => {
  const { taskId } = useParams();
  const id = Number(taskId);
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { task, loading, error, notFound, retry } = useTask(id);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (input: TaskInput) => {
    setSubmitting(true);
    try {
      await taskService.updateTask(id, input);
      notify("Task updated successfully");
      navigate(`/tasks/${id}`);
    } catch (submitError) {
      notify(getErrorMessage(submitError), "error");
      setSubmitting(false);
    }
  };

  const renderContent = () => {
    if (loading) return <Loader variant="detail" count={4} />;
    if (error && !notFound) return <ErrorState message={error} onRetry={retry} />;
    if (!task) {
      return (
        <EmptyState
          title="Task not found"
          message="This task may have been deleted."
          action={
            <Button component={Link} to="/tasks" variant="contained" disableElevation>
              Go to tasks
            </Button>
          }
        />
      );
    }
    return (
      <TaskForm
        key={task.id}
        initialValues={{ title: task.title, description: task.description, completed: task.completed }}
        submitLabel="Save changes"
        submitting={submitting}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Edit task" subtitle="Update the details of this task." />
      {renderContent()}
    </div>
  );
};

export default EditTaskPage;
