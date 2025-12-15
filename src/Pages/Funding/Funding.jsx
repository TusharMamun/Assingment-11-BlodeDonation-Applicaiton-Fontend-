import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Uicomponent/Loadding";

const Funding = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // UI states
  const [page, setPage] = useState(1);
  const limit = 10;
  const [q, setQ] = useState(""); // client-side search

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["my-fundings", user?.email, page, limit],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-fundings", {
        params: { email: user.email, page, limit },
      });
      return res.data;
    },
  });

  const fundings = data?.fundings || [];
  const total = Number(data?.total || 0);
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount ?? fundings.length;

  // ✅ This month total (client-side, from current page data + all fetched pages not available)
  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    const m = now.getMonth();
    const y = now.getFullYear();
    return fundings.reduce((sum, f) => {
      if (!f?.paidAt) return sum;
      const d = new Date(f.paidAt);
      if (d.getMonth() === m && d.getFullYear() === y) return sum + Number(f.amount || 0);
      return sum;
    }, 0);
  }, [fundings]);

  // ✅ filter list by q (client-side)
  const filteredFundings = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return fundings;
    return fundings.filter((f) => {
      const name = (f?.donorName || "").toLowerCase();
      const session = (f?.sessionId || "").toLowerCase();
      const intent = (f?.paymentIntent || "").toLowerCase();
      return name.includes(s) || session.includes(s) || intent.includes(s);
    });
  }, [fundings, q]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { amount: "" }, mode: "onTouched" });

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (formData) => {
    try {
      const amount = Number(formData.amount);
      if (!user?.email) throw new Error("User email missing");
      if (!amount || amount < 1) throw new Error("Amount must be at least 1");

      const paymentinfo = {
        name: user?.displayName || "Anonymous",
        email: user.email,
        amount,
      };

      const res = await axiosSecure.post("/create-checkout-session", paymentinfo);
      const url = res?.data?.url;

      if (!url) throw new Error("No checkout url returned from server");

      closeModal();
      window.location.href = url;
    } catch (err) {
      console.log("Checkout error:", err?.response?.data || err.message);
    }
  };

  const quickAmounts = [200, 500, 1000, 2000];

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">My Funding</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your donations and view your funding history.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <button
            className="btn btn-outline rounded-xl"
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refresh"
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>

          <button
            className="btn btn-primary rounded-xl"
            type="button"
            onClick={() => setOpen(true)}
          >
            Give Fund
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-500">Total Fund</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">৳ {total.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Lifetime contributions</p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-500">This Month (visible items)</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">৳ {Number(thisMonthTotal).toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Based on current loaded page</p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-slate-500">Total Donations</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">{Number(totalCount).toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-500">Successful payments</p>
        </div>
      </div>

      {/* List Card */}
      <div className="rounded-2xl border bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b px-4 py-3">
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900">Funding History</h3>
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <label className="input input-bordered rounded-xl flex items-center gap-2 bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
              </svg>
              <input
                className="grow"
                placeholder="Search by name / session / intent"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* Content */}
        {isError ? (
          <div className="p-10 text-center text-red-600">
            {error?.message || "Failed to load fundings"}
          </div>
        ) : fundings.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto max-w-sm rounded-2xl border bg-slate-50 p-6">
              <p className="text-lg font-bold text-slate-900">No funding yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Make your first donation to support blood donation initiatives.
              </p>
              <button className="btn btn-primary rounded-xl mt-4" onClick={() => setOpen(true)}>
                Give Fund
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-slate-50">
                    <th>User</th>
                    <th className="text-right">Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-right">Receipt</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFundings.map((f) => (
                    <tr key={f._id} className="hover">
                      <td className="min-w-[260px]">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-indigo-50 grid place-items-center font-bold text-indigo-700">
                            {(f.donorName || user?.displayName || "U")[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {f.donorName || user?.displayName || "Anonymous"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              Session: {f.sessionId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="text-right font-extrabold text-slate-900 whitespace-nowrap">
                        ৳ {Number(f.amount || 0).toLocaleString()}
                      </td>

                      <td className="text-slate-700 whitespace-nowrap">
                        {f.paidAt ? new Date(f.paidAt).toLocaleString() : "—"}
                      </td>

                      <td>
                        <span className="badge badge-success badge-outline">
                          {f.paymentStatus || "paid"}
                        </span>
                      </td>

                      <td className="text-right">
                        <button
                          className="btn btn-outline btn-sm rounded-xl"
                          type="button"
                          onClick={() => navigator.clipboard.writeText(f.sessionId)}
                          title="Copy session id"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredFundings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-slate-500">
                        No results for “{q}”
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 border-t">
              <p className="text-xs text-slate-500">
                Showing {filteredFundings.length} item(s) on this page
              </p>

              <div className="flex items-center gap-2 justify-end">
                <button
                  className="btn btn-outline btn-sm rounded-xl"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>

                <span className="px-3 py-2 rounded-xl bg-slate-50 border text-sm text-slate-700">
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

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="p-5 border-b flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Give Fund</h3>
                <p className="text-sm text-slate-500">Secure payment via Stripe Checkout</p>
              </div>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="font-semibold text-slate-900 truncate">{user?.displayName || "Anonymous"}</p>
                  </div>
                  <div className="rounded-2xl border bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-semibold text-slate-900 truncate">{user?.email || "—"}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-800">Choose quick amount</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {quickAmounts.map((a) => (
                      <button
                        key={a}
                        type="button"
                        className="btn btn-sm rounded-xl btn-outline"
                        onClick={() => setValue("amount", String(a), { shouldValidate: true })}
                      >
                        ৳ {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-800">Fund Amount (৳)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full rounded-xl bg-white mt-1"
                    placeholder="e.g. 500"
                    min={1}
                    step="1"
                    {...register("amount", {
                      required: "Amount is required",
                      min: { value: 1, message: "Minimum amount is ৳ 1" },
                    })}
                  />
                  {errors.amount && (
                    <p className="mt-1 text-xs text-red-600">{errors.amount.message}</p>
                  )}
                </div>

                <div className="rounded-2xl border bg-indigo-50 p-3 text-sm text-indigo-700">
                  Clicking <b>Pay & Confirm</b> will redirect you to Stripe Checkout.
                </div>
              </div>

              <div className="p-5 border-t flex items-center justify-end gap-2">
                <button className="btn btn-outline rounded-xl" type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary rounded-xl" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Pay & Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
