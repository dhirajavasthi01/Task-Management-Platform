import { Button, LinearProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import { PlusIcon } from "../components/common/icons";
import TaskList from "../components/tasks/TaskList";
import TaskStats from "../components/tasks/TaskStats";
import { useTaskActions } from "../hooks/useTaskActions";
import { useTasks } from "../hooks/useTasks";

const RECENT_LIMIT = 4;

const DashboardPage = () => {
  const { tasks, stats, loading, error, refresh, replaceTask, removeTask } = useTasks();
  const { toggle, requestDelete, deleteDialogProps } = useTaskActions({
    onUpdated: replaceTask,
    onDeleted: removeTask,
  });

  const upNext = useMemo(() => tasks.filter((task) => !task.completed).slice(0, RECENT_LIMIT), [tasks]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div>
            <Typography variant="h4" component="h1" className="font-bold">
              {greeting} 👋
            </Typography>
            <Typography className="mt-2 text-white/80">
              {loading
                ? "Fetching your tasks..."
                : stats.pending === 0
                  ? "You're all caught up. Great work!"
                  : `You have ${stats.pending} pending task${stats.pending === 1 ? "" : "s"} today.`}
            </Typography>
          </div>
          <Button
            component={Link}
            to="/tasks/new"
            variant="contained"
            disableElevation
            startIcon={<PlusIcon className="h-4 w-4" />}
            className="bg-white px-5 font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            New task
          </Button>
        </div>

        <div className="relative mt-8">
          <div className="mb-2 flex justify-between text-sm text-white/80">
            <span>Overall progress</span>
            <span className="font-semibold text-white">{loading ? "--" : `${stats.progress}%`}</span>
          </div>
          <LinearProgress
            variant={loading ? "indeterminate" : "determinate"}
            value={stats.progress}
            className="h-2.5 rounded-full bg-white/25"
            sx={{ "& .MuiLinearProgress-bar": { backgroundColor: "#fff", borderRadius: 9999 } }}
          />
        </div>
      </section>

      <TaskStats stats={stats} loading={loading} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h6" component="h2" className="font-semibold text-gray-900">
            Up next
          </Typography>
          <Button component={Link} to="/tasks" size="small">
            View all tasks
          </Button>
        </div>

        {error ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : (
          <TaskList
            tasks={upNext}
            loading={loading}
            skeletonCount={RECENT_LIMIT}
            onToggle={toggle}
            onDelete={requestDelete}
            emptyState={
              <EmptyState
                title="Nothing pending"
                message="Every task is complete. Create a new one to keep the momentum going."
                action={
                  <Button component={Link} to="/tasks/new" variant="outlined">
                    Create task
                  </Button>
                }
              />
            }
          />
        )}
      </section>

      <ConfirmDialog {...deleteDialogProps} />
    </div>
  );
};

export default DashboardPage;
