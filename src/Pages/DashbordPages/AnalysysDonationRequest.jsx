import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
} from "react-icons/fi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// ✅ Recharts
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const StatCard = ({ title, value, icon: Icon, hint, tone = "slate" }) => {
  const toneMap = {
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    green: "bg-green-50 text-green-700 ring-green-100",
    red: "bg-red-50 text-red-700 ring-red-100",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="pointer-events-none absolute -right-24 -top-24 h-44 w-44 rounded-full bg-slate-100 blur-2xl opacity-0 transition group-hover:opacity-60" />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {title}
          </p>

          <p className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
            {value}
          </p>

          {hint ? (
            <p className="mt-1 text-xs text-slate-500">{hint}</p>
          ) : (
            <p className="mt-1 text-xs text-slate-400">&nbsp;</p>
          )}
        </div>

        <div
          className={`rounded-2xl p-3 ring-1 ${toneMap[tone] || toneMap.slate}`}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

const StatBar = ({ label, value, total, tone = "slate" }) => {
  const pct = total ? Math.round((value / total) * 100) : 0;

  const barTone = {
    slate: "bg-slate-900/80",
    amber: "bg-amber-600",
    indigo: "bg-indigo-600",
    green: "bg-green-600",
    red: "bg-red-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-sm font-bold text-slate-900 tabular-nums">
          {value} <span className="text-slate-400 font-semibold">({pct}%)</span>
        </p>
      </div>

      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${barTone[tone] || barTone.slate}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const AnalysysDonationRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: statusData = {},
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["analytics-requests-status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analysyseData");
      console.log(res.data);
      return res.data; // { pending, inprogress, done, cancelled, total }
    },
  });

  const pending = statusData?.pending ?? 0;
  const inprogress = statusData?.inprogress ?? 0;
  const done = statusData?.done ?? 0;
  const cancelled = statusData?.cancelled ?? 0;
  const total = statusData?.total ?? pending + inprogress + done + cancelled;

  const completionRate = useMemo(() => {
    if (!total) return 0;
    return Math.round((done / total) * 100);
  }, [done, total]);

  // ✅ Recharts data
  const chartData = useMemo(
    () => [
      { name: "Pending", value: pending },
      { name: "In Progress", value: inprogress },
      { name: "Done", value: done },
      { name: "Cancelled", value: cancelled },
    ],
    [pending, inprogress, done, cancelled]
  );

  // ✅ chart colors (match your tones)
  const COLORS = ["#D97706", "#4F46E5", "#16A34A", "#DC2626"];

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mb-4">
          <div className="h-6 w-44 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-72 rounded bg-slate-100 animate-pulse" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl border border-slate-200 bg-white animate-pulse"
            />
          ))}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl border border-slate-200 bg-white animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.message ||
            error?.message ||
            "Failed to load analytics"}
        </div>

        <button
          className="btn btn-sm btn-outline mt-3"
          type="button"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Analytics Overview
          </h2>
          <p className="text-sm text-slate-500">
            Blood donation requests status summary
            {isFetching ? " • Updating..." : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Completion rate
            </p>
            <p className="mt-0.5 flex items-center gap-2 text-lg font-extrabold text-slate-900">
              <FiTrendingUp className="opacity-70" />
              <span className="tabular-nums">{completionRate}%</span>
            </p>
          </div>

          <button
            className="btn btn-sm btn-outline"
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending"
          value={pending}
          icon={FiClock}
          hint={`Total: ${total}`}
          tone="amber"
        />
        <StatCard
          title="In Progress"
          value={inprogress}
          icon={FiActivity}
          hint="Ongoing requests"
          tone="indigo"
        />
        <StatCard
          title="Done"
          value={done}
          icon={FiCheckCircle}
          hint="Completed"
          tone="green"
        />
        <StatCard
          title="Cancelled"
          value={cancelled}
          icon={FiXCircle}
          hint="Not completed"
          tone="red"
        />
      </div>

      {/* ✅ Recharts charts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-extrabold text-slate-900">Status share</p>
            <p className="text-xs text-slate-500">Total: {total}</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={2}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-extrabold text-slate-900">
              Status counts
            </p>
            <p className="text-xs text-slate-500">Requests by state</p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value">
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Breakdown bars */}
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <StatBar label="Pending" value={pending} total={total} tone="amber" />
        <StatBar
          label="In Progress"
          value={inprogress}
          total={total}
          tone="indigo"
        />
        <StatBar label="Done" value={done} total={total} tone="green" />
        <StatBar
          label="Cancelled"
          value={cancelled}
          total={total}
          tone="red"
        />
      </div>
    </div>
  );
};

export default AnalysysDonationRequest;
