import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Uicomponent/Loadding';
import { FaEye, FaSync, FaCalendar, FaClock, FaMapMarkerAlt, FaTint, FaUser, FaHospital } from 'react-icons/fa';

const DonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: pendingRequests = [], isLoading, refetch } = useQuery({
    queryKey: ["donation-requests", "pending"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donation-requests", {
        params: { status: "pending" },
      });
      return data;
    },
  });

  if (isLoading) return <Loading />;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get priority badge style
  const getPriorityStyle = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'urgent':
        return 'bg-error/20 text-error border-error/30';
      case 'high':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-info/20 text-info border-info/30';
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-base-100">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Urgent Attention Required
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Pending Donation Requests
            </h2>
            <p className="text-base-content/70 mt-2">
              Patients are waiting for your help. These requests need immediate attention.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="btn btn-outline btn-primary rounded-xl gap-2"
              type="button"
            >
              <FaSync className="text-sm" />
              Refresh
            </button>
            <div className="hidden sm:block stats shadow">
              <div className="stat p-3">
                <div className="stat-value text-primary text-lg">{pendingRequests.length}</div>
                <div className="stat-desc text-base-content/70">Pending Requests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-base-200 rounded-2xl p-4 border border-base-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaTint className="text-primary text-lg" />
              </div>
              <div>
                <p className="text-sm text-base-content/50">Most Needed</p>
                <p className="text-lg font-bold text-base-content">O-</p>
              </div>
            </div>
          </div>
          <div className="bg-base-200 rounded-2xl p-4 border border-base-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FaHospital className="text-secondary text-lg" />
              </div>
              <div>
                <p className="text-sm text-base-content/50">Today's Requests</p>
                <p className="text-lg font-bold text-base-content">{pendingRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-base-200 rounded-2xl p-4 border border-base-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <FaUser className="text-success text-lg" />
              </div>
              <div>
                <p className="text-sm text-base-content/50">Avg. Response Time</p>
                <p className="text-lg font-bold text-base-content">2-4 hrs</p>
              </div>
            </div>
          </div>
          <div className="bg-base-200 rounded-2xl p-4 border border-base-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <FaClock className="text-warning text-lg" />
              </div>
              <div>
                <p className="text-sm text-base-content/50">Urgent Priority</p>
                <p className="text-lg font-bold text-base-content">
                  {pendingRequests.filter(r => r.priority === 'urgent').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {pendingRequests.length === 0 ? (
        <div className="rounded-3xl border border-base-300 bg-base-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FaTint className="text-3xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-3">
              No Pending Requests
            </h3>
            <p className="text-base-content/70 mb-6">
              All current requests have been attended to. Check back later or create a new request.
            </p>
            <button
              onClick={() => refetch()}
              className="btn btn-primary rounded-xl gap-2"
            >
              <FaSync />
              Check Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Request Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingRequests.map((r) => (
              <div 
                key={r._id} 
                className="group rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header with Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <FaTint className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-base-content/50">Blood Type</p>
                        <p className="text-2xl font-bold text-base-content">{r.bloodGroup || "—"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`badge badge-outline ${getPriorityStyle(r.priority)}`}>
                      {r.priority || "normal"}
                    </span>
                    <span className="badge badge-warning">pending</span>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaUser className="text-base-content/50 text-sm" />
                    <h3 className="text-lg font-bold text-base-content">
                      {r.recipientName || "Anonymous"}
                    </h3>
                  </div>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-base-content/50 text-sm flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-base-content/50">Location</p>
                        <p className="text-sm font-medium text-base-content truncate">
                          {r.recipientDistrict || "—"}
                          {r.recipientUpazila ? `, ${r.recipientUpazila}` : ""}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaHospital className="text-base-content/50 text-sm flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-base-content/50">Hospital</p>
                        <p className="text-sm font-medium text-base-content truncate">
                          {r.hospitalName || "Not specified"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-base-content/50 text-sm flex-shrink-0" />
                      <div>
                        <p className="text-xs text-base-content/50">Date</p>
                        <p className="text-sm font-medium text-base-content">
                          {formatDate(r.donationDate)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaClock className="text-base-content/50 text-sm flex-shrink-0" />
                      <div>
                        <p className="text-xs text-base-content/50">Time</p>
                        <p className="text-sm font-medium text-base-content">
                          {r.donationTime || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {r.additionalInfo && (
                  <div className="mb-6 p-3 bg-base-200 rounded-xl">
                    <p className="text-sm text-base-content/80 italic line-clamp-2">
                      "{r.additionalInfo}"
                    </p>
                  </div>
                )}

                {/* Status Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-base-content/50 mb-2">
                    <span>Request Status</span>
                    <span>Waiting for donor</span>
                  </div>
                  <div className="h-2 w-full bg-base-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-warning to-warning/70 rounded-full"
                      style={{ width: '30%' }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary flex-1 rounded-xl gap-2 group-hover:scale-[1.02] transition-transform"
                    onClick={() => navigate(`/donation-requests/${r._id}`)}
                  >
                    <FaEye />
                    View Details
                  </button>
                  
                  {r.priority === 'urgent' && (
                    <button
                      type="button"
                      className="btn btn-error btn-outline rounded-xl"
                      onClick={() => navigate(`/donation-requests/${r._id}`)}
                    >
                      Urgent!
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-base-300">
            <div className="text-sm text-base-content/70">
              Showing <span className="font-semibold text-base-content">{pendingRequests.length}</span> pending requests
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => refetch()}
                className="btn btn-sm btn-outline btn-primary rounded-xl gap-2"
                type="button"
              >
                <FaSync className="text-xs" />
                Refresh List
              </button>
              <div className="text-sm text-base-content/70">
                Last updated: Just now
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DonationRequest;