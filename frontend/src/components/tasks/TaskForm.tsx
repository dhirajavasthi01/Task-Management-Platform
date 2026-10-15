import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useMemo, useState, type FormEvent } from "react";
import type { TaskInput } from "../../services/taskService";

const TITLE_MAX = 200;
const DESCRIPTION_MAX = 500;

const emptyTask: TaskInput = { title: "", description: null, completed: false };

interface TaskFormProps {
  initialValues?: TaskInput;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (input: TaskInput) => void;
  onCancel: () => void;
}

const TaskForm = ({ initialValues = emptyTask, submitLabel, submitting, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description ?? "");
  const [completed, setCompleted] = useState(initialValues.completed);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const trimmed = title.trim();
    return {
      title: !trimmed
        ? "Title is required"
        : trimmed.length > TITLE_MAX
          ? `Title must be ${TITLE_MAX} characters or less`
          : null,
      description:
        description.length > DESCRIPTION_MAX ? `Description must be ${DESCRIPTION_MAX} characters or less` : null,
    };
  }, [title, description]);

  const hasErrors = Boolean(errors.title || errors.description);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (hasErrors) return;
    onSubmit({ title: title.trim(), description: description.trim() || null, completed });
  };

  return (
    <Card elevation={0} className="rounded-2xl border border-gray-200">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={() => setTouched(true)}
            error={touched && Boolean(errors.title)}
            helperText={(touched && errors.title) || `${title.trim().length}/${TITLE_MAX}`}
            placeholder="e.g. Prepare sprint demo"
            required
            fullWidth
            autoFocus
            disabled={submitting}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={Boolean(errors.description)}
            helperText={errors.description ?? `${description.length}/${DESCRIPTION_MAX} (optional)`}
            placeholder="Add more details about this task"
            multiline
            minRows={4}
            fullWidth
            disabled={submitting}
          />

          <FormControlLabel
            control={
              <Switch
                checked={completed}
                onChange={(event) => setCompleted(event.target.checked)}
                color="success"
                disabled={submitting}
              />
            }
            label={completed ? "Marked as completed" : "Marked as pending"}
          />

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <Button onClick={onCancel} color="inherit" disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={submitting || (touched && hasErrors)}
              startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : undefined}
              className="px-6"
            >
              {submitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
