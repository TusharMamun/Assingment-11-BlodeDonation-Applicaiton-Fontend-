import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { 
  FaSearch, 
  FaFilter, 
  FaSync, 
  FaMapMarkerAlt, 
  FaTint, 
  FaCalendarAlt, 
  FaClock,
  FaUser,
  FaHeartbeat,
  FaAmbulance,
  FaHospital,
  FaArrowRight,
  FaInfoCircle,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaUsers
} from "react-icons/fa";

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
  const [stats, setStats] = useState({
    urgent: 0,
    today: 0,
    totalDonors: 0,
    successRate: "95%"
  });

  const selectedDistrict = useMemo(() => {
    return locationData?.find((d) => String(d.id) === String(districtId));
  }, [locationData, districtId]);

  const upazilas = selectedDistrict?.upazilas || [];
  const districtName = selectedDistrict?.name || "";

  useEffect(() => {
    setUpazila("");
  }, [districtId]);

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axiosSecure.get("/donation-stats");
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

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
      
      // Update stats after search
      fetchStats();
    } catch (err) {
      console.error(err);
      setRequests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // Calculate urgency for a request
  const getUrgencyLevel = (requestDate) => {
    if (!requestDate) return "low";
    
    const today = new Date();
    const donationDate = new Date(requestDate);
    const diffDays = Math.ceil((donationDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return "high";
    if (diffDays <= 3) return "medium";
    return "low";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold mb-4 backdrop-blur-sm">
              <FaAmbulance />
              <span className="animate-pulse">URGENT REQUESTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Blood Requests
              <br />
              <span className="text-white/90">Save Lives in Your Area</span>
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Search for blood donation requests near you. Your donation can make a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <FaExclamationTriangle className="text-xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.urgent}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Urgent Requests</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.today}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Today's Requests</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalDonors}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Donors</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FaHeartbeat className="text-xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.successRate}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FaSearch className="text-red-600 dark:text-red-400" />
                  Search Blood Donation Requests
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Filter requests by location and blood group to find urgent needs
                </p>
              </div>

              {searched && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 px-4 py-2 rounded-xl">
                  <span className="text-gray-600 dark:text-gray-400">Found:</span>
                  <span className="text-xl font-bold text-red-600 dark:text-red-400">{total}</span>
                  <span className="text-gray-600 dark:text-gray-400">requests</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Blood Group */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaTint className="text-red-600 dark:text-red-500" />
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent appearance-none text-gray-900 dark:text-gray-100"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select Blood Group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg} className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">
                        {bg}
                      </option>
                    ))}
                  </select>
                  <FaTint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-500" />
                  District
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent appearance-none text-gray-900 dark:text-gray-100"
                    value={districtId}
                    onChange={(e) => setDistrictId(e.target.value)}
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">Select District</option>
                    {locationData?.map((d) => (
                      <option key={d.id} value={d.id} className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaHospital className="text-green-600 dark:text-green-500" />
                  Upazila
                </label>
                <div className="relative">
                  <select
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent appearance-none text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    disabled={!districtId}
                  >
                    <option value="" className="text-gray-500 dark:text-gray-400">
                      {districtId ? "Select Upazila" : "Select district first"}
                    </option>
                    {upazilas.map((u) => (
                      <option key={u} value={u} className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800">
                        {u}
                      </option>
                    ))}
                  </select>
                  <FaHospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-end gap-2">
                <button
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 dark:from-red-500 dark:to-pink-500 dark:hover:from-red-600 dark:hover:to-pink-600 text-white rounded-xl font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      Search Requests
                    </>
                  )}
                </button>
                <button
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  type="button"
                  onClick={handleReset}
                >
                  <FaSync />
                  Reset
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Tip:</strong> You can search by blood group only, or combine with location for more specific results. 
                    Leave fields empty to see all pending requests in your area.
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* Results Section */}
          <div className="p-6">
            {!searched ? (
              <div className="text-center py-12">
                <div className="h-20 w-20 mx-auto bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mb-4">
                  <FaFilter className="text-3xl text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Find Urgent Blood Requests?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Use the search filters above to find blood donation requests that match your criteria.
                  Your search could help save a life today.
                </p>
              </div>
            ) : loading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                  <div className="w-full h-full rounded-full border-4 border-red-200 dark:border-red-800 border-t-red-600 dark:border-t-red-500 animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Searching Requests...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Finding blood donation requests that match your criteria
                </p>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-20 w-20 mx-auto bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center mb-4">
                  <FaExclamationTriangle className="text-3xl text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Requests Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  There are currently no pending blood donation requests matching your search criteria.
                  Try adjusting your filters or check back later.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 dark:from-red-500 dark:to-pink-500 dark:hover:from-red-600 dark:hover:to-pink-600 text-white rounded-lg font-medium transition-all"
                >
                  Try Different Search
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Found Requests ({total})
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    These are the pending blood donation requests matching your search
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {requests.map((r) => {
                    const urgency = getUrgencyLevel(r.donationDate);
                    return (
                      <div
                        key={r._id}
                        className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Card Header with Urgency */}
                        <div className={`px-6 py-4 ${
                          urgency === 'high' 
                            ? 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border-b border-red-200 dark:border-red-800' 
                            : urgency === 'medium' 
                            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-b border-yellow-200 dark:border-yellow-800' 
                            : 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-b border-green-200 dark:border-green-800'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`h-3 w-3 rounded-full ${
                                urgency === 'high' 
                                  ? 'bg-red-500 dark:bg-red-400 animate-pulse' 
                                  : urgency === 'medium' 
                                  ? 'bg-yellow-500 dark:bg-yellow-400' 
                                  : 'bg-green-500 dark:bg-green-400'
                              }`} />
                              <span className={`text-xs font-semibold ${
                                urgency === 'high' 
                                  ? 'text-red-700 dark:text-red-300' 
                                  : urgency === 'medium' 
                                  ? 'text-yellow-700 dark:text-yellow-300' 
                                  : 'text-green-700 dark:text-green-300'
                              }`}>
                                {urgency === 'high' ? 'URGENT' : 
                                 urgency === 'medium' ? 'PRIORITY' : 'STANDARD'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaClock className="text-gray-400 dark:text-gray-500 text-sm" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {r.donationDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                          {/* Recipient Info */}
                          <div className="flex items-start gap-3 mb-6">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                              <FaUser className="text-xl" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 dark:text-white truncate">
                                {r.recipientName || "Anonymous"}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <FaMapMarkerAlt className="text-gray-400 dark:text-gray-500 text-xs" />
                                <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {r.recipientDistrict || "—"}
                                  {r.recipientUpazila ? `, ${r.recipientUpazila}` : ""}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="space-y-4">
                            {/* Blood Group */}
                            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                              <div className="flex items-center gap-2">
                                <FaTint className="text-red-600 dark:text-red-400" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Blood Group</span>
                              </div>
                              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                                {r.bloodGroup || "—"}
                              </span>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                                  <span className="text-xs text-gray-700 dark:text-gray-300">Date</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {r.donationDate || "—"}
                                </span>
                              </div>
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaClock className="text-green-600 dark:text-green-400 text-sm" />
                                  <span className="text-xs text-gray-700 dark:text-gray-300">Time</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {r.donationTime || "—"}
                                </span>
                              </div>
                            </div>

                            {/* Hospital Info */}
                            {r.hospitalName && (
                              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                <div className="flex items-center gap-2 mb-1">
                                  <FaHospital className="text-purple-600 dark:text-purple-400 text-sm" />
                                  <span className="text-xs text-gray-700 dark:text-gray-300">Hospital</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white truncate">
                                  {r.hospitalName}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Button */}
                          <button
                            type="button"
                            className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 dark:from-red-500 dark:to-pink-500 dark:hover:from-red-600 dark:hover:to-pink-600 text-white rounded-xl font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 group-hover:shadow-xl"
                            onClick={() => navigate(`/donation-requests/${r._id}`)}
                          >
                            <span>View Request Details</span>
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination/Info */}
                {total > 9 && (
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {Math.min(requests.length, 9)} of {total} requests. 
                      Refine your search for more specific results.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Emergency CTA */}
        <div className="mt-8 bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500 rounded-2xl p-6 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">
              Need Emergency Assistance?
            </h3>
            <p className="text-white/90 dark:text-white/80 mb-6">
              If you require immediate blood transfusion or have an emergency request, 
              our 24/7 helpline is always available.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-white dark:bg-gray-100 text-red-600 dark:text-red-600 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-lg">
                <FaPhoneAlt className="inline mr-2" />
                Emergency Hotline: 106
              </button>
              <button className="px-6 py-3 border-2 border-white dark:border-gray-200 text-white dark:text-gray-100 rounded-xl font-bold hover:bg-white/10 dark:hover:bg-gray-100/10 transition-all">
                Submit Emergency Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDonation;