import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SearchDonation = () => {
  const locationData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const bloodGroups = useMemo(
    () => ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    []
  );

  // form inputs
  const [districtId, setDistrictId] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  // state
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [searched, setSearched] = useState(false);
  const [total, setTotal] = useState(0);

  const selectedDistrict = useMemo(() => {
    return locationData?.find((d) => String(d.id) === String(districtId));
  }, [locationData, districtId]);

  const upazilas = selectedDistrict?.upazilas || [];
  const districtName = selectedDistrict?.name || "";

  useEffect(() => {
    setUpazila("");
  }, [districtId]);

  const handleReset = () => {
    setDistrictId("");
    setUpazila("");
    setBloodGroup("");
    setRequests([]);
    setTotal(0);
    setSearched(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSearched(true);

      const params = new URLSearchParams();
      if (districtName) params.append("district", districtName);
      if (upazila) params.append("upazila", upazila);
      if (bloodGroup) params.append("bloodGroup", bloodGroup);

      const { data } = await axiosSecure.get(
        `/search-pending-requests?${params.toString()}`
      );

      setRequests(data?.result || []);
      setTotal(data?.total || 0);
    } catch (err) {
      console.error(err);
      setRequests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-200">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div className="rounded-2xl bg-base-100 p-4 sm:p-6 shadow">
          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Search Pending Requests
              </h2>
              <p className="text-sm text-base-content/70">
                Filter by blood group, district & upazila (pending only)
              </p>
            </div>

            {searched && (
              <div className="text-sm text-base-content/70">
                Found: <span className="font-bold text-base-content">{total}</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSearch}
            className="mt-5 rounded-2xl border bg-base-200/40 p-4 sm:p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Blood */}
              <label className="form-control w-full">
                <div className="label pb-1">
                  <span className="label-text font-medium">Blood Group</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option value="">Select</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </label>

              {/* District */}
              <label className="form-control w-full">
                <div className="label pb-1">
                  <span className="label-text font-medium">District</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                >
                  <option value="">Select</option>
                  {locationData?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Upazila */}
              <label className="form-control w-full">
                <div className="label pb-1">
                  <span className="label-text font-medium">Upazila</span>
                </div>
                <select
                  className="select select-bordered w-full"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  disabled={!districtId}
                >
                  <option value="">
                    {districtId ? "Select" : "Select district first"}
                  </option>
                  {upazilas.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </label>

              {/* Buttons */}
              <div className="flex items-end gap-2">
                <button
                  className="btn btn-primary flex-1"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>

          {/* Results */}
          <div className="mt-6">
            {!searched ? (
              <div className="rounded-2xl border bg-base-100 p-6 text-center text-sm text-base-content/70">
                Fill the form and click <b>Search</b> to see results.
              </div>
            ) : loading ? (
              <div className="rounded-2xl border bg-base-100 p-10 text-center">
                <span className="loading loading-spinner loading-lg"></span>
                <p className="mt-3 text-sm text-base-content/70">Loading...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="rounded-2xl border bg-base-100 p-6 text-center text-sm text-base-content/70">
                No pending requests found with these filters.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {requests.map((r) => (
                  <div
                    key={r._id}
                    className="rounded-2xl border bg-base-100 p-5 shadow-sm hover:shadow transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs text-base-content/60">Recipient</p>
                        <h3 className="truncate text-lg font-bold">
                          {r.recipientName || "—"}
                        </h3>
                        <p className="mt-1 text-sm text-base-content/70">
                          {r.recipientDistrict || "—"}
                          {r.recipientUpazila ? `, ${r.recipientUpazila}` : ""}
                        </p>
                      </div>

                      <span className="badge badge-warning badge-outline">
                        pending
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-base-200/50 p-3">
                        <p className="text-xs text-base-content/60">Blood</p>
                        <p className="font-semibold">{r.bloodGroup || "—"}</p>
                      </div>
                      <div className="rounded-xl bg-base-200/50 p-3">
                        <p className="text-xs text-base-content/60">Date</p>
                        <p className="font-semibold">{r.donationDate || "—"}</p>
                      </div>
                      <div className="col-span-2 rounded-xl bg-base-200/50 p-3">
                        <p className="text-xs text-base-content/60">Time</p>
                        <p className="font-semibold">{r.donationTime || "—"}</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        className="btn btn-outline rounded-xl w-full"
                        onClick={() => navigate(`/donation-requests/${r._id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonation;
