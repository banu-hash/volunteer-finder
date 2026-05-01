import type { TaskPublic } from "@/types";
import { TaskPriority, TaskStatus } from "@/types";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = {
  teal: "oklch(var(--chart-1))",
  amber: "oklch(var(--chart-2))",
  green: "oklch(var(--chart-3))",
  red: "oklch(var(--chart-4))",
  blue: "oklch(var(--primary))",
};

function tooltipStyle() {
  return {
    backgroundColor: "oklch(var(--card))",
    border: "1px solid oklch(var(--border))",
    borderRadius: "8px",
    color: "oklch(var(--foreground))",
    fontSize: "12px",
  };
}

interface Props {
  tasks: TaskPublic[];
}

export function TasksByStatusChart({ tasks }: Props) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {
      Pending: 0,
      Accepted: 0,
      Completed: 0,
      Verified: 0,
      Rejected: 0,
    };
    const statusMap: Record<TaskStatus, string> = {
      [TaskStatus.pending]: "Pending",
      [TaskStatus.accepted]: "Accepted",
      [TaskStatus.completed]: "Completed",
      [TaskStatus.verified]: "Verified",
      [TaskStatus.rejected]: "Rejected",
    };
    for (const task of tasks) {
      const label = statusMap[task.status];
      if (label) counts[label]++;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  const barColors = [
    CHART_COLORS.blue,
    CHART_COLORS.teal,
    CHART_COLORS.green,
    CHART_COLORS.amber,
    CHART_COLORS.red,
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
          allowDecimals={false}
        />
        <Tooltip contentStyle={tooltipStyle()} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={barColors[data.indexOf(entry) % barColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TaskCompletionsLineChart({ tasks }: Props) {
  const data = useMemo(() => {
    const now = Date.now();
    const days: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * 86400000);
      days[`${d.getMonth() + 1}/${d.getDate()}`] = 0;
    }
    for (const task of tasks) {
      if (
        task.status === TaskStatus.completed ||
        task.status === TaskStatus.verified
      ) {
        const d = new Date(Number(task.updatedAt / 1_000_000n));
        const key = `${d.getMonth() + 1}/${d.getDate()}`;
        if (key in days) days[key]++;
      }
    }
    const entries = Object.entries(days);
    return entries
      .filter((_, i) => i % 3 === 0 || i === entries.length - 1)
      .map(([name, value]) => ({ name, value }));
  }, [tasks]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "oklch(var(--muted-foreground))" }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
          allowDecimals={false}
        />
        <Tooltip contentStyle={tooltipStyle()} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={CHART_COLORS.teal}
          strokeWidth={2}
          dot={{ r: 3, fill: CHART_COLORS.teal }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PriorityPieChart({ tasks }: Props) {
  const data = useMemo(() => {
    let normal = 0;
    let urgent = 0;
    for (const t of tasks) {
      if (t.priority === TaskPriority.urgent) urgent++;
      else normal++;
    }
    return [
      { name: "Normal", value: normal },
      { name: "Urgent", value: urgent },
    ];
  }, [tasks]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={false}
        >
          <Cell fill={CHART_COLORS.teal} />
          <Cell fill={CHART_COLORS.amber} />
        </Pie>
        <Tooltip contentStyle={tooltipStyle()} />
      </PieChart>
    </ResponsiveContainer>
  );
}
