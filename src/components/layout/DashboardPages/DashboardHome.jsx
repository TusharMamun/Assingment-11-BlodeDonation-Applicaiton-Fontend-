import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import MyLatestCompnent from "../../../Pages/Funding/MyLatestCompnent";
import { 
  FaHeartbeat, 
  FaTint, 
  FaBell, 
  FaCalendarAlt, 
  FaChartLine, 
  FaUserCheck,
  FaShieldAlt,
  FaMedal,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaUsers
} from "react-icons/fa";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  // Update time and greeting
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // Set greeting based on time
      if (hours < 12) setGreeting("Good Morning");
      else if (hours < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
      
      // Format time
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Mock stats data
  const userStats = {
    totalDonations: 5,
    livesImpacted: 15,
    upcomingDonations: 2,
    points: 1250,
    streakDays: 7
  };

  // Quick actions
  const quickActions = [
    { icon: <FaTint />, title: "Donate Now", desc: "Start new donation", link: "/dashboard/creatDonerRequest", color: "from-red-500 to-pink-500" },
    { icon: <FaBell />, title: "View Requests", desc: "Check your requests", link: "/dashboard/my-donation-requests", color: "from-blue-500 to-cyan-500" },
    { icon: <FaCalendarAlt />, title: "Schedule", desc: "Plan donation", link: "/dashboard/calendar", color: "from-emerald-500 to-green-500" },
    { icon: <FaChartLine />, title: "Progress", desc: "View statistics", link: "/dashboard/analytics", color: "from-purple-500 to-indigo-500" }
  ];

  // Recent activity
  const recentActivity = [
    { action: "Blood Donation", date: "2 hours ago", status: "Completed", icon: <FaCheckCircle className="text-green-500" /> },
    { action: "Profile Updated", date: "Yesterday", status: "Updated", icon: <FaUserCheck className="text-blue-500" /> },
    { action: "New Request", date: "3 days ago", status: "Pending", icon: <FaClock className="text-yellow-500" /> }
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
      </div>
    </div>
  );

  const name = user?.displayName || user?.name || (user?.email ? user.email.split("@")[0] : "Donor");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20"></div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
                  <FaHeartbeat className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span className="h-2 w-2 rounded-full bg-red-500 inline-block mr-2"></span>
                    {greeting} • {currentTime}
                  </p>
                  <h1 className="mt-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                      {name}
                    </span>
                  </h1>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-8">
                Your generosity has already impacted{" "}
                <span className="font-bold text-red-600 dark:text-red-400">{userStats.livesImpacted}+ lives</span>.
                Continue your lifesaving journey with us.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Donations</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalDonations}</p>
                    </div>
                    <FaTint className="text-red-500 text-xl" />
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Lives Saved</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.livesImpacted}</p>
                    </div>
                    <FaUsers className="text-emerald-500 text-xl" />
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.points}</p>
                    </div>
                    <FaMedal className="text-yellow-500 text-xl" />
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.streakDays}d</p>
                    </div>
                    <FaShieldAlt className="text-blue-500 text-xl" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard/creatDonerRequest"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 text-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <FaTint className="text-lg" />
                    Create Donation Request
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  to="/dashboard/my-donation-requests"
                  className="group rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent px-6 py-4 text-center font-semibold text-gray-700 dark:text-gray-300 hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    View My Requests
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side - User Card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-6 shadow-2xl overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={name}
                        className="w-16 h-16 rounded-full border-4 border-red-500/30 object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-red-500/30">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white">{name}</h3>
                      <p className="text-red-300">Life Saver</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-sm text-gray-300">Email</p>
                      <p className="text-white font-medium truncate">{user?.email || "—"}</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-sm text-gray-300">Member Since</p>
                      <p className="text-white font-medium">
                        {user?.metadata?.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <p className="text-center text-gray-300 text-sm">
                      Thank you for being a hero ❤️
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{action.desc}</p>
              <div className="mt-4 flex justify-end">
                <FaArrowRight className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity & What's Next */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              <Link to="/dashboard/activity" className="text-sm text-red-600 dark:text-red-400 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : activity.status === 'Updated'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">What's Next</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 text-xl">
                  <FaBell />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Upcoming Donations</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You have {userStats.upcomingDonations} scheduled donations coming up. Stay prepared!
                  </p>
                  <Link to="/dashboard/calendar" className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 text-sm mt-2 hover:underline">
                    View Calendar <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                  <FaUserCheck />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Complete Your Profile</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Update your health information and preferences for better matching.
                  </p>
                  <Link to="/dashboard/profile" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline">
                    Update Profile <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                  <FaMedal />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Achievements</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You're close to earning the "Lifesaver Gold" badge. Donate once more!
                  </p>
                  <Link to="/dashboard/achievements" className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm mt-2 hover:underline">
                    View Badges <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Component */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <MyLatestCompnent />
      </section>

      {/* Bottom Banner */}
      <section className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Together We Save Lives</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Every donation counts. Join our community of heroes making a difference one donation at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="px-6 py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More About Us
            </Link>
            <Link
              to="/community"
              className="px-6 py-3 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;