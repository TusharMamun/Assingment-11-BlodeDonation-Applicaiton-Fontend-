import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiDownload,
  FiCalendar,
  FiMapPin,
  FiDroplet,
  FiClock,
  FiUser,
  FiActivity,
  FiAlertCircle
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Uicomponent/Loadding";

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

const normalizeResponse = (payload, fallbackPage, fallbackLimit) => {
  if (Array.isArray(payload)) {
    const total = payload.length;
    return {
      result: payload,
      total,
      page: 1,
      limit: total || fallbackLimit,
      totalPages: 1,
    };
  }

  const result = Array.isArray(payload?.result) ? payload.result : [];
  const total = Number.isFinite(payload?.total) ? payload.total : 0;
  const page = Number.isFinite(payload?.page) ? payload.page : fallbackPage;
  const limit = Number.isFinite(payload?.limit) ? payload.limit : fallbackLimit;

  const totalPages =
    Number.isFinite(payload?.totalPages) && payload.totalPages > 0
      ? payload.totalPages
      : Math.max(1, Math.ceil((total || 0) / (limit || fallbackLimit || 10)));

  return { result, total, page, limit, totalPages };
};

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: "⏳",
    bg: "from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10"
  },
  inprogress: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "🔄",
    bg: "from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10"
  },
  done: {
    label: "Completed",
    color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    icon: "✅",
    bg: "from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10"
  },
  canceled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "❌",
    bg: "from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10"
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: "❌",
    bg: "from-red-50 to-rose-50 dark:from-red-900/10 dark:to-rose-900/10"
  }
};

const MyDonationRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => setPage(1), [status, debouncedSearch, limit]);

  const {
    data: normalized,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: [
      "myDonationRequests",
      user?.email,
      status,
      debouncedSearch,
      page,
      limit,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-blood-donation-requests", {
        params: { email: user.email, status, search: debouncedSearch, page, limit },
      });
      
      // Calculate stats
      const allData = res.data?.result || [];
      const stats = {
        pending: allData.filter(d => d.status === 'pending').length,
        inprogress: allData.filter(d => d.status === 'inprogress').length,
        done: allData.filter(d => d.status === 'done').length,
        canceled: allData.filter(d => ['canceled', 'cancelled'].includes(d.status)).length,
        total: allData.length
      };
      setStats(stats);
      
      return normalizeResponse(res.data, page, limit);
    },
    keepPreviousData: true,
  });

  const rows = normalized?.result || [];
  const total = normalized?.total ?? 0;
  const totalPages = normalized?.totalPages ?? 1;

  useEffect(() => {
    if (!normalized) return;
    const safe = clamp(page, 1, totalPages);
    if (safe !== page) setPage(safe);
  }, [normalized, page, totalPages]);

  const pageButtons = useMemo(() => {
    const pages = [];
    const add = (p) => pages.push(p);

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) add(i);
      return pages;
    }

    add(1);
    if (page > 4) add("...");

    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);
    for (let i = start; i <= end; i++) add(i);

    if (page < totalPages - 3) add("...");
    add(totalPages);

    return pages;
  }, [page, totalPages]);

  const handleDelete = async (reqId) => {
    const confirm = await Swal.fire({
      title: "Delete this request?",
      text: "Only pending requests can be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      background: "#1f2937",
      color: "#f9fafb",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/my-blood-donation-requests/${reqId}`, {
        params: { email: user.email },
      });

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f9fafb",
      });

      if (rows.length === 1 && page > 1) setPage((p) => p - 1);
      else refetch();
    } catch (err) {
      Swal.fire({
        title: "Failed!",
        text: err?.response?.data?.message || err?.message || "Delete failed",
        icon: "error",
        background: "#1f2937",
        color: "#f9fafb",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusConfig = (status) => {
    const st = String(status || "").toLowerCase();
    return statusConfig[st] || {
      label: "Unknown",
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      icon: "❓",
      bg: "from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10"
    };
  };

  if (loading || isLoading) return <Loading />;
  if (isError) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
          <FiAlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error?.message || "Failed to load donation requests"}
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                My Donation Requests
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Manage and track your blood donation requests. Every donation saves lives.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </button>
              
              <button
                onClick={() => {
                  setSearch("");
                  setStatus("pending");
                  setPage(1);
                  setLimit(10);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white font-medium hover:shadow-lg transition-all"
              >
                <FiFilter className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div 
              key={key} 
              className={`rounded-2xl bg-gradient-to-br ${config.bg} p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${config.color.replace('text-', 'bg-').split(' ')[0]}`}>
                  <span className="text-lg">{config.icon}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.color}`}>
                  {stats?.[key] || 0}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {config.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats?.[key] || 0}
              </p>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                placeholder="Search by recipient, hospital, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%202%201-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">🟡 Pending Requests</option>
              <option value="inprogress">🔵 In Progress</option>
              <option value="done">🟢 Completed</option>
              <option value="canceled">🔴 Cancelled</option>
            </select>

            <select
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%202%201-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="5">📄 5 per page</option>
              <option value="10">📄 10 per page</option>
              <option value="20">📄 20 per page</option>
              <option value="50">📄 50 per page</option>
            </select>

            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-100 dark:border-red-900/30">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Showing</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{from}-{to} of {total}</p>
              </div>
              <FiActivity className="w-6 h-6 text-red-500 dark:text-red-400" />
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden mb-6">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Donation Requests
              </h3>
              <button
                onClick={() => navigate('/create-donation-request')}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <FiEdit className="w-4 h-4" />
                New Request
              </button>
            </div>
          </div>

          {/* Table Content */}
          {rows.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 mb-6">
                <FiDroplet className="w-10 h-10 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No donation requests found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                {search || status !== "pending" 
                  ? "Try changing your search or filter criteria"
                  : "Start by creating your first blood donation request to save lives."}
              </p>
              {!search && status === "pending" && (
                <button
                  onClick={() => navigate('/create-donation-request')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:shadow-xl transition-all"
                >
                  <FiEdit className="w-5 h-5" />
                  Create First Request
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Recipient Details
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Blood
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {rows.map((r) => {
                      const st = String(r?.status || "").toLowerCase();
                      const normalizedStatus = st === "cancelled" ? "canceled" : st;
                      const isPending = normalizedStatus === "pending";
                      const config = getStatusConfig(normalizedStatus);
                      const isExpanded = expandedRow === r._id;

                      return (
                        <React.Fragment key={r._id}>
                          <tr 
                            className={`hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
                            onClick={() => setExpandedRow(isExpanded ? null : r._id)}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                                    {r.recipientName?.[0]?.toUpperCase() || 'R'}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {r.recipientName || "—"}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {r.hospitalName || "—"}
                                  </div>
                                  {r.urgency && (
                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full">
                                      {r.urgency}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <FiMapPin className="w-4 h-4 text-gray-400" />
                                <div className="text-sm text-gray-900 dark:text-white">
                                  {[r.recipientUpazila, r.recipientDistrict]
                                    .filter(Boolean)
                                    .join(", ") || "—"}
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <FiDroplet className="w-4 h-4 text-red-500" />
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                  {r.bloodGroup || "—"}
                                </span>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                                  <FiCalendar className="w-4 h-4 text-gray-400" />
                                  {r.donationDate || "—"}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                  <FiClock className="w-4 h-4 text-gray-400" />
                                  {r.donationTime || "—"}
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                                <span className="mr-1">{config.icon}</span>
                                {config.label}
                              </span>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/donation-requests/${r._id}`);
                                  }}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                                >
                                  <FiEye className="w-4 h-4" />
                                  View
                                </button>
                                
                                {isPending && (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/updateDonation/${r._id}`);
                                      }}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors"
                                    >
                                      <FiEdit className="w-4 h-4" />
                                      Edit
                                    </button>
                                    
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(r._id);
                                      }}
                                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-md transition-all"
                                    >
                                      <FiTrash2 className="w-4 h-4" />
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                          
                          {/* Expanded Details Row */}
                          {isExpanded && (
                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
                              <td colSpan={6} className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                  <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                      <FiUser className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Recipient Contact
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      {r.recipientPhone || "Not provided"}
                                    </p>
                                  </div>
                                  
                                  <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                      <FiMapPin className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Hospital Address
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      {r.hospitalAddress || "Not provided"}
                                    </p>
                                  </div>
                                  
                                  <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                      <FiClock className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Created
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      {formatDate(r.createdAt)}
                                    </p>
                                  </div>
                                  
                                  <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-2">
                                      <FiActivity className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Last Updated
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      {formatDate(r.updatedAt)}
                                    </p>
                                  </div>
                                </div>
                                
                                {r.notes && (
                                  <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-900/30">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      <span className="font-bold">Notes:</span> {r.notes}
                                    </p>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing {from} to {to} of {total} requests
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {pageButtons.map((p, idx) =>
                      p === "..." ? (
                        <span
                          key={`${p}-${idx}`}
                          className="px-3 py-2 text-gray-400"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === p
                              ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                  </div>
                  
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Card */}
        <div className="rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-100 dark:border-red-900/30 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center">
                <FiDroplet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Blood Donation Saves Lives
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Each blood donation can save up to 3 lives. Your requests help connect donors with those in need. 
                Please ensure all information is accurate to facilitate successful matches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;