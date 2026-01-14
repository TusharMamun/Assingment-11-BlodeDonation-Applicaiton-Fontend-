import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useUserRole from "../../../Hooks/useUserRole";
import AdminFooter from "../../common/AdminFooter";
import { 
  FaHome, 
  FaUser, 
  FaClipboardList, 
  FaPlusCircle, 
  FaUsers, 
  FaMoneyBillWave, 
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaTint,  // Use FaTint instead of FaDroplet
  FaCalendarCheck,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaUserMd,
  FaSearch,
  FaHeart,
  FaHospital,
  FaStethoscope,
  FaHandHoldingHeart,
  FaFirstAid,
  FaAmbulance,
  FaSyringe
} from "react-icons/fa";

/* ---------- Updated Color Variables ---------- */
const THEME_COLORS = {
  // Primary brand colors - Deep red/medical theme
  primary: "#C62828", // Deep red - represents blood
  primaryLight: "#FF5252", // Lighter red for accents
  primaryDark: "#8B0000", // Darker red for contrast
  
  // Secondary colors - Medical/health theme
  secondary: "#1E88E5", // Professional blue for trust
  accent: "#00C853", // Green for success/health
  warning: "#FF9800", // Orange for alerts
  
  // Neutrals with cool tone
  sidebarBg: "#0A1929", // Deep navy blue sidebar
  sidebarText: "#E3F2FD", // Light blue text
  sidebarHover: "#1E3A5F", // Hover state
  cardBg: "#FFFFFF",
  cardDarkBg: "#132F4C"
};

/* ---------- Updated Styles ---------- */
const navClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 w-full group ${
    isActive 
      ? "bg-gradient-to-r from-red-900/30 to-red-800/20 text-white border-l-4 border-red-400 shadow-lg" 
      : "text-blue-100/80 hover:bg-blue-900/30 hover:text-white hover:border-l-4 hover:border-red-400/50"
  }`;

const IconWrap = ({ children, active }) => (
  <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
    active 
      ? "bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg" 
      : "bg-blue-900/30 text-blue-200/70 group-hover:text-white group-hover:bg-red-600/30"
  }`}>
    {children}
  </span>
);

