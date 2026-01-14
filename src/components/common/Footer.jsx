import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-base-300 bg-base-100">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA strip */}
        <div className="py-10">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-6 sm:p-8 text-primary-content shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Be someone's hero today 🩸
                </h3>
                <p className="mt-1 text-primary-content/90 text-sm sm:text-base">
                  Join as a donor or request blood in minutes. Every drop matters.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/regester"
                  className="inline-flex items-center justify-center rounded-xl bg-base-100 px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:bg-base-200 active:scale-[0.98]"
                >
                  Join as a Donor
                </Link>
                <Link
                  to="/search-donors"
                  className="inline-flex items-center justify-center rounded-xl border border-base-100/30 bg-base-100/10 px-5 py-3 text-sm font-semibold text-primary-content shadow-sm transition hover:bg-base-100/20 active:scale-[0.98]"
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
              <div className="h-11 w-11 rounded-2xl bg-primary text-primary-content flex items-center justify-center font-black">
                BD
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-base-content">
                  Blood Donation
                </h4>
                <p className="text-xs text-base-content/70 -mt-0.5">
                  Connecting donors with those in need
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm text-base-content/80 leading-relaxed max-w-sm">
              A user-friendly platform to request blood, find donors, and support
              lifesaving causes. Built for fast response and real impact.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {/* Social buttons */}
              <Link
           to={"https://www.facebook.com/tusharmamun.tushar"}
                className="h-10 w-10 rounded-xl border border-base-300 bg-base-200 text-base-content flex items-center justify-center shadow-sm hover:bg-base-300 transition-colors"
                aria-label="Facebook"
                title="Facebook"
              >
                f
              </Link>
              <Link
             to={"https://x.com/tushar_mam18966r"}
                className="h-10 w-10 rounded-xl border border-base-300 bg-base-200 text-base-content flex items-center justify-center shadow-sm hover:bg-base-300 transition-colors"
                aria-label="X"
                title="X"
              >
                𝕏
              </Link>
              <Link to={"https://www.linkedin.com/in/tushar-mamun-web-developer/"}
        
                className="h-10 w-10 rounded-xl border border-base-300 bg-base-200 text-base-content flex items-center justify-center shadow-sm hover:bg-base-300 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                in
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h5 className="text-sm font-bold text-base-content">Quick Links</h5>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="text-base-content/80 hover:text-primary transition-colors" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-base-content/80 hover:text-primary transition-colors" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-base-content/80 hover:text-primary transition-colors"
                  to="/donation-requests"
                >
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link
                  className="text-base-content/80 hover:text-primary transition-colors"
                  to="/search-donors"
                >
                  Search Donors
                </Link>
              </li>
            </ul>
          </div>

        
 

          {/* Contact */}
          <div className="md:col-span-3" id="contact">
            <h5 className="text-sm font-bold text-base-content">Contact</h5>

            <div className="mt-4 space-y-3 text-sm text-base-content/80">
              <p>
                <span className="font-semibold text-base-content">Hotline:</span>{" "}
                +880 1902046268
              </p>
              <p>
                <span className="font-semibold text-base-content">Email:</span>{" "}
            tusharmamun@blooddonation.com
              </p>
              <p>
                <span className="font-semibold text-base-content">Location:</span>{" "}
                Dhaka, Bangladesh
              </p>
            </div>

            {/* mini newsletter */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-base-content">
                Get updates
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered w-full rounded-xl bg-base-100"
                />
                <button className="btn btn-primary rounded-xl" type="button">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs text-base-content/70">
                We'll only send important updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-base-300 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/70">
            © {year} Blood Donation. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <a className="text-base-content/70 hover:text-primary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-base-content/70 hover:text-primary transition-colors" href="#">
              Terms
            </a>
            <a className="text-base-content/70 hover:text-primary transition-colors" href="#">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}