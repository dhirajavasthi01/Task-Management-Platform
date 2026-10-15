import { Card, CardContent, Checkbox, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { memo } from "react";
import { Link } from "react-router";
import type { Task } from "../../types/task";
import { DeleteIcon, EditIcon } from "../common/icons";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => (
  <Card
    elevation={0}
    className="group relative overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
  >
    <span
      className={`absolute inset-y-0 left-0 w-1.5 ${task.completed ? "bg-emerald-500" : "bg-indigo-500"}`}
    />

    <CardContent className="flex items-start gap-3 p-5 pl-6 last:pb-5">
      <Checkbox
        checked={task.completed}
        onChange={() => onToggle(task)}
        color="secondary"
        className="-mt-1 -ml-2"
        slotProps={{ input: { "aria-label": `Mark "${task.title}" as ${task.completed ? "pending" : "completed"}` } }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Typography
            component={Link}
            to={`/tasks/${task.id}`}
            variant="subtitle1"
            className={`font-semibold transition-colors hover:text-indigo-600 ${
              task.completed ? "text-gray-400 line-through" : "text-gray-900 no-underline"
            }`}
          >
            {task.title}
          </Typography>
          <Chip
            label={task.completed ? "Completed" : "Pending"}
            color={task.completed ? "success" : "warning"}
            size="small"
            variant="outlined"
            className="font-medium"
          />
        </div>

        <Typography
          variant="body2"
          className={`mt-1 truncate ${task.description ? "text-gray-500" : "italic text-gray-400"}`}
        >
          {task.description ?? "No description"}
        </Typography>
      </div>

      <div className="flex gap-1 opacity-60 transition-opacity group-hover:opacity-100">
        <Tooltip title="Edit">
          <IconButton
            component={Link}
            to={`/tasks/${task.id}/edit`}
            size="small"
            className="hover:text-indigo-600"
            aria-label={`Edit ${task.title}`}
          >
            <EditIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            className="hover:text-red-600"
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
          >
            <DeleteIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </div>
    </CardContent>
  </Card>
);

export default memo(TaskItem);
