import React from "react";
import { Link } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BloodCompatibilityViz from "../../components/Uicomponent/BloodCompatibilityViz";
import TeamMembers from "../../components/Uicomponent/TeamMembers";
import ImpactStories from "../../components/Uicomponent/ImpactStories";
import FAQs from "../../components/Uicomponent/FAQs";

const slides = [
  {
    title: "Donate Blood, Save Lives",
    desc: "A simple platform to connect donors and patients in need — fast, reliable, and community-first.",
    cta1: { text: "Join as Donor", to: "/regester" },
    cta2: { text: "Search Donors", to: "/search-donors" },
    badge: "Blood Donation Platform",
  },
  {
    title: "Find Donors by Location",
    desc: "Search by blood group, district, and upazila to find the right donor at the right time.",
    cta1: { text: "Search Donors", to: "/search-donors" },
    cta2: { text: "Donation Requests", to: "/donation-requests" },
    badge: "Fast Search",
  },
  {
    title: "Track Requests Securely",
    desc: "Role-based dashboard for Donor, Volunteer, and Admin with secure request tracking and management.",
    cta1: { text: "Go Dashboard", to: "/dashboard" },
    cta2: { text: "Create Request", to: "/dashboard/creatDonerRequest" },
    badge: "Secure Dashboard",
  },
];

const features = [
  {
    title: "Emergency-first",
    desc: "Quick request flow and clear status updates to support urgent cases.",
    icon: "⚡",
  },
  {
    title: "Location Based Search",
    desc: "Find donors using district and upazila data for better matching.",
    icon: "📍",
  },
  {
    title: "Role Based Access",
    desc: "Admin, Volunteer, Donor permissions ensure safe management.",
    icon: "🛡️",
  },
  {
    title: "Funding Support",
    desc: "Help organizations with funding and track total contributions.",
    icon: "💳",
  },
];

const stats = [
  { label: "Active Donors", value: "1,200+" },
  { label: "Successful Matches", value: "3,500+" },
  { label: "Cities Covered", value: "64 Districts" },
];

