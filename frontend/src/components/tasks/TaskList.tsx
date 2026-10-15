import type { ReactNode } from "react";
import type { Task } from "../../types/task";
import Loader from "../common/Loader";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  skeletonCount?: number;
  emptyState: ReactNode;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskList = ({ tasks, loading, skeletonCount = 4, emptyState, onToggle, onDelete }: TaskListProps) => {
  if (loading) {
    return <Loader variant="list" count={skeletonCount} message="Loading tasks" />;
  }

  if (tasks.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
