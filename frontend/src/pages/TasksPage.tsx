import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import ConfirmDialog from "../components/common/ConfirmDialog";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import PageHeader from "../components/common/PageHeader";
import { PlusIcon, RefreshIcon, SearchIcon } from "../components/common/icons";
import TaskList from "../components/tasks/TaskList";
import { useTaskActions } from "../hooks/useTaskActions";
import { useTasks } from "../hooks/useTasks";

const STATUS_FILTERS = ["all", "pending", "completed"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const isStatusFilter = (value: string | null): value is StatusFilter =>
  STATUS_FILTERS.includes(value as StatusFilter);

const TasksPage = () => {
  const { tasks, stats, loading, error, refresh, replaceTask, removeTask } = useTasks();
  const { toggle, requestDelete, deleteDialogProps } = useTaskActions({
    onUpdated: replaceTask,
    onDeleted: removeTask,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const statusParam = searchParams.get("status");
  const status: StatusFilter = isStatusFilter(statusParam) ? statusParam : "all";

  const updateParam = (key: string, value: string, defaultValue: string) => {
    setSearchParams(
      (params) => {
        const next = new URLSearchParams(params);
        if (value === defaultValue) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  };

  const filteredTasks = useMemo(() => {
    const term = query.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesStatus =
        status === "all" || (status === "completed" ? task.completed : !task.completed);
      const matchesQuery =
        !term ||
        task.title.toLowerCase().includes(term) ||
        (task.description?.toLowerCase().includes(term) ?? false);
      return matchesStatus && matchesQuery;
    });
  }, [tasks, query, status]);

  const filterCounts = useMemo<Record<StatusFilter, number>>(
    () => ({ all: stats.total, pending: stats.pending, completed: stats.completed }),
    [stats],
  );

  const isFiltered = query.trim() !== "" || status !== "all";

  return (
    <div>
      <PageHeader
        title="All tasks"
        subtitle="Search, filter and manage everything on your plate."
        actions={
          <>
            <Tooltip title="Refresh">
              <span>
                <IconButton onClick={refresh} disabled={loading} aria-label="Refresh tasks">
                  <RefreshIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
                </IconButton>
              </span>
            </Tooltip>
            <Button
              component={Link}
              to="/tasks/new"
              variant="contained"
              disableElevation
              startIcon={<PlusIcon className="h-4 w-4" />}
            >
              New task
            </Button>
          </>
        }
      />

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 md:flex-row md:items-center">
        <TextField
          value={query}
          onChange={(event) => updateParam("q", event.target.value, "")}
          placeholder="Search by title or description"
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </InputAdornment>
              ),
            },
          }}
        />
        <ToggleButtonGroup
          value={status}
          exclusive
          size="small"
          color="primary"
          onChange={(_, value: StatusFilter | null) => value && updateParam("status", value, "all")}
          className="shrink-0"
        >
          {STATUS_FILTERS.map((filter) => (
            <ToggleButton key={filter} value={filter} className="gap-2 px-4 capitalize">
              {filter}
              <span className="rounded-full bg-gray-100 px-2 text-xs text-gray-600">
                {loading ? "-" : filterCounts[filter]}
              </span>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <TaskList
          tasks={filteredTasks}
          loading={loading}
          onToggle={toggle}
          onDelete={requestDelete}
          emptyState={
            isFiltered ? (
              <EmptyState
                title="No matching tasks"
                message="Try a different search term or status filter."
                action={
                  <Button variant="outlined" onClick={() => setSearchParams({}, { replace: true })}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <EmptyState
                title="No tasks yet"
                message="Create your first task to get started."
                action={
                  <Button component={Link} to="/tasks/new" variant="contained" disableElevation>
                    Create task
                  </Button>
                }
              />
            )
          }
        />
      )}

      <ConfirmDialog {...deleteDialogProps} />
    </div>
  );
};

export default TasksPage;
