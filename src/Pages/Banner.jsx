import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-base-100 via-base-100 to-primary/10 my-5">
      {/* soft background shapes */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,100,100,0.08),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(100,150,255,0.08),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(255,100,100,0.06),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-base-100/80 px-3 py-1 text-sm text-primary shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Donate blood • Save lives
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-base-content sm:text-5xl">
              Be a hero today.
              <span className="block text-primary">Join as a donor</span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-base-content/70 sm:text-lg">
              Connect donors with people who need blood fast. Register as a donor or search
              donors by location and blood group.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* ✅ Join as a donor -> /regester */}
              <Link
                to="/regester"
                className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20"
              >
                Join as a donor
              </Link>

              {/* ✅ Search Donors -> /search-donors */}
              <Link
                to="/search-donors"
                className="btn btn-outline btn-primary rounded-2xl border-base-300 text-base-content hover:bg-base-200"
              >
                Search Donors
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-base-content/70">
              <span className="rounded-xl bg-base-100/80 px-3 py-2 shadow-sm">
                ✅ Fast donor search
              </span>
              <span className="rounded-xl bg-base-100/80 px-3 py-2 shadow-sm">
                ✅ Verified profiles
              </span>
              <span className="rounded-xl bg-base-100/80 px-3 py-2 shadow-sm">
                ✅ Location-based requests
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl border border-base-300 bg-base-100/80 p-6 shadow-xl backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  {/* heart icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>

                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-base-content">
                    Emergency ready donors
                  </h3>
                  <p className="mt-1 text-sm text-base-content/70">
                    Keep your profile updated so patients can find you quickly.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                      <p className="text-xs text-base-content/50">Most needed</p>
                      <p className="mt-1 text-xl font-extrabold text-primary">O-</p>
                      <p className="mt-1 text-xs text-base-content/50">Universal donor</p>
                    </div>
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                      <p className="text-xs text-base-content/50">Search by</p>
                      <p className="mt-1 text-sm font-semibold text-base-content">
                        District • Upazila
                      </p>
                      <p className="mt-1 text-xs text-base-content/50">Find nearby donors</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-r from-primary to-secondary p-[1px]">
                <div className="rounded-2xl bg-base-100 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-base-content">Tip</p>
                    <span className="rounded-full bg-base-200 px-2 py-1 text-xs text-base-content/70">
                      Safety first
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-base-content/70">
                    Donate only when you're healthy, and follow local guidelines for safe donation.
                  </p>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-5 left-6 rounded-2xl bg-base-100 px-4 py-3 shadow-lg border border-base-300">
              <p className="text-xs text-base-content/50">Trusted community</p>
              <p className="text-sm font-bold text-base-content">Blood Donation Network</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;