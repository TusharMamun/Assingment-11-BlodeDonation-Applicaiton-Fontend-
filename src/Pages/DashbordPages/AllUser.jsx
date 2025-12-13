import React, { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FiUserCheck,
  FiUserX,
  FiShield,
  FiUsers,
  FiSearch,
} from "react-icons/fi";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUserRole from "../../Hooks/useUserRole"; // ✅ logged-in role hook

const AllUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ logged-in role
  const [myRole, isRoleLoading] = useUserRole();
  const isAdmin = myRole === "admin";

  const [status, setStatus] = useState("all"); // all | active | blocked

  // ✅ debounce search
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const [page, setPage] = useState(1);
  const limit = 10;

  const params = useMemo(
    () => ({ status, search: debouncedSearch, page, limit }),
    [status, debouncedSearch, page, limit]
  );

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    enabled: !loading && !!user?.email && !isRoleLoading,
    queryKey: ["AllUserForAllUserPage", params],
    queryFn: async () => {
      const res = await axiosSecure.get("/regesterDoner", { params });
      return res.data; // { result, total, totalPages, page, limit }
    },
    keepPreviousData: true,
  });

  const users = data?.result || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total ?? 0;

  // ✅ Mutations
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
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire(
        "Failed!",
        err?.response?.data?.message || err?.message || "Update failed",
        "error"
      );
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
      });
      refetch();
    },
    onError: (err) => {
      Swal.fire(
        "Failed!",
        err?.response?.data?.message || err?.message || "Role update failed",
        "error"
      );
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
    });
    if (!confirm.isConfirmed) return;

    roleMutation.mutate({ id, role });
  };

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Error: {error?.response?.data?.message || error?.message}
      </div>
    );
  }

  const busy = statusMutation.isPending || roleMutation.isPending;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">
            All Users
          </h1>
          <p className="text-sm text-slate-500">
            View and manage all registered users.
            {isFetching ? " • Updating..." : ""}
          </p>
        </div>

        {/* Filter */}
        <div className="join w-full sm:w-auto">
          {["all", "active", "blocked"].map((s) => (
            <button
              key={s}
              className={`btn btn-sm join-item ${
                status === s ? "btn-primary" : "btn-outline"
              }`}
              type="button"
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              disabled={loading || isRoleLoading}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FiUsers className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-semibold">Users Table</p>
              <p className="text-xs text-slate-500">
                {isLoading ? "Loading..." : `Total: ${total} • Showing: ${users.length}`}
              </p>
            </div>
          </div>

          {/* Search */}
          <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-80">
            <FiSearch className="opacity-60" />
            <input
              type="text"
              className="grow"
              placeholder="Search name/email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-slate-600">
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const photo = u?.photo || u?.photoUrl || "";
                  const uname = u?.name || "Unknown";
                  const email = u?.email || "—";
                  const rowRole = u?.role || "donor";
                  const st = u?.status || "active";

                  const isSelf = user?.email && user.email === email;
                  const rowIsAdmin = rowRole === "admin";

                  // ✅ Only admin can manage, and not self
                  const canManage = isAdmin && !isSelf;

                  // optional: don't allow blocking another admin
                  const canBlockThisUser = canManage && !rowIsAdmin;

                  return (
                    <tr key={u?._id || email} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          {photo ? (
                            <div className="avatar">
                              <div className="w-10 rounded-full ring-2 ring-indigo-100">
                                <img src={photo} alt="avatar" />
                              </div>
                            </div>
                          ) : (
                            <div className="avatar placeholder">
                              <div className="w-10 rounded-full bg-indigo-100 text-indigo-700 font-bold ring-2 ring-indigo-100">
                                <span>{uname?.[0]?.toUpperCase() || "U"}</span>
                              </div>
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="font-semibold text-slate-800 truncate">
                              {uname}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              ID: {u?._id || "—"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-slate-700">{email}</td>

                      <td>
                        <span className="badge badge-ghost badge-outline">
                          {rowRole}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge badge-outline ${
                            st === "blocked" ? "badge-error" : "badge-success"
                          }`}
                        >
                          {st}
                        </span>
                      </td>

                      <td className="text-right">
                        <div className="dropdown dropdown-end">
                          <button className="btn btn-ghost btn-sm" type="button">
                            <HiOutlineDotsVertical className="h-5 w-5" />
                          </button>

                          <ul className="dropdown-content menu rounded-xl border border-slate-200 bg-white p-2 shadow-lg w-56 z-50">
                            {!isAdmin ? (
                              <li>
                                <span className="text-xs text-slate-500 px-2 py-2">
                                  Only admin can manage users.
                                </span>
                              </li>
                            ) : isSelf ? (
                              <li>
                                <span className="text-xs text-slate-500 px-2 py-2">
                                  You can’t modify your own account.
                                </span>
                              </li>
                            ) : (
                              <>
                                {/* Block/Unblock */}
                                <li>
                                  {st === "blocked" ? (
                                    <button
                                      type="button"
                                      className="gap-2"
                                      disabled={!canManage || busy}
                                      onClick={() => confirmAndUpdateStatus(u._id, "active")}
                                    >
                                      <FiUserCheck className="h-4 w-4 text-green-600" />
                                      Unblock user
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="gap-2"
                                      disabled={!canBlockThisUser || busy}
                                      onClick={() => confirmAndUpdateStatus(u._id, "blocked")}
                                      title={!canBlockThisUser ? "Cannot block an admin user" : ""}
                                    >
                                      <FiUserX className="h-4 w-4 text-red-600" />
                                      Block user
                                    </button>
                                  )}
                                </li>

                                <div className="my-1 h-px bg-slate-100" />

                                {/* Make volunteer */}
                                <li>
                                  <button
                                    type="button"
                                    className="gap-2"
                                    disabled={!canManage || rowRole === "volunteer" || busy}
                                    onClick={() => confirmAndUpdateRole(u._id, "volunteer")}
                                  >
                                    <FiUsers className="h-4 w-4 text-indigo-600" />
                                    Make volunteer
                                  </button>
                                </li>

                                {/* Make admin */}
                                <li>
                                  <button
                                    type="button"
                                    className="gap-2"
                                    disabled={!canManage || rowRole === "admin" || busy}
                                    onClick={() => confirmAndUpdateRole(u._id, "admin")}
                                  >
                                    <FiShield className="h-4 w-4 text-purple-600" />
                                    Make admin
                                  </button>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Page <b className="text-slate-900">{data?.page || page}</b> of{" "}
            <b className="text-slate-900">{totalPages}</b>
          </p>

          <div className="join">
            <button
              className="btn btn-sm join-item btn-outline"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            <button className="btn btn-sm join-item btn-primary" type="button" disabled>
              {page}
            </button>

            <button
              className="btn btn-sm join-item btn-outline"
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
