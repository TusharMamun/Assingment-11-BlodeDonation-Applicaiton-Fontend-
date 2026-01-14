import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FiUserCheck,
  FiUserX,
  FiShield,
  FiUsers,
  FiSearch,
  FiRefreshCw,
  FiFilter,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiMoreVertical,
  FiActivity,
  FiEye,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import {
  RiAdminLine,
  RiUserLine,
  RiUserStarLine
} from "react-icons/ri";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserRole from "../../Hooks/useUserRole";

const AllUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [myRole, isRoleLoading] = useUserRole();
  const isAdmin = myRole === "admin";

  const [status, setStatus] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const params = useMemo(
    () => ({ status, role: roleFilter, search: debouncedSearch, page, limit }),
    [status, roleFilter, debouncedSearch, page, limit]
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    enabled: !loading && !!user?.email && !isRoleLoading,
    queryKey: ["AllUserForAllUserPage", params],
    queryFn: async () => {
      const res = await axiosSecure.get("/regesterDoner", { params });
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = data?.result || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total ?? 0;

  const statusMutation = useMutation({
    mutationFn: async ({ id, nextStatus }) => {
      const res = await axiosSecure.patch(`/users/${id}/status`, {
        status: nextStatus,
      });
      return res.data;
    },
    onSuccess: async () => {
      await Swal.fire({
        icon: "success",
        title: "Updated!",
        timer: 1200,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f9fafb",
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire({
        title: "Failed!",
        text: err?.response?.data?.message || err?.message || "Update failed",
        icon: "error",
        background: "#1f2937",
        color: "#f9fafb",
      });
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: async () => {
      await Swal.fire({
        icon: "success",
        title: "Role Updated!",
        timer: 1200,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#f9fafb",
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire({
        title: "Failed!",
        text: err?.response?.data?.message || err?.message || "Role update failed",
        icon: "error",
        background: "#1f2937",
        color: "#f9fafb",
      });
    },
  });

  const confirmAndUpdateStatus = async (id, nextStatus) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `This user will be ${nextStatus}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: nextStatus === "blocked" ? "#ef4444" : "#10b981",
      background: "#1f2937",
      color: "#f9fafb",
    });
    if (!confirm.isConfirmed) return;

    statusMutation.mutate({ id, nextStatus });
  };

  const confirmAndUpdateRole = async (id, role) => {
    const confirm = await Swal.fire({
      title: "Confirm role change?",
      text: `This user will become ${role}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6366f1",
      background: "#1f2937",
      color: "#f9fafb",
    });
    if (!confirm.isConfirmed) return;

    roleMutation.mutate({ id, role });
  };

  const roleStats = useMemo(() => {
    const stats = {
      admin: 0,
      volunteer: 0,
      donor: 0,
      total: users.length
    };
    
    users.forEach(u => {
      const role = u?.role || "donor";
      if (stats[role] !== undefined) {
        stats[role]++;
      }
    });
    
    return stats;
  }, [users]);

  const getRoleIcon = (role) => {
    switch(role) {
      case "admin": return <RiAdminLine className="w-4 h-4" />;
      case "volunteer": return <RiUserStarLine className="w-4 h-4" />;
      default: return <RiUserLine className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case "admin": return "from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700";
      case "volunteer": return "from-blue-500 to-cyan-600 dark:from-blue-600 dark:to-cyan-700";
      default: return "from-gray-500 to-slate-600 dark:from-gray-600 dark:to-slate-700";
    }
  };

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <FiXCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.response?.data?.message || error?.message || "Failed to load users"}
          </p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const busy = statusMutation.isPending || roleMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">
                Manage user accounts, roles, and permissions across the platform.
                {isFetching && (
                  <span className="ml-2 inline-flex items-center gap-1 text-sm">
                    <FiRefreshCw className="w-3 h-3 animate-spin" />
                    Updating...
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <FiRefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={() => {
                  setSearch("");
                  setStatus("all");
                  setRoleFilter("all");
                  setPage(1);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 text-white font-medium hover:shadow-lg transition-all"
              >
                <FiFilter className="w-4 h-4" />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-5 shadow-lg border border-purple-100 dark:border-purple-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
                <RiAdminLine className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {roleStats.admin}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Administrators</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 shadow-lg border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                <RiUserStarLine className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {roleStats.volunteer}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Volunteers</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 p-5 shadow-lg border border-gray-100 dark:border-gray-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-gray-500 to-slate-600">
                <RiUserLine className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {roleStats.donor}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Donors</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 shadow-lg border border-green-100 dark:border-green-900/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <FiUsers className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {roleStats.total}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <select
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%202%201-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">👥 All Status</option>
              <option value="active">🟢 Active Only</option>
              <option value="blocked">🔴 Blocked Only</option>
            </select>

            <select
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%202%201-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">👑 All Roles</option>
              <option value="admin">👑 Admin</option>
              <option value="volunteer">⭐ Volunteer</option>
              <option value="donor">❤️ Donor</option>
            </select>

            <select
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%236b7280%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%202%201-6%206-6-6z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem]"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="5">📄 5 per page</option>
              <option value="10">📄 10 per page</option>
              <option value="20">📄 20 per page</option>
              <option value="50">📄 50 per page</option>
            </select>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Users List
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} users
              </div>
            </div>
          </div>

          {/* Table Content */}
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-900 mb-4">
                <FiRefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30 mb-6">
                <FiUsers className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                {search || status !== "all" || roleFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No users registered yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Role
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
                    {users.map((u) => {
                      const photo = u?.photo || u?.photoUrl || "";
                      const uname = u?.name || "Unknown User";
                      const email = u?.email || "—";
                      const phone = u?.phone || "—";
                      const rowRole = u?.role || "donor";
                      const status = u?.status || "active";
                      const isSelf = user?.email && user.email === email;
                      const isAdminUser = rowRole === "admin";
                      const canManage = isAdmin && !isSelf;
                      const canBlock = canManage && !isAdminUser;
                      const isExpanded = expandedUser === u._id;

                      return (
                        <React.Fragment key={u?._id || email}>
                          <tr 
                            className={`hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
                            onClick={() => setExpandedUser(isExpanded ? null : u._id)}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {photo ? (
                                    <img 
                                      src={photo} 
                                      alt={uname}
                                      className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                                    />
                                  ) : (
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRoleColor(rowRole)} flex items-center justify-center text-white font-bold text-lg`}>
                                      {uname[0]?.toUpperCase()}
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {uname}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    ID: {u?._id?.slice(-8) || 'N/A'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                                  <FiMail className="w-4 h-4 text-gray-400" />
                                  <span className="truncate max-w-[200px]">{email}</span>
                                </div>
                                {phone && phone !== "—" && (
                                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <FiPhone className="w-4 h-4 text-gray-400" />
                                    {phone}
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${getRoleColor(rowRole).replace('from-', 'bg-gradient-to-r from-')} bg-opacity-10 dark:bg-opacity-20`}>
                                  {getRoleIcon(rowRole)}
                                </div>
                                <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                                  {rowRole}
                                </span>
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                {status === "active" ? (
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                    <FiCheckCircle className="w-3 h-3" />
                                    Active
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                                    <FiXCircle className="w-3 h-3" />
                                    Blocked
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                {isAdmin ? (
                                  <>
                                    {!isSelf ? (
                                      <div className="flex items-center space-x-1">
                                        {status === "active" ? (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              confirmAndUpdateStatus(u._id, "blocked");
                                            }}
                                            disabled={!canBlock || busy}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 text-red-600 dark:text-red-400 hover:shadow-md transition-all disabled:opacity-50"
                                            title={!canBlock ? "Cannot block admin users" : ""}
                                          >
                                            <FiUserX className="w-4 h-4" />
                                            Block
                                          </button>
                                        ) : (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              confirmAndUpdateStatus(u._id, "active");
                                            }}
                                            disabled={busy}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 hover:shadow-md transition-all disabled:opacity-50"
                                          >
                                            <FiUserCheck className="w-4 h-4" />
                                            Unblock
                                          </button>
                                        )}

                                        {rowRole !== "admin" && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              confirmAndUpdateRole(u._id, "admin");
                                            }}
                                            disabled={busy}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-purple-600 dark:text-purple-400 hover:shadow-md transition-all disabled:opacity-50"
                                          >
                                            <FiShield className="w-4 h-4" />
                                            Make Admin
                                          </button>
                                        )}

                                        {rowRole !== "volunteer" && rowRole !== "admin" && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              confirmAndUpdateRole(u._id, "volunteer");
                                            }}
                                            disabled={busy}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-600 dark:text-blue-400 hover:shadow-md transition-all disabled:opacity-50"
                                          >
                                            <FiUsers className="w-4 h-4" />
                                            Make Volunteer
                                          </button>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Current User
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Admin Only
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                          
                          {/* Expanded Details */}
                          {isExpanded && (
                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
                              <td colSpan={5} className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FiCalendar className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Account Created
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                      {u?.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Unknown"}
                                    </p>
                                  </div>
                                  
                                  <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FiActivity className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Last Active
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                      {u?.lastLogin ? new Date(u.lastLogin).toLocaleString() : "Unknown"}
                                    </p>
                                  </div>
                                  
                                  <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2 mb-3">
                                      <FiEye className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Donations
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-900 dark:text-white">
                                      {u?.donationCount || 0} successful donations
                                    </p>
                                  </div>
                                </div>
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
                  Page {page} of {totalPages}
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
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                            page === pageNum
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
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
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-900/30 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <FiShield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                User Management Guidelines
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                • Only administrators can modify user roles and statuses.<br/>
                • You cannot modify your own account from this panel.<br/>
                • Blocked users cannot log in or access the platform.<br/>
                • Admin privileges should only be granted to trusted users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUser;