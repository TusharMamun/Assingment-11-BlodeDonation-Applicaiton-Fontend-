import React from "react";

export default function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6">
      <div className="rounded-2xl border bg-white px-4 py-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Blood Donation Dashboard
            </p>
            <p className="text-xs text-slate-500">
              Manage users, donation requests, and funding securely.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border bg-slate-50 px-3 py-1 text-slate-600">
              Admin Panel
            </span>
            <span className="rounded-full border bg-slate-50 px-3 py-1 text-slate-600">
              {year} © All rights reserved
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        Built with MERN • Secure Routes • Role Based Access
      </p>
    </footer>
  );
}
