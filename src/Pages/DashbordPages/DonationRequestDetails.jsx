import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaPhone, FaCalendar, FaMapMarkerAlt, FaTint, FaUser, FaHospital, FaClock, FaArrowLeft, FaCheckCircle, FaInfoCircle, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Loading from "../../components/Uicomponent/Loadding";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: request, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["donationRequestDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/blood-donation-requests-details/${id}`);
      return res.data;
    },
  });

  const handleInProgress = async (reqId) => {
    try {
      const res = await axiosSecure.patch(`/update-status/${reqId}`, {
        status: "inprogress",
        donorName: user?.displayName || user?.name || "Donor",
        donorEmail: user?.email,
      });

      const modifiedCount =
        res?.data?.modifiedCount ?? res?.data?.result?.modifiedCount ?? 0;

      if (modifiedCount === 1) {
        await Swal.fire({
          icon: "success",
          title: "Thank you for donating blood ❤️",
          text: "Your donation has been booked successfully.",
          timer: 1400,
          showConfirmButton: false,
        });

        setOpen(false);
        await refetch();
        navigate("/donation-requests");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Sorry 😔",
          text: "Your donation was not booked. Please try again.",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Sorry 😔",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Your donation was not booked. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const badgeClass = (s) => {
    const status = String(s || "").toLowerCase();
    if (status === "pending") return "badge badge-warning gap-2";
    if (status === "inprogress") return "badge badge-primary gap-2";
    if (status === "done") return "badge badge-success gap-2";
    if (status === "canceled" || status === "cancelled")
      return "badge badge-error gap-2";
    return "badge badge-ghost gap-2";
  };

  const getStatusIcon = (s) => {
    const status = String(s || "").toLowerCase();
    if (status === "pending") return "⏳";
    if (status === "inprogress") return "🔄";
    if (status === "done") return "✅";
    if (status === "canceled" || status === "cancelled") return "❌";
    return "ℹ️";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) return <Loading label="Loading request details..." />;
  if (isError) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">😔</div>
        <h2 className="text-2xl font-bold text-error mb-2">Error Loading Request</h2>
        <p className="text-base-content/70">{error?.message || "Failed to load request details"}</p>
        <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">
          Go Back
        </button>
      </div>
    </div>
  );
  if (!request) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-base-content mb-2">Request Not Found</h2>
        <p className="text-base-content/70">The requested donation details could not be found.</p>
        <button onClick={() => navigate("/donation-requests")} className="btn btn-primary mt-4">
          Browse Requests
        </button>
      </div>
    </div>
  );

  const st = String(request?.status || "").toLowerCase();
  const isUrgent = request?.priority === 'urgent';

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Gradient */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost btn-sm rounded-xl mb-4 gap-2"
                type="button"
              >
                <FaArrowLeft />
                Back to Requests
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">
                Donation Request Details
              </h1>
              <p className="text-base-content/70">
                Review all information carefully before confirming donation
              </p>
            </div>
            
            <div className="flex flex-col sm:items-end gap-3">
              <span className={`badge ${badgeClass(st)} text-sm font-semibold px-4 py-3`}>
                {getStatusIcon(st)} {(st || "—").toUpperCase()}
              </span>
              {isUrgent && (
                <span className="badge badge-error gap-2 px-4 py-3 animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-error-content" />
                  URGENT - IMMEDIATE NEED
                </span>
              )}
            </div>
          </div>

          {/* Blood Group Banner */}
          <div className={`rounded-2xl p-6 mb-6 ${isUrgent ? 'bg-gradient-to-r from-error to-error/80' : 'bg-gradient-to-r from-primary to-secondary'}`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-base-100/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                  {isUrgent ? '🚨' : '🩸'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-base-content">{request.bloodGroup || "Unknown"} Blood Needed</h2>
                  <p className="text-base-content/90">
                    {isUrgent ? 'Critical emergency - Immediate response required' : 'Regular donation request'}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-base-content mb-1">{request.bloodGroup || "—"}</div>
                <div className="text-sm text-base-content/90">Blood Group</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient & Hospital Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FaUser className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content">Patient Information</h3>
                    <p className="text-sm text-base-content/70">Recipient details</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <InfoRow icon={<FaUser />} label="Patient Name" value={request.recipientName} />
                  <InfoRow icon={<FaUser />} label="Requester Name" value={request.requesterName} />
                  <InfoRow icon={<MdEmail />} label="Requester Email" value={request.requesterEmail} />
                </div>
              </div>

              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <FaHospital className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content">Hospital Details</h3>
                    <p className="text-sm text-base-content/70">Medical facility information</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <InfoRow icon={<FaHospital />} label="Hospital Name" value={request.hospitalName} />
                  <InfoRow icon={<MdLocationOn />} label="Full Address" value={request.fullAddress} />
                </div>
              </div>
            </div>

            {/* Location & Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content">Location</h3>
                    <p className="text-sm text-base-content/70">Where donation is needed</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <InfoRow icon={<FaMapMarkerAlt />} label="District" value={request.recipientDistrict} />
                  <InfoRow icon={<FaMapMarkerAlt />} label="Upazila" value={request.recipientUpazila} />
                </div>
              </div>

              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                    <FaCalendar className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content">Timing</h3>
                    <p className="text-sm text-base-content/70">When donation is needed</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <InfoRow icon={<FaCalendar />} label="Donation Date" value={request.donationDate} />
                  <InfoRow icon={<FaClock />} label="Donation Time" value={request.donationTime} />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {request.requestMessage && (
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center text-info">
                    <FaInfoCircle className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content">Additional Information</h3>
                    <p className="text-sm text-base-content/70">Message from requester</p>
                  </div>
                </div>
                
                <div className="p-4 bg-base-200 rounded-xl">
                  <p className="text-base-content/80 leading-relaxed">{request.requestMessage}</p>
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/70">Request Created</p>
                  <p className="font-medium text-base-content">
                    {request?.createdAt ? formatDate(request.createdAt) : "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-base-content/70">Request ID</p>
                  <p className="font-mono text-sm text-base-content/60">{id?.slice(-8)}</p>
                </div>
              </div>
            </div>

            {/* Call to Action - Phone Number */}
            {request.phoneNumber && (
              <div className="bg-gradient-to-r from-success/20 to-success/10 rounded-2xl border border-success/30 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-success flex items-center justify-center">
                      <FaPhone className="text-2xl text-success-content" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base-content text-lg">Emergency Contact</h3>
                      <p className="text-base-content/70">Direct contact for this request</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-2">
                    <a 
                      href={`tel:${request.phoneNumber}`}
                      className="btn btn-success rounded-xl gap-2"
                    >
                      <FaPhone />
                      Call Now: {request.phoneNumber}
                    </a>
                    <a 
                      href={`https://wa.me/${request.phoneNumber.replace('+', '')}?text=Hello%2C%20I%27m%20responding%20to%20your%20blood%20donation%20request%20(ID%3A${id})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-outline rounded-xl gap-2"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Donate Button */}
            {st === "pending" && (
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
                <div className="text-center">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-base-content mb-2">
                      Ready to Donate?
                    </h3>
                    <p className="text-base-content/70 mb-4">
                      By confirming, you'll change the request status to <span className="font-bold text-primary">IN PROGRESS</span> and commit to this donation.
                    </p>
                  </div>
                  
                  {user?.email ? (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        className="btn btn-primary btn-lg rounded-xl gap-2 px-8"
                        type="button"
                        onClick={() => setOpen(true)}
                      >
                        <FaCheckCircle />
                        Confirm Donation
                      </button>
                      <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline btn-primary btn-lg rounded-xl"
                      >
                        Browse Other Requests
                      </button>
                    </div>
                  ) : (
                    <div className="max-w-md mx-auto">
                      <div className="alert alert-warning mb-4">
                        <FaInfoCircle />
                        <span>Please login to confirm donation</span>
                      </div>
                      <button
                        onClick={() => navigate('/login', { state: { from: location } })}
                        className="btn btn-primary btn-lg rounded-xl"
                      >
                        Login to Continue
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary & Quick Info */}
          <div className="space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-bold text-base-content mb-4">Quick Summary</h3>
              
              <div className="space-y-4">
                <SummaryItem icon={<FaTint />} label="Blood Group" value={request.bloodGroup} />
                <SummaryItem icon={<FaCalendar />} label="Date" value={request.donationDate} />
                <SummaryItem icon={<FaClock />} label="Time" value={request.donationTime} />
                <SummaryItem icon={<FaMapMarkerAlt />} label="Location" value={`${request.recipientDistrict}, ${request.recipientUpazila}`} />
                <SummaryItem icon={<FaHospital />} label="Hospital" value={request.hospitalName} />
              </div>

              {/* Status Indicator */}
              <div className="mt-6 pt-6 border-t border-base-300">
                <p className="text-sm font-medium text-base-content/70 mb-2">Status Timeline</p>
                <div className="space-y-2">
                  {['pending', 'inprogress', 'done'].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                        index === 0 ? 'bg-warning text-warning-content' :
                        step === st ? 'bg-primary text-primary-content' :
                        'bg-base-300 text-base-content/40'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-sm ${
                        step === st ? 'font-bold text-primary' : 'text-base-content/70'
                      }`}>
                        {step.charAt(0).toUpperCase() + step.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips Card */}
              <div className="mt-6 p-4 bg-base-200 rounded-xl border border-base-300">
                <div className="flex items-start gap-2">
                  <FaInfoCircle className="text-info mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-base-content">Important Tips</p>
                    <ul className="text-xs text-base-content/70 mt-1 space-y-1">
                      <li>• Confirm only if you can reach on time</li>
                      <li>• Bring valid ID to the hospital</li>
                      <li>• Ensure you meet donation criteria</li>
                      <li>• Update status after donation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-base-content mb-4">Emergency Contacts</h3>
              
              <div className="space-y-3">
                {request.phoneNumber && (
                  <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-success" />
                      <div>
                        <p className="text-sm font-medium text-base-content">Primary Contact</p>
                        <p className="text-xs text-base-content/70">Requester</p>
                      </div>
                    </div>
                    <a href={`tel:${request.phoneNumber}`} className="link link-success font-bold">
                      {request.phoneNumber}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-error" />
                    <div>
                      <p className="text-sm font-medium text-base-content">Emergency Hotline</p>
                      <p className="text-xs text-base-content/70">24/7 Support</p>
                    </div>
                  </div>
                  <a href="tel:+8801712345678" className="link link-error font-bold">
                    +880 1712-345678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-bold text-base-content">Confirm Donation</h3>
                <p className="text-sm text-base-content/70 mt-1">
                  You're about to commit to this donation request
                </p>
              </div>

              <button
                className="btn btn-ghost btn-sm"
                type="button"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-base-200 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FaUser />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Donor Name</p>
                    <p className="font-semibold text-base-content">{user?.displayName || user?.name || "Your Name"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <MdEmail />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Donor Email</p>
                    <p className="font-semibold text-base-content">{user?.email || "your@email.com"}</p>
                  </div>
                </div>
              </div>

              <div className="alert alert-info">
                <FaInfoCircle />
                <span className="text-sm">
                  This action cannot be undone. Please ensure you can fulfill this donation.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="btn btn-outline rounded-xl"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded-xl gap-2"
                type="button"
                onClick={() => handleInProgress(request._id)}
              >
                <FaCheckCircle />
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-base-content/60">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-base-content/70">{label}</p>
        <p className="font-medium text-base-content truncate">{value || "—"}</p>
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="text-base-content/60">{icon}</div>
        <span className="text-sm text-base-content/70">{label}</span>
      </div>
      <span className="font-semibold text-base-content text-right">{value || "—"}</span>
    </div>
  );
}

export default DonationRequestDetails;