/* ---------- Component ---------- */
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notifications] = useState(3);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [role, IsRoleLoadding] = useUserRole();

  useEffect(() => {
    const el = document.getElementById("dash-drawer");
    if (el) el.checked = false;
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logOut?.();
      navigate("/", { replace: true });
    } catch (e) {
      console.log("Logout error:", e?.message);
    }
  };

  const sidebarWidth = collapsed ? "w-20 lg:w-20" : "w-72 lg:w-72";

  // User stats
  const userStats = {
    donations: 5,
    requests: 2,
    points: 1250,
    livesSaved: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="drawer lg:drawer-open">
        <input id="dash-drawer" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex min-w-0 flex-col">
          {/* Top Navigation Bar */}
          <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <label htmlFor="dash-drawer" className="btn btn-ghost btn-circle lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>

                <div className="leading-tight">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Welcome to</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    BloodStream Lifesaving Network
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* User Profile */}
                <div className="flex items-center gap-3">
                  {user?.photoURL ? (
                    <img 
                      className="h-10 w-10 rounded-full object-cover border-2 border-red-500"
                      src={user.photoURL} 
                      alt="avatar" 
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-600 to-blue-600 grid place-items-center font-bold text-white">
                      {user?.displayName?.[0] || "U"}
                    </div>
                  )}
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {user?.displayName || "User"}
                    </p>
                    {!IsRoleLoadding && role && (
                      <p className="text-xs text-red-500 dark:text-red-400 font-medium">{role.toUpperCase()}</p>
                    )}
                  </div>
                </div>

                {/* Notifications */}
                <div className="dropdown dropdown-end">
                  <button className="btn btn-ghost btn-circle relative hover:bg-red-500/10">
                    <FaBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-red-600 to-red-400 text-xs flex items-center justify-center text-white animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>
                  <div className="dropdown-content menu mt-3 w-80 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-500/5 to-transparent">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white">Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{notifications} new alerts</p>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {[
                        { title: "Urgent: O- Blood Needed", time: "15 min ago", icon: <FaTint className="text-red-500" />, urgent: true },
                        { title: "New Campaign: Save Lives", time: "2 hours ago", icon: <FaCalendarCheck className="text-blue-500" /> },
                        { title: "Donation Successful", time: "1 day ago", icon: <FaHeart className="text-green-500" /> },
                      ].map((notif, index) => (
                        <div key={index} className={`p-3 rounded-lg transition-colors ${notif.urgent ? 'bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{notif.icon}</div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 dark:text-white">{notif.title}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{notif.time}</p>
                            </div>
                            {notif.urgent && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className="btn btn-sm w-full bg-gradient-to-r from-red-600 to-blue-600 text-white border-none hover:opacity-90">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6">
            <div className="rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700/50 min-h-[calc(100vh-10rem)] p-6">
              <Outlet />
            </div>
            <AdminFooter />
          </main>
        </div>

        {/* SIDEBAR - Updated with Medical Theme */}
        <div className="drawer-side">
          <label htmlFor="dash-drawer" className="drawer-overlay" />

          <aside 
            className={`h-full ${sidebarWidth} bg-gradient-to-b from-gray-900 to-blue-900 border-r border-blue-800 dark:border-gray-800 p-4 transition-all duration-300 shadow-2xl`}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between gap-2 px-2 py-4 mb-6">
                <Link
                  to="/"
                  className={`flex items-center gap-3 font-extrabold ${collapsed ? "hidden" : "flex"}`}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-red-600 to-red-800 shadow-lg">
                    <FaHandHoldingHeart className="h-7 w-7 text-white" />
                  </div>

                  <div className="leading-tight">
                    <div className="text-lg font-bold text-white">BloodStream</div>
                    <div className="text-xs text-red-400 font-medium">Lifesaving Network</div>
                  </div>
                </Link>

                <button
                  onClick={() => setCollapsed((v) => !v)}
                  className="btn btn-ghost btn-square btn-sm text-blue-200 hover:text-white hover:bg-white/10"
                  title={collapsed ? "Expand" : "Collapse"}
                  type="button"
                >
                  {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>
              </div>

              {/* User Profile */}
              <div className="mb-8 px-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-800/50 to-gray-900/50 border border-blue-700/30">
                  {user?.photoURL ? (
                    <img 
                      className="h-12 w-12 rounded-full object-cover border-2 border-red-500" 
                      src={user.photoURL} 
                      alt="avatar" 
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-600 to-blue-600 grid place-items-center font-bold text-white text-lg shadow-lg">
                      {user?.displayName?.[0] || "U"}
                    </div>
                  )}

                  <div className={`${collapsed ? "hidden" : "block"} min-w-0`}>
                    <p className="text-sm font-semibold text-white truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-red-400 truncate">Life Saver</p>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="space-y-2">
                  {/* Common Menu */}
                  <NavLink to="/dashboard" className={navClass} title="Dashboard">
                    <IconWrap active={location.pathname === '/dashboard'}><FaHome /></IconWrap>
                    <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>Dashboard</span>
                  </NavLink>

                  <NavLink to="/dashboard/profile" className={navClass} title="Profile">
                    <IconWrap active={location.pathname.includes('/dashboard/profile')}><FaUser /></IconWrap>
                    <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>Profile</span>
                  </NavLink>

                  {/* Loading Placeholder */}
                  {IsRoleLoadding ? (
                    <div className="rounded-xl bg-blue-900/30 border border-blue-700/30 px-4 py-4 text-center">
                      <div className="loading loading-spinner loading-sm text-red-400"></div>
                      <p className="text-sm text-blue-200 mt-2">Loading menu...</p>
                    </div>
                  ) : (
                    <>
                      {/* ---------------- DONOR MENU ---------------- */}
                      {role === "donor" && (
                        <>
                          <NavLink to="/dashboard/my-donation-requests" className={navClass} title="My Donation Requests">
                            <IconWrap active={location.pathname.includes('/my-donation-requests')}><FaClipboardList /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>My Requests</span>
                          </NavLink>

                          <NavLink to="/dashboard/creatDonerRequest" className={navClass} title="Create Donation Request">
                            <IconWrap active={location.pathname.includes('/creatDonerRequest')}><FaPlusCircle /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>Create Request</span>
                          </NavLink>

                          <NavLink to="/dashboard/mydonation" className={navClass} title="My Funding">
                            <IconWrap active={location.pathname.includes('/mydonation')}><FaMoneyBillWave /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>My Funding</span>
                          </NavLink>
                        </>
                      )}

                      {/* ---------------- VOLUNTEER MENU ---------------- */}
                      {role === "volunteer" && (
                        <>
                          <NavLink to="/dashboard/my-donation-requests" className={navClass} title="My Donation Requests">
                            <IconWrap active={location.pathname.includes('/my-donation-requests')}><FaClipboardList /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>My Requests</span>
                          </NavLink>

                          <NavLink to="/dashboard/all-blood-donation-request" className={navClass} title="All Donation Requests">
                            <IconWrap active={location.pathname.includes('/all-blood-donation-request')}><FaSearch /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>All Requests</span>
                          </NavLink>

                          <NavLink to="/dashboard/creatDonerRequest" className={navClass} title="Create Donation Request">
                            <IconWrap active={location.pathname.includes('/creatDonerRequest')}><FaPlusCircle /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>Create Request</span>
                          </NavLink>

                          <NavLink to="/dashboard/mydonation" className={navClass} title="My Funding">
                            <IconWrap active={location.pathname.includes('/mydonation')}><FaMoneyBillWave /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>My Funding</span>
                          </NavLink>
                        </>
                      )}

                      {/* ---------------- ADMIN MENU ---------------- */}
                      {role === "admin" && (
                        <>
                          <NavLink to="/dashboard/mydonation" className={navClass} title="My Funding">
                            <IconWrap active={location.pathname.includes('/mydonation')}><FaMoneyBillWave /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>My Funding</span>
                          </NavLink>

                          <NavLink to="/dashboard/all-users" className={navClass} title="All Users">
                            <IconWrap active={location.pathname.includes('/all-users')}><FaUsers /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>All Users</span>
                          </NavLink>

                          <NavLink to="/dashboard/all-blood-donation-request" className={navClass} title="All Donation Requests">
                            <IconWrap active={location.pathname.includes('/all-blood-donation-request')}><FaClipboardList /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>All Requests</span>
                          </NavLink>

                          <NavLink to="/dashboard/my-donation-requests" className={navClass} title="My Donation Requests">
                            <IconWrap active={location.pathname.includes('/my-donation-requests')}><FaUserMd /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>My Requests</span>
                          </NavLink>

                          <NavLink to="/dashboard/All-funding" className={navClass} title="All Funding">
                            <IconWrap active={location.pathname.includes('/All-funding')}><FaMoneyBillWave /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>All Funding</span>
                          </NavLink>

                          <NavLink to="/dashboard/creatDonerRequest" className={navClass} title="Create Donation Request">
                            <IconWrap active={location.pathname.includes('/creatDonerRequest')}><FaPlusCircle /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>Create Request</span>
                          </NavLink>

                          <NavLink to="/dashboard/Analysys-donation-status" className={navClass} title="Analysys DonaerRequest">
                            <IconWrap active={location.pathname.includes('/Analysys-donation-status')}><FaChartBar /></IconWrap>
                            <span className={`${collapsed ? "hidden" : "block"} font-medium text-white`}>Analytics</span>
                          </NavLink>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Quick Stats in Sidebar */}
                {!collapsed && !IsRoleLoadding && role && (
                  <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-gray-900/30 border border-blue-700/30 shadow-lg">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <FaStethoscope className="text-red-400" /> Quick Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-700/20">
                        <div className="text-xl font-bold text-white">{userStats.donations}</div>
                        <div className="text-xs text-red-300">Donations</div>
                      </div>
                      <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-700/20">
                        <div className="text-xl font-bold text-white">{userStats.requests}</div>
                        <div className="text-xs text-blue-300">Requests</div>
                      </div>
                      <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-700/20">
                        <div className="text-xl font-bold text-white">{userStats.points}</div>
                        <div className="text-xs text-green-300">Points</div>
                      </div>
                      <div className="text-center p-3 bg-blue-900/20 rounded-lg border border-blue-700/20">
                        <div className="text-xl font-bold text-white">{userStats.livesSaved}</div>
                        <div className="text-xs text-yellow-300">Lives Saved</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <div className="pt-4">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent mb-4" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 w-full text-red-400 hover:bg-red-900/20 hover:text-white group"
                  type="button"
                  title="Logout"
                >
                  <div className="h-10 w-10 rounded-xl bg-red-900/20 flex items-center justify-center text-red-400 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800">
                    <FaSignOutAlt className="h-5 w-5" />
                  </div>
                  <span className={`${collapsed ? "hidden" : "block"} font-medium`}>Logout</span>
                </button>

                {/* Footer */}
                {!collapsed && (
                  <div className="mt-6 text-center">
                    <p className="text-xs text-blue-200/70 mb-1">
                      <span className="font-bold text-red-400">BloodStream</span> Lifesaving Network
                    </p>
                    <p className="text-xs text-blue-200/50">
                      © {new Date().getFullYear()} • Saving Lives Together
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;