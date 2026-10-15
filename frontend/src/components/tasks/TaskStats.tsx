import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import { useMemo, type ComponentType, type SVGProps } from "react";
import type { TaskSummary } from "../../hooks/useTasks";
import { CheckCircleIcon, ClockIcon, ListIcon } from "../common/icons";

interface TaskStatsProps {
  stats: TaskSummary;
  loading: boolean;
}

interface StatCard {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
}

const TaskStats = ({ stats, loading }: TaskStatsProps) => {
  const cards = useMemo<StatCard[]>(
    () => [
      { label: "Total tasks", value: stats.total, icon: ListIcon, accent: "bg-indigo-50 text-indigo-600" },
      { label: "Completed", value: stats.completed, icon: CheckCircleIcon, accent: "bg-emerald-50 text-emerald-600" },
      { label: "Pending", value: stats.pending, icon: ClockIcon, accent: "bg-amber-50 text-amber-600" },
    ],
    [stats],
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map(({ label, value, icon: Icon, accent }) => (
        <Card key={label} elevation={0} className="rounded-2xl border border-gray-200">
          <CardContent className="flex items-center gap-4 p-5 last:pb-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <Typography variant="body2" className="text-gray-500">
                {label}
              </Typography>
              {loading ? (
                <Skeleton variant="text" width={40} height={36} />
              ) : (
                <Typography variant="h5" className="font-bold text-gray-900">
                  {value}
                </Typography>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskStats;
