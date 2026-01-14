import { useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Loading from "../Uicomponent/Loadding";
import ThemeToggle from "../Uicomponent/ThemeToggle ";
import { 
  FaUser, 
  FaHeart, 
  FaTint, 
  FaBell, 
  FaCog, 
  FaSignOutAlt, 
  FaHome, 
  FaInfoCircle, 
  FaSearch, 
  FaUsers, 
  FaHospital, 
  FaCalendarAlt,
  FaFire,
  FaAward,
  FaChartLine,
  FaShieldAlt
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/loging");
    } catch (err) {
      console.log("Logout error:", err?.message);
    }
  };

  if (loading) return <Loading />;

  const navClass = ({ isActive }) =>
    [
      "px-3 py-2 rounded-none !bg-transparent font-semibold tracking-wide text-sm uppercase transition-all duration-300",
      isActive
        ? "text-primary border-b-2 border-primary bg-gradient-to-r from-primary/5 to-transparent"
        : "text-base-content/80 hover:text-primary border-b-2 border-transparent hover:border-primary/50 hover:bg-gradient-to-r from-primary/5 to-transparent",
    ].join(" ");

  const publicLinks = useMemo(
    () => [
      { key: "home", label: "Home", to: "/", icon: <FaHome className="h-4 w-4" />, end: true },
      { key: "about", label: "About", to: "/about", icon: <FaInfoCircle className="h-4 w-4" /> },
      { key: "requests", label: "Find Requests", to: "/donation-requests", icon: <FaSearch className="h-4 w-4" /> },
    ],
    []
  );

  const afterLoginLinks = useMemo(
    () => [
      { key: "campaigns", label: "Campaigns", to: "/campaigns", icon: <FaCalendarAlt className="h-4 w-4" /> },
      { key: "donors", label: "Find Donors", to: "/search-donors", icon: <FaUsers className="h-4 w-4" /> },
      { key: "banks", label: "Blood Banks", to: "/blood-banks", icon: <FaHospital className="h-4 w-4" /> },
      { key: "banks", label: "Funding", to: "/funding", icon: <FaHospital className="h-4 w-4" /> },
    ],
    []
  );

  const authLinks = useMemo(
    () => [
      { 
        key: "login", 
        label: "Login", 
        to: "/loging", 
        btnClass: "btn btn-outline btn-sm rounded-xl border-primary/30 text-primary hover:bg-primary hover:border-primary hover:text-white transition-all duration-300" 
      },
      { 
        key: "register", 
        label: "Register", 
        to: "/regester", 
        btnClass: "btn btn-primary btn-sm rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" 
      },
    ],
    []
  );

  const avatarMenu = useMemo(
    () => [
      { 
        key: "dashboard", 
        label: "Dashboard", 
        to: "/dashboard", 
        icon: <FaChartLine className="h-5 w-5" />,
        desc: "Overview & Analytics",
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
      },
      { 
        key: "profile", 
        label: "My Profile", 
        to: "/dashboard/profile", 
        icon: <FaUser className="h-5 w-5" />,
        desc: "Manage your profile",
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
      },
      { 
        key: "donations", 
        label: "My Donations", 
        to: "/dashboard/my-donation-requests", 
        icon: <FaTint className="h-5 w-5" />,
        desc: "Donation history",
        color: "bg-red-500/10 text-red-600 dark:text-red-400"
      },
     
    ],
    []
  );

  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.displayName || user.name || user.fullName || "";
    if (name) {
      const names = name.split(' ');
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getProfileImage = () => {
    if (!user) return null;
    return user.photoURL || user.photoUrl || user.image || null;
  };

  const getDisplayName = () => {
    if (!user) return "User";
    return user.displayName || user.name || user.fullName || user.email?.split('@')[0] || "User";
  };

  const getUserEmail = () => {
    if (!user) return "";
    return user.email || "";
  };

  // User stats (mock data - you can replace with real data)
  const userStats = useMemo(() => ({
    donations: 5,
    requests: 2,
    bloodType: "O+",
    points: 1250
  }), []);

  return (
    <div className="w-full">
      {/* Top Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="bg-base-100/95 backdrop-blur-md border-b border-base-300/50">
        <div className="navbar mx-auto max-w-7xl px-4">
          {/* LEFT */}
          <div className="navbar-start">
            {/* Mobile Menu Button */}
            <div className="dropdown dropdown-bottom lg:hidden">
              <button 
                tabIndex={0} 
                className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Enhanced Mobile Dropdown */}
              <ul className="dropdown-content menu menu-sm z-[9999] mt-3 w-72 rounded-2xl border border-base-300 bg-base-100/95 backdrop-blur-xl p-2 shadow-2xl">
                {/* User Info Section */}
                {user ? (
                  <div className="p-4 mb-2 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      {getProfileImage() ? (
                        <div className="avatar">
                          <div className="h-12 w-12 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100">
                            <img 
                              src={getProfileImage()} 
                              alt={getDisplayName()}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-medium text-white text-lg ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100">
                          {getUserInitials()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-bold text-base-content">{getDisplayName()}</h3>
                        <p className="truncate text-xs text-base-content/60">{getUserEmail()}</p>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-base-200/50 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold text-primary">{userStats.donations}</div>
                        <div className="text-xs text-base-content/60">Donations</div>
                      </div>
                      <div className="bg-base-200/50 rounded-lg p-2 text-center">
                        <div className="text-lg font-bold text-secondary">{userStats.points}</div>
                        <div className="text-xs text-base-content/60">Points</div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Navigation Links */}
                <div className="space-y-1">
                  {publicLinks.map((l) => (
                    <li key={l.key}>
                      <NavLink 
                        to={l.to} 
                        className={({ isActive }) => 
                          `flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-4 border-primary' 
                              : 'hover:bg-base-200'
                          }`
                        }
                      >
                        <div className={`${l.key === 'requests' ? 'text-red-500' : 'text-base-content/60'}`}>
                          {l.icon}
                        </div>
                        <span className="font-medium">{l.label}</span>
                      </NavLink>
                    </li>
                  ))}

                  {user && (
                    <>
                      <div className="divider my-2 before:bg-base-300 after:bg-base-300" />
                      {afterLoginLinks.map((l) => (
                        <li key={l.key}>
                          <NavLink 
                            to={l.to} 
                            className={({ isActive }) => 
                              `flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 ${
                                isActive 
                                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-l-4 border-primary' 
                                  : 'hover:bg-base-200'
                              }`
                            }
                          >
                            <div className="text-base-content/60">
                              {l.icon}
                            </div>
                            <span className="font-medium">{l.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </>
                  )}
                </div>

                {/* Auth Links or User Menu */}
                <div className="divider my-2 before:bg-base-300 after:bg-base-300" />
                
                {!user ? (
                  <div className="space-y-2">
                    {authLinks.map((l) => (
                      <li key={l.key}>
                        <NavLink 
                          to={l.to} 
                          className="block text-center btn btn-primary btn-sm rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                        >
                          {l.label}
                        </NavLink>
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {avatarMenu.map((m) => (
                      <li key={m.key}>
                        <NavLink 
                          to={m.to}
                          className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-300 hover:bg-base-200"
                        >
                          <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${m.color} transition-transform group-hover:scale-110`}>
                            {m.icon}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{m.label}</span>
                            <p className="text-xs text-base-content/60">{m.desc}</p>
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </div>
                )}

                {/* Theme Toggle & Logout */}
                <div className="divider my-2 before:bg-base-300 after:bg-base-300" />
                <li>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="font-medium text-sm">Dark Mode</span>
                    <ThemeToggle compact />
                  </div>
                </li>
                
                {user && (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-error hover:bg-error/10 transition-all duration-300 group"
                    >
                      <div className="h-9 w-9 rounded-lg bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
                        <FaSignOutAlt className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-medium">Logout</span>
                        <p className="text-xs text-base-content/60">Sign out from account</p>
                      </div>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary group-hover:scale-110 transition-transform duration-300">
                <span className="text-lg">🩸</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold uppercase tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  BloodStream
                </p>
                <p className="-mt-1 text-xs font-semibold uppercase tracking-wide text-base-content/70">
                  Lifesaving Network
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER - Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1">
              {publicLinks.map((l) => (
                <li key={l.key}>
                  <NavLink to={l.to} className={navClass}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
              {user && afterLoginLinks.map((l) => (
                <li key={l.key}>
                  <NavLink to={l.to} className={navClass}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end gap-3">
            {/* Notifications */}
            {user && (
              <div className="dropdown dropdown-end">
                <button 
                  tabIndex={0} 
                  className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 relative"
                >
                  <FaBell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-error text-xs flex items-center justify-center text-white animate-pulse">
                    3
                  </span>
                </button>
                <div className="dropdown-content z-[9999] mt-3 w-80 rounded-2xl border border-base-300 bg-base-100/95 backdrop-blur-xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <span className="text-xs text-primary font-semibold">3 new</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <FaTint className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Urgent: O- blood needed</p>
                        <p className="text-xs text-base-content/60">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 border border-green-200 dark:border-green-800">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <FaAward className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">You earned 100 points!</p>
                        <p className="text-xs text-base-content/60">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-purple-50/50 dark:from-purple-900/20 dark:to-purple-900/10 border border-purple-200 dark:border-purple-800">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <FaCalendarAlt className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Upcoming blood drive</p>
                        <p className="text-xs text-base-content/60">1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-ghost w-full mt-3 text-primary">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}

            {/* Theme Toggle */}
            <div className="hidden lg:flex">
              <ThemeToggle />
            </div>

            {!user ? (
              <div className="flex items-center gap-2">
                {authLinks.map((l) => (
                  <NavLink key={l.key} to={l.to} className={l.btnClass}>
                    {l.label}
                  </NavLink>
                ))}
                <div className="lg:hidden">
                  <ThemeToggle />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="lg:hidden">
                  <ThemeToggle />
                </div>

                {/* Points Display */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <FaFire className="h-4 w-4 text-orange-500" />
                  <span className="font-bold text-primary">{userStats.points}</span>
                  <span className="text-xs text-base-content/60">Points</span>
                </div>

                {/* Enhanced Desktop Avatar Dropdown */}
                <div className="dropdown dropdown-end">
                  <button 
                    tabIndex={0} 
                    className="btn btn-ghost btn-circle avatar group relative"
                  >
                    {getProfileImage() ? (
                      <div className="h-10 w-10 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 group-hover:ring-primary transition-all duration-300">
                        <img 
                          src={getProfileImage()} 
                          alt={getDisplayName()}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-medium text-white text-lg ring-2 ring-primary/30 ring-offset-2 ring-offset-base-100 group-hover:scale-110 transition-all duration-300">
                        {getUserInitials()}
                      </div>
                    )}
                    {/* Online Indicator */}
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-base-100"></div>
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  <ul className="dropdown-content menu z-[9999] mt-3 w-80 rounded-2xl border border-base-300 bg-base-100/95 backdrop-blur-xl p-0 shadow-2xl overflow-hidden">
                    {/* Profile Header with Gradient */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"></div>
                      <div className="relative p-6">
                        <div className="flex items-center gap-4">
                          {getProfileImage() ? (
                            <div className="avatar">
                              <div className="h-16 w-16 rounded-full ring-4 ring-white/50 ring-offset-2 ring-offset-primary/30">
                                <img 
                                  src={getProfileImage()} 
                                  alt={getDisplayName()}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-2xl font-bold text-white ring-4 ring-white/50 ring-offset-2 ring-offset-primary/30">
                              {getUserInitials()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-xl text-base-content truncate">{getDisplayName()}</h3>
                            <p className="text-sm text-base-content/70 truncate">{getUserEmail()}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="badge badge-primary badge-sm flex items-center gap-1">
                                <FaShieldAlt className="h-3 w-3" />
                                Verified Donor
                              </span>
                              <span className="badge badge-outline badge-sm">{userStats.bloodType}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-base-200/50 rounded-xl p-3 text-center hover:bg-base-300/50 transition-all duration-300 group">
                          <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">{userStats.donations}</div>
                          <div className="text-xs text-base-content/60 mt-1">Donations</div>
                        </div>
                        <div className="bg-base-200/50 rounded-xl p-3 text-center hover:bg-base-300/50 transition-all duration-300 group">
                          <div className="text-2xl font-bold text-secondary group-hover:scale-110 transition-transform duration-300">{userStats.requests}</div>
                          <div className="text-xs text-base-content/60 mt-1">Requests</div>
                        </div>
                        <div className="bg-base-200/50 rounded-xl p-3 text-center hover:bg-base-300/50 transition-all duration-300 group">
                          <div className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">{userStats.points}</div>
                          <div className="text-xs text-base-content/60 mt-1">Points</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {avatarMenu.map((m) => (
                        <NavLink 
                          key={m.key}
                          to={m.to}
                          className={({ isActive }) => 
                            `group flex items-center gap-3 rounded-xl p-3 mb-1 transition-all duration-300 ${
                              isActive 
                                ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-l-4 border-primary' 
                                : 'hover:bg-base-200'
                            }`
                          }
                        >
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${m.color} group-hover:scale-110 transition-transform duration-300`}>
                            {m.icon}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{m.label}</span>
                            <p className="text-xs text-base-content/60">{m.desc}</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="h-4 w-4 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </NavLink>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="divider my-0" />

                    {/* Bottom Actions */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3 px-2">
                        <span className="font-medium text-sm">Theme</span>
                        <ThemeToggle compact />
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl p-3 text-error hover:bg-error/10 transition-all duration-300 group"
                      >
                        <div className="h-10 w-10 rounded-lg bg-error/10 flex items-center justify-center text-error group-hover:scale-110 transition-transform duration-300">
                          <FaSignOutAlt className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium">Logout</span>
                          <p className="text-xs text-base-content/60">Sign out from your account</p>
                        </div>
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-base-300/50">
                      <p className="text-center text-xs text-base-content/40">
                        BloodStream Pro v1.0 • {new Date().getFullYear()}
                      </p>
                    </div>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent via-secondary to-primary" />
    </div>
  );
};

export default Navbar;