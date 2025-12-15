import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../components/Uicomponent/Loadding";

const MyFundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [q, setQ] = useState("");

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["my-fundings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-fundings", {
        params: { email: user.email },
      });
      return res.data; // { fundings, total }
    },
  });

  const fundings = data?.fundings || [];
  const total = Number(data?.total || 0);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return fundings;

    return fundings.filter((f) => {
      const session = (f?.sessionId || "").toLowerCase();
      const currency = (f?.currency || "").toLowerCase();
      const status = (f?.paymentStatus || "").toLowerCase();
      const intent = (f?.paymentIntent || "").toLowerCase();

      return (
        session.includes(s) ||
        currency.includes(s) ||
        status.includes(s) ||
        intent.includes(s)
      );
    });
  }, [fundings, q]);

  const totalCount = fundings.length;
  const latest = fundings?.[0];

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
          <p className="text-lg font-extrabold text-red-600">
            Failed to load funding
          </p>
          <p className="mt-1 text-sm text-base-content/70">
            {error?.response?.data?.message || error?.message || "Something went wrong"}
          </p>
          <button
            className="btn btn-outline rounded-xl mt-4"
            onClick={() => refetch()}
            type="button"
          >
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
          <h2 className="text-2xl font-extrabold text-base-content">
            My Funding
          </h2>
          <p className="text-sm text-base-content/70">
            Your successful payments and funding history.
          </p>
        </div>

        <button
          className="btn btn-outline rounded-xl"
          onClick={() => refetch()}
          disabled={isFetching}
          type="button"
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <p className="text-xs text-base-content/60">Total Funding</p>
          <p className="mt-1 text-2xl font-extrabold">
            {formatMoney(total, latest?.currency || "usd")}
          </p>
          <p className="mt-2 text-sm text-base-content/60">
            Lifetime contributions
          </p>
        </div>

        <div className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <p className="text-xs text-base-content/60">Total Donations</p>
          <p className="mt-1 text-2xl font-extrabold">{totalCount}</p>
          <p className="mt-2 text-sm text-base-content/60">
            Successful payments
          </p>
        </div>

        <div className="rounded-2xl border bg-base-100 p-5 shadow-sm">
          <p className="text-xs text-base-content/60">Latest Donation</p>
          <p className="mt-1 text-2xl font-extrabold">
            {latest ? formatMoney(latest.amount, latest.currency) : "—"}
          </p>
          <p className="mt-2 text-sm text-base-content/60">
            {latest?.paidAt ? new Date(latest.paidAt).toLocaleString() : "No records"}
          </p>
        </div>
      </div>

      {/* Toolbar + Table */}
      <div className="rounded-2xl border bg-base-100 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b px-4 py-3">
          <div>
            <h3 className="font-bold text-base-content">Funding History</h3>
            <p className="text-xs text-base-content/60">
              Records: {filtered.length} (Total: {totalCount})
            </p>
          </div>

          <label className="input input-bordered rounded-xl flex items-center gap-2 w-full sm:w-[320px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-60"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
            </svg>

            <input
              className="grow"
              placeholder="Search session / status / currency"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>

        {fundings.length === 0 ? (
          <div className="p-10 text-center text-base-content/70">
            <div className="mx-auto max-w-md rounded-2xl border bg-base-200 p-6">
              <p className="text-lg font-extrabold text-base-content">
                No funding history found
              </p>
              <p className="mt-1 text-sm text-base-content/70">
                After you complete a Stripe payment, it will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Date</th>
                  <th className="text-right whitespace-nowrap">Amount</th>
                  <th className="whitespace-nowrap">Currency</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="whitespace-nowrap">Session</th>
                  <th className="text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((f) => (
                  <tr key={f._id} className="hover">
                    <td className="whitespace-nowrap">
                      {f.paidAt ? new Date(f.paidAt).toLocaleString() : "—"}
                    </td>

                    <td className="text-right font-extrabold whitespace-nowrap">
                      {formatMoney(f.amount, f.currency)}
                    </td>

                    <td className="uppercase">{f.currency || "—"}</td>

                    <td>
                      <span className="badge badge-success badge-outline">
                        {f.paymentStatus || "paid"}
                      </span>
                    </td>

                    <td className="max-w-[240px] truncate">{f.sessionId}</td>

                    <td className="text-right">
                      <button
                        className="btn btn-outline btn-sm rounded-xl"
                        type="button"
                        onClick={() => navigator.clipboard.writeText(f.sessionId)}
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-base-content/60">
                      No results for “{q}”
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFundingPage;
