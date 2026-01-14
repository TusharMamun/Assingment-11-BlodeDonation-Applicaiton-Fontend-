import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { 
  FaTint,
  FaHeartbeat,
  FaAmbulance,
  FaHospital,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaSearch,
  FaFilter,
  FaDonate,
  FaHandsHelping,
  FaChartLine,
  FaShieldAlt,
  FaAward,
  FaRegCalendarCheck,
  FaLeaf,
  FaBed,
  FaStar,
  FaEye,
  FaEyeSlash,
  FaMoon,
  FaSun
} from "react-icons/fa";

const BloodBank = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [bloodType, setBloodType] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [statsVisible, setStatsVisible] = useState(true);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [darkMode]);

  // Blood Bank Statistics
  const bloodStats = [
    { 
      icon: <FaTint />, 
      value: "5,248", 
      label: "Units Available", 
      color: "text-red-500",
      change: "+12%",
      details: ["A+: 1,250", "B+: 980", "O+: 2,150", "AB+: 868"]
    },
    { 
      icon: <FaHeartbeat />, 
      value: "1,847", 
      label: "Donors Today", 
      color: "text-pink-500",
      change: "+8%",
      details: ["Active: 1,200", "New: 647"]
    },
    { 
      icon: <FaAmbulance />, 
      value: "234", 
      label: "Emergency Requests", 
      color: "text-orange-500",
      change: "+15%",
      details: ["Pending: 89", "Completed: 145"]
    },
    { 
      icon: <FaUsers />, 
      value: "12,589", 
      label: "Total Donors", 
      color: "text-blue-500",
      change: "+23%",
      details: ["Regular: 8,450", "New: 4,139"]
    }
  ];

  // Blood Inventory
  const bloodInventory = [
    { type: "A+", units: 1250, status: "Adequate", level: 75, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { type: "B+", units: 980, status: "Adequate", level: 65, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { type: "O+", units: 2150, status: "Good", level: 85, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    { type: "AB+", units: 868, status: "Adequate", level: 60, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { type: "A-", units: 420, status: "Low", level: 45, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { type: "B-", units: 380, status: "Low", level: 40, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { type: "O-", units: 320, status: "Critical", level: 35, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    { type: "AB-", units: 180, status: "Critical", level: 30, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" }
  ];

  // Upcoming Blood Drives
  const bloodDrives = [
    {
      id: 1,
      title: "Mega Blood Donation Camp",
      organization: "City General Hospital",
      date: "Dec 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "City Center",
      target: 500,
      current: 387,
      type: "mega",
      priority: "high"
    },
    {
      id: 2,
      title: "Corporate Blood Drive",
      organization: "TechCorp Inc.",
      date: "Dec 18, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Tech Park",
      target: 300,
      current: 210,
      type: "corporate",
      priority: "medium"
    },
    {
      id: 3,
      title: "University Blood Donation",
      organization: "State University",
      date: "Dec 20, 2024",
      time: "8:00 AM - 3:00 PM",
      location: "University Campus",
      target: 400,
      current: 325,
      type: "university",
      priority: "medium"
    },
    {
      id: 4,
      title: "Emergency Blood Collection",
      organization: "Red Cross",
      date: "Dec 22, 2024",
      time: "24 Hours",
      location: "Multiple Centers",
      target: 1000,
      current: 750,
      type: "emergency",
      priority: "high"
    }
  ];

  // Hospital Network
  const hospitals = [
    { name: "City General Hospital", distance: "2.5 km", available: 1250, rating: 4.8, emergency: true },
    { name: "Unity Medical Center", distance: "3.8 km", available: 980, rating: 4.7, emergency: true },
    { name: "Life Care Hospital", distance: "5.2 km", available: 750, rating: 4.9, emergency: true },
    { name: "Community Health Center", distance: "1.5 km", available: 420, rating: 4.5, emergency: false }
  ];

  // Quick Actions
  const quickActions = [
    { icon: <FaDonate />, title: "Donate Blood", desc: "Find nearest donation center", color: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400", link: "/donate" },
    { icon: <FaHandsHelping />, title: "Request Blood", desc: "Emergency blood request", color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400", link: "/request" },
    { icon: <FaCalendarAlt />, title: "Schedule Donation", desc: "Book your donation slot", color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400", link: "/schedule" },
    { icon: <FaHospital />, title: "Find Hospital", desc: "Locate blood banks", color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400", link: "/hospitals" }
  ];

  // Donor Benefits
  const donorBenefits = [
    { icon: <FaHeartbeat />, title: "Free Health Check", desc: "Complete blood analysis" },
    { icon: <FaShieldAlt />, title: "Donor Insurance", desc: "Accident coverage" },
    { icon: <FaLeaf />, title: "Health Refreshments", desc: "Nutritious snacks" },
    { icon: <FaAward />, title: "Recognition", desc: "Certificates & awards" }
  ];

  // Emergency Contacts
  const emergencyContacts = [
    { name: "Emergency Hotline", number: "106", icon: <FaAmbulance /> },
    { name: "Blood Bank Helpline", number: "01712-345678", icon: <FaPhoneAlt /> },
    { name: "24/7 Support", number: "01712-987654", icon: <FaClock /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Slider */}
      <section className="relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          loop
          className="w-full"
        >
          {/* Slide 1 - Emergency */}
          <SwiperSlide>
            <div className="relative h-[500px] bg-gradient-to-r from-red-900 to-red-700">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600')] bg-cover bg-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white mb-4 backdrop-blur-sm">
                      <FaAmbulance />
                      <span className="animate-pulse">URGENT NEED</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                      <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                        O- Blood
                      </span>
                      <br />
                      Critical Shortage
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-lg">
                      Your donation can save multiple lives. Emergency blood drive happening now.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="px-8 py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg">
                        Donate Now
                      </button>
                      <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - Community */}
          <SwiperSlide>
            <div className="relative h-[500px] bg-gradient-to-r from-blue-900 to-blue-700">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1600')] bg-cover bg-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl ml-auto text-right">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white mb-4 backdrop-blur-sm">
                      <FaUsers />
                      Community Drive
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                      Join the
                      <br />
                      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Lifesaving
                      </span>
                      Community
                    </h1>
                    <p className="text-xl text-white/90 mb-8 ml-auto max-w-lg">
                      Become a regular donor and make a lasting impact in your community.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-end">
                      <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg">
                        Register Now
                      </button>
                      <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                        Find Events
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 - Stats */}
          <SwiperSlide>
            <div className="relative h-[500px] bg-gradient-to-r from-purple-900 to-purple-700">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600')] bg-cover bg-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white mb-4 backdrop-blur-sm">
                      <FaChartLine />
                      Making an Impact
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        10,000+
                      </span>
                      <br />
                      Lives Saved This Year
                    </h1>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                      Join thousands of donors who are making a real difference in people's lives.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button className="px-8 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg">
                        View Impact
                      </button>
                      <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                        Our Story
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Stats Section - Toggleable */}
      {statsVisible && (
        <section className="py-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {bloodStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-3xl ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <span className="text-sm font-semibold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{stat.label}</div>
                  <div className="space-y-1">
                    {stat.details.map((detail, idx) => (
                      <div key={idx} className="text-xs text-gray-500 dark:text-gray-500">{detail}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Can We Help You Today?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Quick access to essential blood bank services
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`h-16 w-16 rounded-xl ${action.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.desc}</p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Inventory */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Inventory Status */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blood Inventory Status</h2>
                  <p className="text-gray-600 dark:text-gray-400">Real-time availability across all blood types</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm">Adequate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Low</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm">Critical</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bloodInventory.map((blood, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className={`text-4xl font-bold mb-2 ${blood.type.includes('-') ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                        {blood.type}
                      </div>
                      <div className={`text-sm font-semibold px-3 py-1 rounded-full ${blood.color} mb-4`}>
                        {blood.status}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {blood.units.toLocaleString()} units
                      </div>
                      <div className="mb-4">
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${blood.level}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {blood.level}% of target
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-6 text-white h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                    <FaAmbulance />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Emergency Contacts</h3>
                    <p className="text-white/80 text-sm">24/7 support available</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
                            {contact.icon}
                          </div>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-white/70">Available 24/7</div>
                          </div>
                        </div>
                        <a 
                          href={`tel:${contact.number}`}
                          className="px-4 py-2 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/80 mb-2">Need immediate assistance?</p>
                  <button className="w-full py-3 bg-white text-red-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:-translate-y-0.5">
                    Emergency Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Blood Drives */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Upcoming Blood Drives</h2>
              <p className="text-gray-600 dark:text-gray-400">Join upcoming donation events in your area</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search drives..." 
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                <FaFilter className="inline mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bloodDrives.map((drive) => (
              <div 
                key={drive.id} 
                className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          drive.priority === 'high' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {drive.priority === 'high' ? 'URGENT' : 'UPCOMING'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold">
                          {drive.type.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {drive.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">{drive.organization}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {Math.round((drive.current / drive.target) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {drive.current}/{drive.target} donors
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Date & Time</div>
                        <div className="font-medium">{drive.date} • {drive.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                        <div className="font-medium">{drive.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                        style={{ width: `${(drive.current / drive.target) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors transform hover:-translate-y-0.5">
                      <FaDonate className="inline mr-2" />
                      Register Now
                    </button>
                    <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Network */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Hospital Network
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Partnered with top hospitals for seamless blood supply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitals.map((hospital, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                    <FaHospital className="text-xl" />
                  </div>
                  {hospital.emergency && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold rounded">
                      24/7
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{hospital.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Distance:</span>
                    <span className="font-medium">{hospital.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Available:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      {hospital.available.toLocaleString()} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="font-medium">{hospital.rating}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donor Benefits */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 dark:bg-red-900/30 px-4 py-2 text-red-600 dark:text-red-400 font-semibold mb-4">
              <FaAward />
              Donor Benefits
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Donate With Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We value our donors and provide exclusive benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donorBenefits.map((benefit, index) => (
              <div 
                key={index} 
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-2xl text-red-600 dark:text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Save a Life?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of heroes. Your donation matters more than you know.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-2xl">
              Become a Donor
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaTint className="text-white text-xl" />
                </div>
                <span className="text-xl font-bold text-white">LifeStream</span>
              </div>
              <p className="text-sm">
                A nationwide blood bank network connecting donors with those in need.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/donate" className="hover:text-white transition-colors">Donate Blood</Link></li>
                <li><Link to="/request" className="hover:text-white transition-colors">Request Blood</Link></li>
                <li><Link to="/hospitals" className="hover:text-white transition-colors">Find Hospitals</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Blood Drives</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact Info</h4>
              <div className="space-y-2">
                <p>123 Health Street, Medical City</p>
                <p>Email: info@lifestream.com</p>
                <p>Phone: +880 1712-345678</p>
                <p>Emergency: 106</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} LifeStream Blood Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BloodBank;