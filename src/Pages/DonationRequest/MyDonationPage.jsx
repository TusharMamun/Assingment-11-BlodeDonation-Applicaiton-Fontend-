import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiEdit,
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

const badgeClass = (status) => {
  const st = String(status || "").toLowerCase();
  if (st === "pending") return "badge badge-warning badge-outline";
  if (st === "inprogress") return "badge badge-info badge-outline";
  if (st === "done") return "badge badge-success badge-outline";
  if (st === "canceled" || st === "cancelled")
    return "badge badge-error badge-outline";
  return "badge badge-ghost badge-outline";
};

const MyDonationRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // ✅ added
  const [status, setStatus] = useState("pending");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // ✅ debounce search (fixes page reset/refetch on every keypress)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // ✅ reset page only when filters really change (not on every keypress)
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
    if (safe !== page)
       setPage(safe);
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
      });

      if (rows.length === 1 && page > 1) setPage((p) => p - 1);
      else refetch();
    } catch (err) {
      Swal.fire(
        "Failed!",
        err?.response?.data?.message || err?.message || "Delete failed",
        "error"
      );
    }
  };

  if (loading || isLoading) return <Loading></Loading>;
  if (isError) return <div className="p-6">Error: {error?.message}</div>;

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            My Donation Requests
          </h2>
          <p className="text-sm text-slate-500">
            Showing {from}-{to} of {total} {isFetching ? " • Updating..." : ""}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="btn btn-outline btn-sm rounded-xl"
          >
            Refresh
          </button>
          <button
            onClick={() => {
              setSearch("");
              setStatus("pending");
              setPage(1);
              setLimit(10);
            }}
            className="btn btn-outline btn-sm rounded-xl"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="input input-bordered rounded-xl bg-white"
          placeholder="Search recipient / hospital / district / blood..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered rounded-xl bg-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Status: pending</option>
          <option value="inprogress">Status: inprogress</option>
          <option value="done">Status: done</option>
          <option value="canceled">Status: canceled</option>
        </select>

        <select
          className="select select-bordered rounded-xl bg-white"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              rows.map((r) => {
                const st =
                  String(r?.status || "").toLowerCase() === "cancelled"
                    ? "canceled"
                    : String(r?.status || "").toLowerCase();
                const isPending = st === "pending";

                return (
                  <tr key={r._id} className="hover">
                    <td>
                      <div className="leading-tight">
                        <div className="font-bold text-slate-900">
                          {r.recipientName || "—"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {r.hospitalName || "—"}
                        </div>
                      </div>
                    </td>

                    <td>
                      {[r.recipientUpazila, r.recipientDistrict]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>

                    <td className="font-bold">{r.bloodGroup || "—"}</td>
                    <td>{r.donationDate || "—"}</td>
                    <td>{r.donationTime || "—"}</td>

                    <td>
                      <span className={badgeClass(st)}>{st}</span>
                    </td>

                    <td className="text-right">
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => navigate(`/donation-requests/${r._id}`)}
                          className="btn btn-outline btn-sm rounded-xl gap-2"
                        >
                          <FiEye /> View
                        </button>

                        {isPending && (
                          <>
                            <button
                              type="button"
                              onClick={() => navigate(`/updateDonation/${r._id}`)}
                              className="btn btn-outline btn-sm rounded-xl gap-2"
                            >
                              <FiEdit /> Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(r._id)}
                              className="btn btn-error btn-sm rounded-xl gap-2"
                            >
                              <FiTrash2 /> Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-slate-500">
          Page <b className="text-slate-900">{page}</b> of{" "}
          <b className="text-slate-900">{totalPages}</b>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            className="btn btn-sm btn-outline rounded-xl"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <FiChevronLeft /> Prev
          </button>

          <div className="join">
            {pageButtons.map((p, idx) =>
              p === "..." ? (
                <button
                  key={`${p}-${idx}`}
                  className="btn btn-sm join-item btn-disabled"
                >
                  ...
                </button>
              ) : (
                <button
                  key={p}
                  className={`btn btn-sm join-item ${
                    page === p ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              )
            )}
          </div>

          <button
            className="btn btn-sm btn-outline rounded-xl"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
