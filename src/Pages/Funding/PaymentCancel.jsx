import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiXCircle, FiRefreshCcw, FiHome } from "react-icons/fi";

const PaymentCancel = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const tranId = params.get("tran_id") || params.get("transactionId");
  const reason = params.get("reason");

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-red-50 p-3 text-red-600 ring-1 ring-red-100">
            <FiXCircle className="h-7 w-7" />
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-slate-900">
              Payment Cancelled
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Your payment was cancelled. No charges were completed.
            </p>

            {(tranId || reason) && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {tranId && (
                  <p>
                    <span className="font-semibold">Transaction:</span>{" "}
                    <span className="font-mono">{tranId}</span>
                  </p>
                )}
                {reason && (
                  <p className="mt-1">
                    <span className="font-semibold">Reason:</span> {reason}
                  </p>
                )}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              {/* Retry: send user back to previous page */}
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-outline flex items-center justify-center gap-2"
              >
                <FiRefreshCcw /> Retry Payment
              </button>

              <Link
                to="/"
                className="btn flex items-center justify-center gap-2"
              >
                <FiHome /> Go Home
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              If you believe this is an error, please contact support and share
              the transaction ID (if available).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
