import React from "react";
import { Link } from "react-router-dom";

const HomeFeature = () => {
  const items = [
    {
      title: "Search Donors",
      desc: "Find donors by blood group, district, and upazila for urgent needs.",
      to: "/search-donors",
      tag: "Fast Search",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path
            d="M10 18a8 8 0 1 1 5.3-14A8 8 0 0 1 10 18Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M21 21l-4.2-4.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Request Blood",
      desc: "Create a request with hospital, date & time. Track status easily.",
      to: "/donation-requests",
      tag: "Emergency",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path
            d="M12 21s-7-4.6-7-10.2C5 7.4 7.4 5 10.2 5c1.4 0 2.7.6 3.6 1.6C14.7 5.6 16 5 17.4 5 20.2 5 22.6 7.4 22.6 10.8 22.6 16.4 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      title: "Secure Dashboard",
      desc: "Role based access for Donor, Volunteer and Admin management.",
      to: "/dashboard",
      tag: "RBAC",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path
            d="M12 3l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V7l8-4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 12l1.8 1.8 3.8-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Give Funding",
      desc: "Support organizations through funding (Stripe). Every help counts.",
      to: "/funding",
      tag: "Support",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path
            d="M12 1v22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 5.5c0-2-2.2-3.5-5-3.5S7 3.5 7 5.5 9.2 9 12 9s5 1.5 5 3.5S14.8 16 12 16s-5-1.5-5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-red-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              Featured
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              Blood Donation Platform
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built to save lives faster
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Find donors, create requests, track donation status, and support the
              community — all in one place.
            </p>
          </div>

          <div className="flex gap-2">
            <Link to="/regester" className="btn btn-primary rounded-xl">
              Join as Donor
            </Link>
            <Link to="/search-donors" className="btn btn-outline rounded-xl">
              Search Donors
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, idx) => (
            <Link
              key={idx}
              to={it.to}
              className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="h-12 w-12 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center border border-red-100 transition group-hover:bg-red-600 group-hover:text-white">
                  {it.icon}
                </div>

                <span className="text-xs font-semibold rounded-full border bg-slate-50 px-3 py-1 text-slate-600">
                  {it.tag}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-red-700">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {it.desc}
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-700">
                Explore{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom mini strip */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "Track Status", d: "pending → inprogress → done/canceled" },
            { t: "Role Based Access", d: "Donor • Volunteer • Admin" },
            { t: "Fast & Responsive", d: "Optimized for mobile + desktop" },
          ].map((b, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="font-bold text-slate-900">{b.t}</p>
              <p className="mt-1 text-sm text-slate-600">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;