export default function About() {
  return (
    <div className="bg-base-100">
      {/* ===== Swiper Banner ===== */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="rounded-3xl border border-base-300 bg-base-100/80 backdrop-blur shadow-sm overflow-hidden">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              loop
              className="w-full"
            >
              {slides.map((s, idx) => (
                <SwiperSlide key={idx}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
                    {/* Text */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {s.badge}
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>

                      <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-base-content leading-tight">
                        {s.title}
                      </h1>

                      <p className="mt-3 text-sm sm:text-base text-base-content/70 leading-relaxed max-w-xl">
                        {s.desc}
                      </p>

                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link
                          to={s.cta1.to}
                          className="btn btn-primary rounded-xl"
                        >
                          {s.cta1.text}
                        </Link>
                        <Link
                          to={s.cta2.to}
                          className="btn btn-outline btn-primary rounded-xl"
                        >
                          {s.cta2.text}
                        </Link>
                      </div>

                      {/* mini stats */}
                      <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
                        {stats.map((st, i) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-base-300 bg-base-100 p-4 text-center shadow-sm"
                          >
                            <p className="text-lg sm:text-xl font-extrabold text-base-content">
                              {st.value}
                            </p>
                            <p className="mt-1 text-xs text-base-content/70">
                              {st.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visual card */}
                    <div className="lg:col-span-5">
                      <div className="h-full rounded-3xl bg-gradient-to-br from-primary to-secondary p-6 sm:p-8 text-primary-content shadow-sm relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-base-100/15 blur-2xl" />
                        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-base-100/10 blur-2xl" />

                        <p className="text-sm font-semibold text-primary-content/90">
                          Why blood donation matters
                        </p>
                        <h3 className="mt-2 text-2xl font-extrabold">
                          One donation can save up to 3 lives
                        </h3>
                        <p className="mt-3 text-sm text-primary-content/90 leading-relaxed">
                          Our goal is to reduce delays during emergencies by
                          making donors easy to discover and requests easy to
                          track.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {[
                            { t: "Secure Access", d: "Role based dashboard" },
                            { t: "Quick Filters", d: "Search by location" },
                            { t: "Live Status", d: "Track request progress" },
                            { t: "Community", d: "Help each other" },
                          ].map((b, i) => (
                            <div
                              key={i}
                              className="rounded-2xl bg-base-100/10 border border-base-100/15 p-3"
                            >
                              <p className="text-sm font-bold">{b.t}</p>
                              <p className="text-xs text-primary-content/85 mt-1">
                                {b.d}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 rounded-2xl bg-base-100/10 border border-base-100/15 p-4">
                          <p className="text-xs text-primary-content/85">
                            Tip: If you're a volunteer, you can manage donation
                            status updates from the dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ===== Blood Compatibility Section ===== */}
      <section className="py-12 sm:py-16 bg-base-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Blood Compatibility
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-base-content">
                Check who can receive your blood
              </h2>
              <p className="mt-2 text-sm sm:text-base text-base-content/70 max-w-2xl">
                Select a donor type to see compatible recipients with a simple animated visualization.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <BloodCompatibilityViz />
          </div>
        </div>
      </section>

      {/* ===== Feature Section ===== */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-base-100 to-base-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Our Features <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-base-content">
                Built for speed, trust & impact
              </h2>
              <p className="mt-2 text-sm sm:text-base text-base-content/70 max-w-2xl">
                We focus on a smooth user experience with strong role-based
                control so donors, volunteers, and admins can work together.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link to="/donation-requests" className="btn btn-outline btn-primary rounded-xl">
                View Requests
              </Link>
              <Link to="/dashboard" className="btn btn-primary rounded-xl">
                Go Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
                    {f.icon}
                  </div>
                  <span className="text-xs font-semibold rounded-full border border-base-300 bg-base-200 px-3 py-1 text-base-content/70">
                    Feature
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
                  {f.desc}
                </p>

                <div className="mt-4 text-sm font-semibold text-primary group-hover:text-primary-focus transition-colors">
                  Learn more <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Mission / Story ===== */}
      <section className="py-12 sm:py-16 bg-base-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                Our Mission
              </h3>
              <p className="mt-3 text-base-content/80 leading-relaxed">
                We aim to build a reliable bridge between people who need blood
                and donors who can help. With verified users, request tracking,
                and location-based search, we reduce response time in emergencies.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    t: "Trusted Process",
                    d: "Track donation status with transparency.",
                  },
                  {
                    t: "Community Driven",
                    d: "Donors and volunteers work together.",
                  },
                  {
                    t: "Responsive Design",
                    d: "Works on mobile, tablet, desktop.",
                  },
                  {
                    t: "Secure Access",
                    d: "Role-based permissions for safety.",
                  },
                ].map((x, i) => (
                  <div key={i} className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                    <p className="font-bold text-base-content">{x.t}</p>
                    <p className="mt-1 text-sm text-base-content/70">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-base-300 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 p-6 sm:p-10 shadow-sm">
                <h4 className="text-xl font-extrabold text-base-content">
                  How it works
                </h4>

                <ol className="mt-5 space-y-4">
                  {[
                    {
                      t: "Register as a donor",
                      d: "Create your profile with blood group and location.",
                    },
                    {
                      t: "Search or request blood",
                      d: "Find donors or create a request with hospital & time.",
                    },
                    {
                      t: "Donation in progress",
                      d: "After confirmation, status becomes inprogress.",
                    },
                    {
                      t: "Complete the donation",
                      d: "Volunteer/Admin can update status to done/cancelled.",
                    },
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="h-9 w-9 rounded-xl bg-primary text-primary-content flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-base-content">{s.t}</p>
                        <p className="text-sm text-base-content/70">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link to="/regester" className="btn btn-primary rounded-xl">
                    Become a Donor
                  </Link>
                  <Link to="/donation-requests" className="btn btn-outline btn-primary rounded-xl">
                    View Requests
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TeamMembers></TeamMembers>
      <ImpactStories></ImpactStories>
      <FAQs></FAQs>
    </div>
  );
}