import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Uicomponent/Loadding";

const AllFunding = () => {
  const axiosSecure = useAxiosSecure();

  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearch(q.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["all-fundings", page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-fundings", {
        params: { page, limit, search },
      });
      return res.data; // { fundings, total, totalCount, totalPages }
    },
  });

  const fundings = data?.fundings || [];
  const total = Number(data?.total || 0);
  const totalCount = Number(data?.totalCount || 0);
  const totalPages = Number(data?.totalPages || 1);

  const latestCurrency = useMemo(
    () => String(fundings?.[0]?.currency || "usd").toLowerCase(),
    [fundings]
  );

  const formatMoney = (amount, currency = "usd") => {
    const c = String(currency || "usd").toLowerCase();
    const n = Number(amount || 0);
    if (c === "usd") return `$${n.toFixed(2)}`;
    return `${n.toFixed(2)} ${c.toUpperCase()}`;
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="rounded-2xl border bg-base-100 p-8 text-center">
          <p className="text-lg font-extrabold text-red-600">Failed to load fundings</p>
          <p className="mt-1 text-sm text-base-content/70">
            {error?.response?.data?.message || error?.message || "Something went wrong"}
          </p>
          <button className="btn btn-outline rounded-xl mt-4" onClick={() => refetch()} type="button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-base-content">All Funding</h2>
          <p className="text-sm text-base-content/70">All successful funding history (Admin)</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <button
            className="btn btn-outline rounded-xl"
            onClick={() => refetch()}
            disabled={isFetching}
            type="button"
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>

          <div className="rounded-2xl border bg-base-100 px-4 py-3 shadow-sm">
            <p className="text-xs text-base-content/60">Total Funding (All)</p>
            <p className="text-xl font-extrabold">{formatMoney(total, latestCurrency)}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <p className="text-xs text-base-content/60">Total Amount</p>
          <p className="mt-1 text-2xl font-extrabold">{formatMoney(total, latestCurrency)}</p>
          <p className="mt-2 text-sm text-base-content/60">All-time sum</p>
        </div>

        <div className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <p className="text-xs text-base-content/60">Total Records</p>
          <p className="mt-1 text-2xl font-extrabold">{totalCount}</p>
          <p className="mt-2 text-sm text-base-content/60">Successful payments</p>
        </div>

        <div className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <p className="text-xs text-base-content/60">Page</p>
          <p className="mt-1 text-2xl font-extrabold">
            {page} / {totalPages}
          </p>
          <p className="mt-2 text-sm text-base-content/60">Pagination</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-base-100 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b px-4 py-3">
          <div>
            <h3 className="font-bold text-base-content">Funding List</h3>
            <p className="text-xs text-base-content/60">
              {search ? `Search: "${search}" • ` : ""}Page {page} / {totalPages}
            </p>
          </div>

          <label className="input input-bordered rounded-xl flex items-center gap-2 w-full sm:w-[360px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
            </svg>
            <input
              className="grow"
              placeholder="Search donor / email / session / status"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>

        {fundings.length === 0 ? (
          <div className="p-10 text-center text-base-content/70">
            {search ? "No results found." : "No funding found."}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">Date</th>
                    <th className="whitespace-nowrap">Donor</th>
                    <th className="whitespace-nowrap">Email</th>
                    <th className="text-right whitespace-nowrap">Amount</th>
                    <th className="whitespace-nowrap">Currency</th>
                    <th className="whitespace-nowrap">Status</th>
                    <th className="text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fundings.map((f) => (
                    <tr key={f._id} className="hover">
                      <td className="whitespace-nowrap">
                        {f.paidAt ? new Date(f.paidAt).toLocaleString() : "—"}
                      </td>
                      <td className="font-semibold">{f.donorName || "—"}</td>
                      <td className="max-w-[260px] truncate">{f.donorEmail || "—"}</td>
                      <td className="text-right font-extrabold whitespace-nowrap">
                        {formatMoney(f.amount, f.currency)}
                      </td>
                      <td className="uppercase">{f.currency || "—"}</td>
                      <td>
                        <span className="badge badge-success badge-outline">
                          {f.paymentStatus || "paid"}
                        </span>
                      </td>
                      <td className="text-right">
                        <button
                          className="btn btn-outline btn-sm rounded-xl"
                          type="button"
                          onClick={() => navigator.clipboard.writeText(f.sessionId || "")}
                          disabled={!f.sessionId}
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 border-t">
              <p className="text-xs text-base-content/60">Total Records: {totalCount}</p>

              <div className="flex items-center gap-2 justify-end">
                <button
                  className="btn btn-outline btn-sm rounded-xl"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>

                <span className="px-3 py-2 rounded-xl bg-base-200 border text-sm">
                  {page} / {totalPages}
                </span>

                <button
                  className="btn btn-outline btn-sm rounded-xl"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllFunding;
