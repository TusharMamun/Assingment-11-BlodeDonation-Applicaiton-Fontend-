import React from "react";
import { FaCamera, FaEdit, FaUser, FaEnvelope, FaMapMarkerAlt, FaTint, FaShieldAlt } from "react-icons/fa";
import { MdVerified, MdLocationOn } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../components/Uicomponent/Loadding";

const Profile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, isRoleLoading] = useUserRole();

  const { data: Profil, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["Profile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/profile/${user.email}`);
      return data;
    },
  });

  // ✅ Use DB data first, fallback to firebase user
  const name = Profil?.name || user?.displayName || "User";
  const email = Profil?.email || user?.email || "";
  const photo = Profil?.photo || Profil?.photoUrl || user?.photoURL || "";
  const district = Profil?.district || "Not provided";
  const upazila = Profil?.upazila || "Not provided";
  const bloodGroup = Profil?.bloodGroup || "Unknown";
  const status = Profil?.status || "Active";
  const phone = Profil?.phone || "Not provided";
  const lastDonation = Profil?.lastDonation || "Never";

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(name);

  // Handle image error safely
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const nextSibling = e.target.nextElementSibling;
    if (nextSibling && nextSibling.style) {
      nextSibling.style.display = 'flex';
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-base-100 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Profile</h1>
          <p className="text-base-content/70 mt-2">Manage your personal information and preferences</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Profile Card */}
            <div className="overflow-hidden rounded-2xl bg-base-100 shadow-lg border border-base-300">
              {/* Cover Photo */}
              <div className="relative h-48 bg-gradient-to-r from-primary to-secondary">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Cover Actions */}
                <div className="absolute top-4 right-4">
                  <button className="flex items-center gap-2 rounded-full bg-base-100/90 px-4 py-2 text-sm font-medium text-base-content backdrop-blur-sm hover:bg-base-100 transition-colors">
                    <FaCamera className="text-base-content/70" />
                    <span>Change Cover</span>
                  </button>
                </div>

                {/* Profile Image */}
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-2xl border-4 border-base-100 shadow-xl overflow-hidden">
                      {photo ? (
                        <img
                          src={photo}
                          alt={name}
                          className="h-full w-full object-cover"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary-content">{initials}</span>
                        </div>
                      )}
                      {/* Fallback element */}
                      <div className="hidden h-full w-full bg-gradient-to-br from-primary to-accent items-center justify-center">
                        <span className="text-4xl font-bold text-primary-content">{initials}</span>
                      </div>
                    </div>
                    
                    <button className="absolute -bottom-2 -right-2 rounded-full bg-base-100 p-2 shadow-lg hover:bg-base-200 border border-base-300">
                      <FaCamera className="text-base-content/70 text-sm" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-20 px-8 pb-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-bold text-base-content">{isLoading ? "Loading..." : name}</h2>
                      {status === "Active" && (
                        <span className="flex items-center gap-1 rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
                          <MdVerified className="text-success" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-base-content/70 mt-1">{email}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-base-content/70">
                        <MdLocationOn className="text-base-content/50" />
                        <span className="text-sm">{district}, {upazila}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-base-content/70">
                        <FaTint className="text-error" />
                        <span className="text-sm">Blood: {bloodGroup}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/dashboard/updateProfile"
                    state={{
                      name,
                      email,
                      district,
                      upazila,
                      phone,
                      photoUrl: photo,
                      bloodGroup,
                    }}
                    className="btn btn-primary rounded-xl gap-2 px-6 hover:shadow-md transition-shadow self-start"
                  >
                    <FaEdit />
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-base-200 rounded-xl p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FaTint className="text-2xl text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Blood Group</p>
                    <p className="text-xl font-bold text-base-content">{bloodGroup}</p>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-xl p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <FaShieldAlt className="text-2xl text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Status</p>
                    <p className="text-xl font-bold text-base-content">{status}</p>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-xl p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <FaUser className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Role</p>
                    <p className="text-xl font-bold text-base-content">
                      {isRoleLoading ? <Loading /> : role || (Profil && Profil.role) || "User"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-xl p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Last Donation</p>
                    <p className="text-xl font-bold text-base-content">{lastDonation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Side Panel */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
              <div className="bg-gradient-to-r from-base-300 to-base-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-base-content">Contact Information</h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Email</p>
                    <p className="font-medium text-base-content break-all">{email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Phone</p>
                    <p className="font-medium text-base-content">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-base-content/50">Location</p>
                    <div className="space-y-1">
                      <p className="font-medium text-base-content">District: {district}</p>
                      <p className="font-medium text-base-content">Upazila: {upazila}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary px-6 py-4">
                <h3 className="text-lg font-semibold text-primary-content">Quick Actions</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <Link
                  to="/dashboard/updateProfile"
                  state={{
                    name,
                    email,
                    district,
                    upazila,
                    phone,
                    photoUrl: photo,
                    bloodGroup,
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-base-300 hover:border-primary hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-base-content">Update Profile</p>
                      <p className="text-sm text-base-content/70">Edit personal information</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-base-content/40 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  to="/dashboard/my-donation-requests"
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-base-300 hover:border-success hover:bg-success/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                      <FaTint className="text-success" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-base-content">Donation History</p>
                      <p className="text-sm text-base-content/70">View all donations</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-base-content/40 group-hover:text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  to="/dashboard/privacy-settings"
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-base-300 hover:border-secondary hover:bg-secondary/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-base-content">Privacy Settings</p>
                      <p className="text-sm text-base-content/70">Manage your privacy</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-base-content/40 group-hover:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-r from-warning/10 to-warning/5 rounded-2xl border border-warning/20 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-base-content">Profile Strength</h4>
                  <p className="text-sm text-base-content/70 mt-1">Complete your profile for better experience</p>
                </div>
                <span className="text-2xl font-bold text-warning">75%</span>
              </div>
              
              <div className="mt-4">
                <div className="h-2 w-full bg-warning/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-warning to-orange-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <span className="text-base-content/80">Contact info added</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-warning"></div>
                  <span className="text-base-content/80">Blood group pending</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-warning"></div>
                  <span className="text-base-content/80">Location incomplete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;