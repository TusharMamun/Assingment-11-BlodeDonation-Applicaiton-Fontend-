import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Uicomponent/Loadding";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const verify = await axiosSecure.get(`/checkout-session/${sessionId}`);
        setInfo(verify.data);

        const save = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
        if (save.data?.success) setSaved(true);
      } catch (e) {
        setError(e?.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) run();
  }, [axiosSecure, sessionId]);

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white border shadow-sm">
        <h2 className="text-xl font-extrabold text-red-600">Payment Error</h2>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
        <Link className="btn btn-outline rounded-xl mt-4" to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white border shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-green-50 grid place-items-center text-green-600 font-black">
          ✓
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Payment Successful</h2>
          <p className="text-sm text-slate-500">Thank you for your contribution.</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-slate-50 p-4 text-sm">
        <p><b>Status:</b> {info?.payment_status}</p>
        <p>
          <b>Amount:</b> {(info?.amount_total || 0) / 100} {info?.currency?.toUpperCase()}
        </p>
        <p><b>Email:</b> {info?.customer_email}</p>
      </div>

      {saved && (
        <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          Funding saved successfully ✅
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <Link to="/dashboard/mydonation" className="btn btn-primary rounded-xl">
          Go to My Funding
        </Link>
        <Link to="/dashboard" className="btn btn-outline rounded-xl">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
