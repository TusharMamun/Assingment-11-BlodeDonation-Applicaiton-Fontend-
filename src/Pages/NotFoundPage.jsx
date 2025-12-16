import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center px-4">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-200/40 blur-3xl animate-blob" />
        <div className="absolute top-28 -right-24 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content card */}
      <div className="relative w-full max-w-2xl">
        <div className="rounded-3xl border bg-white/80 backdrop-blur shadow-sm p-8 sm:p-12 animate-fadeInUp">
          {/* Badge */}
          <div className="mx-auto w-fit rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold text-red-700">
            404 • PAGE NOT FOUND
          </div>

          {/* Big 404 with heartbeat animation */}
          <div className="mt-6 flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-gray-900">
                  4<span className="text-red-600 animate-pulseSoft">0</span>4
                </h1>

                {/* heartbeat line */}
                <div className="mt-3 flex items-center justify-center">
                  <svg
                    viewBox="0 0 120 24"
                    className="h-6 w-40 text-red-600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12h20l6-8 10 16 10-14 8 10h52"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-dash"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
            This page couldn’t be found
          </h2>
          <p className="mt-3 text-center text-gray-600 leading-relaxed">
            Looks like the link is broken or the page has moved. Let’s get you back to
            saving lives—find donors, request blood, or return home.
          </p>

          {/* Quick links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/"
              className="group rounded-2xl border bg-white px-5 py-4 shadow-sm transition hover:bg-gray-50"
            >
              <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700">
                Go Home
              </p>
              <p className="text-xs text-gray-500 mt-1">Back to main page</p>
            </Link>

            <Link
              to="/donation-requests"
              className="group rounded-2xl border bg-white px-5 py-4 shadow-sm transition hover:bg-gray-50"
            >
              <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700">
                Request Blood
              </p>
              <p className="text-xs text-gray-500 mt-1">Find urgent help</p>
            </Link>

            <Link
              to="/search-donors"
              className="group rounded-2xl border bg-white px-5 py-4 shadow-sm transition hover:bg-gray-50"
            >
              <p className="text-sm font-semibold text-gray-900 group-hover:text-red-700">
                Search Donors
              </p>
              <p className="text-xs text-gray-500 mt-1">Browse nearby donors</p>
            </Link>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
            >
              ← Go Back
            </button>

            <Link
              to="/"
              className="group inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
            >
              <span className="mr-2">Return Home</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Tiny footer */}
          <p className="mt-7 text-center text-xs text-gray-500">
            Tip: Check the URL or use the menu to navigate.
          </p>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(28px, -18px) scale(1.05); }
          66% { transform: translate(-18px, 18px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp .55s ease-out both; }

        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: .85; }
        }
        .animate-pulseSoft { animation: pulseSoft 1.4s ease-in-out infinite; }

        /* heartbeat line draw effect */
        .stroke-dash {
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          animation: dash 1.9s ease-in-out infinite;
        }
        @keyframes dash {
          0% { stroke-dashoffset: 140; opacity: .4; }
          35% { stroke-dashoffset: 0; opacity: 1; }
          70% { stroke-dashoffset: 0; opacity: 1; }
          100% { stroke-dashoffset: -140; opacity: .4; }
        }
      `}</style>
    </div>
  );
}
