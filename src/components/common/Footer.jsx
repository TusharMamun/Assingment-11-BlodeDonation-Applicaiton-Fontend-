import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t bg-white">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-200/35 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA strip */}
        <div className="py-10">
          <div className="rounded-3xl bg-gradient-to-r from-red-600 to-rose-500 p-6 sm:p-8 text-white shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Be someone’s hero today 🩸
                </h3>
                <p className="mt-1 text-white/90 text-sm sm:text-base">
                  Join as a donor or request blood in minutes. Every drop matters.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/regester"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-700 shadow-sm transition hover:bg-white/90 active:scale-[0.98]"
                >
                  Join as a Donor
                </Link>
                <Link
                  to="/search-donors"
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15 active:scale-[0.98]"
                >
                  Search Donors
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 pb-10 pt-2 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black">
                BD
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  Blood Donation
                </h4>
                <p className="text-xs text-slate-500 -mt-0.5">
                  Connecting donors with those in need
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-sm">
              A user-friendly platform to request blood, find donors, and support
              lifesaving causes. Built for fast response and real impact.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {/* Social buttons (no external icons needed) */}
              <a
                href="#"
                className="h-10 w-10 rounded-xl border bg-white text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50"
                aria-label="Facebook"
                title="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-xl border bg-white text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50"
                aria-label="X"
                title="X"
              >
                𝕏
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-xl border bg-white text-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h5 className="text-sm font-bold text-slate-900">Quick Links</h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-red-600" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-red-600" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 hover:text-red-600"
                  to="/donation-requests"
                >
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 hover:text-red-600"
                  to="/search-donors"
                >
                  Search Donors
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-3">
            <h5 className="text-sm font-bold text-slate-900">Support</h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-red-600" to="/loging">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 hover:text-red-600"
                  to="/regester"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-600 hover:text-red-600"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  className="text-slate-600 hover:text-red-600"
                  href="#contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3" id="contact">
            <h5 className="text-sm font-bold text-slate-900">Contact</h5>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Hotline:</span>{" "}
                +880 1XXXXXXXXX
              </p>
              <p>
                <span className="font-semibold text-slate-900">Email:</span>{" "}
                support@blooddonation.com
              </p>
              <p>
                <span className="font-semibold text-slate-900">Location:</span>{" "}
                Dhaka, Bangladesh
              </p>
            </div>

            {/* mini newsletter (optional but looks attractive) */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-900">
                Get updates
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered w-full rounded-xl bg-white"
                />
                <button className="btn btn-primary rounded-xl" type="button">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                We’ll only send important updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} Blood Donation. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a className="text-slate-500 hover:text-red-600" href="#">
              Privacy Policy
            </a>
            <a className="text-slate-500 hover:text-red-600" href="#">
              Terms
            </a>
            <a className="text-slate-500 hover:text-red-600" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
