import { useState } from "react";
import { useNavigate } from "react-router";
import PageHeader from "../components/common/PageHeader";
import TaskForm from "../components/tasks/TaskForm";
import { useNotification } from "../hooks/useNotification";
import { taskService, type TaskInput } from "../services/taskService";
import { getErrorMessage } from "../utils/errors";

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (input: TaskInput) => {
    setSubmitting(true);
    try {
      const task = await taskService.createTask(input);
      notify("Task created successfully");
      navigate(`/tasks/${task.id}`);
    } catch (error) {
      notify(getErrorMessage(error), "error");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Create task" subtitle="Add a new task to your board." />
      <TaskForm submitLabel="Create task" submitting={submitting} onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </div>
  );
};

export default CreateTaskPage;
