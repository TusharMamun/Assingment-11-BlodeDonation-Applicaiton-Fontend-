import React from "react";

export default function Forbidden() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50 flex items-center justify-center px-4">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-200/40 blur-3xl animate-blob" />
        <div className="absolute top-24 -right-24 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-xl">
        <div className="rounded-3xl border bg-white/80 backdrop-blur shadow-sm p-8 sm:p-10 animate-fadeInUp">
          {/* Badge */}
          <div className="mx-auto w-fit rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold text-red-700">
            403 • FORBIDDEN
          </div>

          {/* Icon */}
          <div className="mt-6 flex justify-center">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-red-600 to-rose-500 shadow-md flex items-center justify-center animate-float">
                {/* Lock */}
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-white"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 11V8a5 5 0 0 1 10 0v3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 11h11A2.5 2.5 0 0 1 20 13.5v6A2.5 2.5 0 0 1 17.5 22h-11A2.5 2.5 0 0 1 4 19.5v-6A2.5 2.5 0 0 1 6.5 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-red-300/40 animate-pingSlow" />
            </div>
          </div>

          {/* Text */}
          <h1 className="mt-6 text-center text-3xl sm:text-4xl font-bold text-gray-900">
            Access denied
          </h1>
          <p className="mt-3 text-center text-gray-600 leading-relaxed">
            You don’t have permission to view this page. If you’re trying to access
            donor/admin features, please log in with the correct account.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="group inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98]"
            >
              <span className="mr-2">Go Home</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>

            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
            >
              Login
            </a>
          </div>

          {/* Footer hint */}
          <div className="mt-7 text-center text-xs text-gray-500">
            Tip: If you think this is a mistake, contact support or try again later.
          </div>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
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

        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-float { animation: floaty 2.2s ease-in-out infinite; }

        @keyframes pingSlow {
          0% { transform: scale(1); opacity: .45; }
          70% { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        .animate-pingSlow { animation: pingSlow 1.8s ease-out infinite; }
      `}</style>
    </div>
  );
}
