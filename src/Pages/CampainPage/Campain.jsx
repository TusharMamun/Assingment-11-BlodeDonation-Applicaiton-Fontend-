import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaHeart, 
  FaDonate, 
  FaArrowRight, 
  FaShareAlt, 
  FaBullhorn, 
  FaHandHoldingHeart,
  FaPhone,
  FaTint,
  FaAmbulance,
  FaHospital,
  FaChartLine,
  FaClock,
  FaUserCheck,
  FaStar,
  FaLeaf,
  FaHandsHelping,
  FaRegCalendarCheck,
  FaAward
} from "react-icons/fa";

const Campaigns = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeBloodType, setActiveBloodType] = useState("all");

  // Campaign Data
  const campaigns = [
    {
      id: 1,
      title: "Mega Blood Donation Camp",
      organization: "Red Crescent Society",
      date: "15 December, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Dhaka Medical College Hospital",
      target: 500,
      current: 387,
      priority: "urgent",
      type: "mega",
      bloodTypes: ["A+", "B+", "O+", "AB+"],
      distance: "2.5 km",
      description: "Join us for the largest blood donation camp of the year. Free health checkup and donor certificate provided.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800"
    },
    {
      id: 2,
      title: "Emergency Blood Drive - O-",
      organization: "Emergency Response Team",
      date: "10 December, 2024",
      time: "8:00 AM - 8:00 PM",
      location: "Chittagong Medical College",
      target: 200,
      current: 142,
      priority: "urgent",
      type: "emergency",
      bloodTypes: ["O-"],
      distance: "5.1 km",
      description: "Critical shortage of O- blood type. Your donation can save multiple lives today.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800"
    },
    {
      id: 3,
      title: "Corporate Blood Donation",
      organization: "TechCorp Bangladesh",
      date: "20 December, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "TechCorp HQ, Gulshan",
      target: 150,
      current: 89,
      priority: "normal",
      type: "corporate",
      bloodTypes: ["All Types"],
      distance: "3.8 km",
      description: "Exclusive for corporate employees and their families. Special recognition for donors.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800"
    },
    {
      id: 4,
      title: "University Blood Drive",
      organization: "DU Medical Center",
      date: "25 December, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Dhaka University Campus",
      target: 300,
      current: 210,
      priority: "normal",
      type: "university",
      bloodTypes: ["A+", "B+", "O+", "AB+"],
      distance: "1.2 km",
      description: "Students and faculty blood donation drive. Free t-shirts and refreshments.",
      image: "https://images.unsplash.com/photo-1584467735871-8db9ac8e6b3e?auto=format&fit=crop&w=800"
    },
    {
      id: 5,
      title: "Community Blood Camp",
      organization: "Community Health Center",
      date: "28 December, 2024",
      time: "8:00 AM - 2:00 PM",
      location: "Mirpur Community Center",
      target: 100,
      current: 65,
      priority: "normal",
      type: "community",
      bloodTypes: ["All Types"],
      distance: "0.8 km",
      description: "Local community blood donation event with free health screening.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800"
    },
    {
      id: 6,
      title: "Emergency Plasma Drive",
      organization: "Plasma Donation Network",
      date: "5 January, 2025",
      time: "24 Hours",
      location: "Multiple Locations",
      target: 1000,
      current: 750,
      priority: "urgent",
      type: "plasma",
      bloodTypes: ["Plasma"],
      distance: "Multiple",
      description: "Special plasma donation drive for critical patients. COVID-19 recovered donors welcome.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800"
    }
  ];

  // Upcoming Events
  const upcomingEvents = [
    { id: 1, title: "Blood Donation Workshop", date: "Dec 12, 2024", type: "workshop", attendees: 45 },
    { id: 2, title: "Donor Recognition Ceremony", date: "Dec 18, 2024", type: "ceremony", attendees: 120 },
    { id: 3, title: "Volunteer Training", date: "Dec 22, 2024", type: "training", attendees: 60 },
    { id: 4, title: "Health Awareness Seminar", date: "Jan 5, 2025", type: "seminar", attendees: 200 },
  ];

  // Statistics
  const stats = [
    { label: "Total Campaigns", value: "50+", icon: <FaBullhorn />, change: "+12%" },
    { label: "Lives Impacted", value: "10K+", icon: <FaHeart />, change: "+23%" },
    { label: "Active Volunteers", value: "500+", icon: <FaUsers />, change: "+15%" },
    { label: "Partner Hospitals", value: "47", icon: <FaHospital />, change: "+5" },
  ];

  // Blood Type Demand
  const bloodDemand = [
    { type: "O+", demand: "High", percentage: 85, color: "bg-error" },
    { type: "A+", demand: "Medium", percentage: 65, color: "bg-warning" },
    { type: "B+", demand: "Medium", percentage: 60, color: "bg-warning" },
    { type: "O-", demand: "Critical", percentage: 92, color: "bg-error" },
    { type: "A-", demand: "Low", percentage: 40, color: "bg-success" },
    { type: "AB+", demand: "Low", percentage: 35, color: "bg-success" },
  ];

  // Featured Hospitals
  const featuredHospitals = [
    { name: "Dhaka Medical College", donations: 1250, distance: "1.2km", rating: 4.8 },
    { name: "Square Hospital", donations: 980, distance: "3.5km", rating: 4.9 },
    { name: "Apollo Hospital", donations: 850, distance: "4.2km", rating: 4.7 },
    { name: "United Hospital", donations: 720, distance: "5.0km", rating: 4.8 },
  ];

  // Donor Benefits
  const donorBenefits = [
    { icon: <FaUserCheck />, title: "Health Checkup", description: "Free blood pressure and hemoglobin test" },
    { icon: <FaLeaf />, title: "Refreshments", description: "Healthy snacks and drinks provided" },
    { icon: <FaAward />, title: "Donor Certificate", description: "Official recognition certificate" },
    { icon: <FaStar />, title: "Reward Points", description: "Earn points for future benefits" },
  ];

  // Quick Stats
  const quickStats = [
    { label: "Avg. Donation Time", value: "15 mins", icon: <FaClock /> },
    { label: "Donors This Month", value: "2,458", icon: <FaTint /> },
    { label: "Emergency Requests", value: "47", icon: <FaAmbulance /> },
    { label: "Success Rate", value: "98.5%", icon: <FaChartLine /> },
  ];

  // Filter campaigns
  const filteredCampaigns = activeFilter === "all" 
    ? campaigns 
    : campaigns.filter(campaign => campaign.type === activeFilter || campaign.priority === activeFilter);

  // Calculate progress percentage
  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Slider Banner */}
      <section className="relative overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="w-full"
        >
          {/* Slide 1 - Mega Blood Drive */}
          <SwiperSlide>
            <div className="relative h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary-content/30 bg-primary-content/10 px-4 py-2 text-sm font-semibold text-primary-content mb-4 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-primary-content animate-pulse" />
                      Mega Blood Drive 2024
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-content mb-4">
                      Join the Lifesaving Movement
                    </h1>
                    <p className="text-lg text-primary-content/90 mb-6">
                      Participate in our nationwide blood donation campaigns and help us reach our goal of 10,000 donations this year.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button className="btn bg-primary-content text-primary rounded-xl px-8 hover:bg-primary-content/90">
                        Find a Campaign
                      </button>
                      <button className="btn btn-outline border-primary-content/30 text-primary-content rounded-xl hover:bg-primary-content/10">
                        Organize a Drive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - Emergency Response */}
          <SwiperSlide>
            <div className="relative h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-error/90 to-error/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl ml-auto text-right">
                    <div className="inline-flex items-center gap-2 rounded-full border border-error-content/30 bg-error-content/10 px-4 py-2 text-sm font-semibold text-error-content mb-4 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-error-content animate-pulse" />
                      Emergency Response
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-error-content mb-4">
                      Urgent: O- Blood Needed
                    </h1>
                    <p className="text-lg text-error-content/90 mb-6">
                      Critical shortage of universal donor blood. Your donation today can save multiple lives in emergency situations.
                    </p>
                    <button className="btn bg-error-content text-error rounded-xl px-8 hover:bg-error-content/90">
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 - Volunteer */}
          <SwiperSlide>
            <div className="relative h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-accent-content/30 bg-accent-content/10 px-4 py-2 text-sm font-semibold text-accent-content mb-4 backdrop-blur-sm">
                      <FaUsers />
                      Become a Volunteer
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-content mb-4">
                      Volunteer & Make a Difference
                    </h1>
                    <p className="text-lg text-accent-content/90 mb-6">
                      Join our network of volunteers and help organize blood donation camps in your community.
                    </p>
                    <button className="btn bg-accent-content text-accent rounded-xl px-8 hover:bg-accent-content/90">
                      Join as Volunteer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-base-200 rounded-xl p-4 border border-base-300">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-lg font-bold text-base-content">{stat.value}</div>
                  <div className="text-xs text-base-content/70">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats with Trends */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl">
                  {stat.icon}
                </div>
                <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-base-content mb-1">{stat.value}</div>
              <div className="text-sm text-base-content/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Blood Type Demand Section */}
        <div className="bg-base-200 rounded-2xl border border-base-300 p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                <FaTint className="text-error" />
                Current Blood Type Demand
              </h3>
              <p className="text-base-content/70 mt-1">Real-time demand levels for different blood types</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-6 bg-error rounded" />
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-6 bg-warning rounded" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-6 bg-success rounded" />
                <span>Low</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bloodDemand.map((blood, index) => (
              <div key={index} className="bg-base-100 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-base-content mb-2">{blood.type}</div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className={`badge ${blood.demand === 'Critical' ? 'badge-error' : blood.demand === 'Medium' ? 'badge-warning' : 'badge-success'}`}>
                    {blood.demand}
                  </div>
                </div>
                <div className="h-2 w-full bg-base-300 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full ${blood.color} rounded-full transition-all duration-500`}
                    style={{ width: `${blood.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-base-content/70">{blood.percentage}% demand</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Search */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-base-content">Blood Donation Campaigns</h2>
              <p className="text-base-content/70 mt-2">Find and join upcoming blood donation events</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="form-control">
                <input 
                  type="text" 
                  placeholder="Search campaigns..." 
                  className="input input-bordered w-full sm:w-auto rounded-xl"
                />
              </div>
              <button className="btn btn-primary rounded-xl gap-2">
                <FaCalendar />
                Create Campaign
              </button>
            </div>
          </div>

          {/* Double Filter Row */}
          <div className="space-y-4 mb-6">
            {/* Campaign Type Filters */}
            <div>
              <div className="text-sm font-medium text-base-content/70 mb-2">Filter by Campaign Type</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`btn rounded-xl ${activeFilter === "all" ? "btn-primary" : "btn-ghost"}`}
                >
                  All Campaigns
                </button>
                <button
                  onClick={() => setActiveFilter("urgent")}
                  className={`btn rounded-xl ${activeFilter === "urgent" ? "btn-error" : "btn-ghost"}`}
                >
                  <span className="h-2 w-2 rounded-full bg-error mr-2" />
                  Urgent
                </button>
                <button
                  onClick={() => setActiveFilter("mega")}
                  className={`btn rounded-xl ${activeFilter === "mega" ? "btn-primary" : "btn-ghost"}`}
                >
                  Mega Camps
                </button>
                <button
                  onClick={() => setActiveFilter("corporate")}
                  className={`btn rounded-xl ${activeFilter === "corporate" ? "btn-secondary" : "btn-ghost"}`}
                >
                  Corporate
                </button>
                <button
                  onClick={() => setActiveFilter("community")}
                  className={`btn rounded-xl ${activeFilter === "community" ? "btn-accent" : "btn-ghost"}`}
                >
                  Community
                </button>
                <button
                  onClick={() => setActiveFilter("university")}
                  className={`btn rounded-xl ${activeFilter === "university" ? "btn-info" : "btn-ghost"}`}
                >
                  University
                </button>
              </div>
            </div>

            {/* Blood Type Filters */}
            <div>
              <div className="text-sm font-medium text-base-content/70 mb-2">Filter by Blood Type</div>
              <div className="flex flex-wrap gap-2">
                {["all", "O+", "A+", "B+", "O-", "A-", "AB+", "Plasma"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveBloodType(type)}
                    className={`btn rounded-xl ${activeBloodType === type ? "btn-error" : "btn-ghost"}`}
                  >
                    {type === "all" ? "All Types" : type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCampaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Campaign Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4">
                  {campaign.priority === "urgent" && (
                    <span className="badge badge-error gap-2 px-3 py-2 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-error-content animate-pulse" />
                      URGENT
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="badge badge-primary px-3 py-2 backdrop-blur-sm">
                    {campaign.type.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="badge badge-ghost px-3 py-2 backdrop-blur-sm text-xs">
                    <FaMapMarkerAlt className="mr-1" />
                    {campaign.distance}
                  </span>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-base-content/70 mt-1">{campaign.organization}</p>
                  </div>
                  <button className="btn btn-ghost btn-sm btn-circle">
                    <FaShareAlt className="text-base-content/40 hover:text-primary" />
                  </button>
                </div>

                <p className="text-base-content/80 mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                {/* Blood Type Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {campaign.bloodTypes.map((type, idx) => (
                    <span key={idx} className="badge badge-outline badge-sm">
                      {type}
                    </span>
                  ))}
                </div>

                {/* Info Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCalendar className="text-base-content/50 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-base-content/70">Date & Time</p>
                      <p className="font-medium text-base-content">{campaign.date} • {campaign.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-base-content/50 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-base-content/70">Location</p>
                      <p className="font-medium text-base-content">{campaign.location}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-base-content/70">
                      Progress: {campaign.current}/{campaign.target} donors
                    </span>
                    <span className="font-bold text-primary">
                      {calculateProgress(campaign.current, campaign.target)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-base-300 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${calculateProgress(campaign.current, campaign.target)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="btn btn-primary flex-1 rounded-xl gap-2">
                    <FaDonate />
                    Register Now
                  </button>
                  <Link 
                    to={`/campaigns/${campaign.id}`}
                    className="btn btn-outline btn-primary rounded-xl"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donor Benefits Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-3">Donor Benefits & Rewards</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              As a blood donor, you receive exclusive benefits and contribute to a noble cause
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donorBenefits.map((benefit, index) => (
              <div key={index} className="bg-base-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl text-primary mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-base-content mb-2">{benefit.title}</h4>
                <p className="text-base-content/70 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Two Column Layout: Events & Featured Hospitals */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <FaRegCalendarCheck />
                  Upcoming Events & Workshops
                </h3>
                <Link to="/events" className="link link-primary text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-base-100 rounded-xl hover:bg-base-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        event.type === 'workshop' ? 'bg-primary/10 text-primary' :
                        event.type === 'ceremony' ? 'bg-secondary/10 text-secondary' :
                        event.type === 'training' ? 'bg-accent/10 text-accent' :
                        'bg-info/10 text-info'
                      }`}>
                        <FaCalendar />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base-content">{event.title}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <p className="text-base-content/70">{event.date}</p>
                          <p className="text-base-content/50">•</p>
                          <p className="text-base-content/70">{event.attendees} attendees</p>
                        </div>
                      </div>
                    </div>
                    <FaArrowRight className="text-base-content/40" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Hospitals */}
          <div>
            <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <FaHospital />
                  Featured Hospitals
                </h3>
                <Link to="/hospitals" className="link link-primary text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {featuredHospitals.map((hospital, index) => (
                  <div key={index} className="p-4 bg-base-100 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-base-content">{hospital.name}</h4>
                      <div className="flex items-center gap-1 text-amber-500">
                        <FaStar className="text-sm" />
                        <span className="text-sm font-semibold">{hospital.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-base-content/70">{hospital.donations.toLocaleString()} donations</span>
                      <span className="text-base-content/70">{hospital.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-base-200 rounded-2xl border border-base-300 p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-3">How Blood Donation Works</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              A simple 4-step process to become a lifesaver
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Register", desc: "Sign up for a campaign", icon: <FaUserCheck /> },
              { step: "2", title: "Screening", desc: "Quick health check", icon: <FaHeart /> },
              { step: "3", title: "Donation", desc: "15-20 minute process", icon: <FaTint /> },
              { step: "4", title: "Refresh", desc: "Rest & refreshments", icon: <FaLeaf /> }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-base-100 rounded-xl p-6 text-center">
                  <div className="absolute -top-3 -left-3 h-8 w-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl text-primary mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-base-content mb-2">{item.title}</h4>
                  <p className="text-base-content/70 text-sm">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="h-0.5 w-12 bg-base-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* CTA Card - Organize Campaign */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-primary-content">
            <div className="h-16 w-16 rounded-2xl bg-primary-content/20 flex items-center justify-center text-3xl mb-4">
              <FaHandsHelping />
            </div>
            <h3 className="text-xl font-bold mb-3">Organize a Campaign</h3>
            <p className="text-primary-content/90 mb-6">
              Want to host a blood donation camp in your community or organization? We provide full support and resources.
            </p>
            <button className="btn bg-primary-content text-primary w-full rounded-xl hover:bg-primary-content/90">
              Get Started
            </button>
            
            <div className="mt-6 pt-6 border-t border-primary-content/20">
              <p className="text-sm text-primary-content/80 mb-2">Need help immediately?</p>
              <a href="tel:+8801712345678" className="flex items-center gap-2 text-lg font-bold hover:underline">
                <FaPhone />
                +880 1712-345678
              </a>
            </div>
          </div>

          {/* CTA Card - Become Volunteer */}
          <div className="bg-gradient-to-br from-accent to-accent/80 rounded-2xl p-6 text-accent-content">
            <div className="h-16 w-16 rounded-2xl bg-accent-content/20 flex items-center justify-center text-3xl mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold mb-3">Become a Volunteer</h3>
            <p className="text-accent-content/90 mb-6">
              Join our team of dedicated volunteers. Training provided, flexible hours available.
            </p>
            <button className="btn bg-accent-content text-accent w-full rounded-xl hover:bg-accent-content/90">
              Join Now
            </button>
            
            <div className="mt-6 pt-6 border-t border-accent-content/20">
              <p className="text-sm text-accent-content/80 mb-2">Volunteer Benefits:</p>
              <ul className="text-sm space-y-1">
                <li>✓ Training & Certification</li>
                <li>✓ Community Service Hours</li>
                <li>✓ Networking Opportunities</li>
              </ul>
            </div>
          </div>

          {/* CTA Card - Emergency Request */}
          <div className="bg-gradient-to-br from-error to-error/80 rounded-2xl p-6 text-error-content">
            <div className="h-16 w-16 rounded-2xl bg-error-content/20 flex items-center justify-center text-3xl mb-4">
              <FaAmbulance />
            </div>
            <h3 className="text-xl font-bold mb-3">Emergency Blood Request</h3>
            <p className="text-error-content/90 mb-6">
              Need blood urgently? Submit a request and our network will respond immediately.
            </p>
            <button className="btn bg-error-content text-error w-full rounded-xl hover:bg-error-content/90">
              Request Blood
            </button>
            
            <div className="mt-6 pt-6 border-t border-error-content/20">
              <p className="text-sm text-error-content/80 mb-2">24/7 Emergency Hotline:</p>
              <a href="tel:+8801712345679" className="flex items-center gap-2 text-lg font-bold hover:underline">
                <FaPhone />
                +880 1712-345679
              </a>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-base-200 rounded-2xl border border-base-300 p-8 mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-4 py-2 text-sm font-semibold text-success mb-4">
              <FaHeart />
              Success Stories
            </div>
            <h2 className="text-2xl font-bold text-base-content mb-3">
              Campaigns That Made a Difference
            </h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Read how our campaigns have impacted communities and saved lives across the country.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-base-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🩸</div>
              <h4 className="font-bold text-base-content mb-2">University Mega Drive</h4>
              <p className="text-base-content/70 text-sm mb-4">Collected 1,200+ units from 5 universities</p>
              <div className="text-2xl font-bold text-primary">5,000+ Lives Saved</div>
            </div>
            
            <div className="bg-base-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏥</div>
              <h4 className="font-bold text-base-content mb-2">Corporate Partnership</h4>
              <p className="text-base-content/70 text-sm mb-4">50+ companies participating regularly</p>
              <div className="text-2xl font-bold text-primary">3,500+ Donations</div>
            </div>
            
            <div className="bg-base-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h4 className="font-bold text-base-content mb-2">Community Impact</h4>
              <p className="text-base-content/70 text-sm mb-4">200+ community camps organized</p>
              <div className="text-2xl font-bold text-primary">100% Coverage</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-base-200 rounded-2xl border border-base-300 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-base-content mb-3">Frequently Asked Questions</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Get answers to common questions about blood donation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Who can donate blood?",
                answer: "Generally, donors must be 18-65 years old, weigh at least 50kg, and be in good health. Specific requirements may vary."
              },
              {
                question: "How often can I donate blood?",
                answer: "You can donate whole blood every 56 days (8 weeks). Platelet donations can be made more frequently."
              },
              {
                question: "Is blood donation safe?",
                answer: "Yes, blood donation is extremely safe. All equipment is sterile, single-use, and procedures are conducted by trained professionals."
              },
              {
                question: "How long does it take?",
                answer: "The entire process takes about 45-60 minutes, with the actual donation taking only 8-10 minutes."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-base-100 rounded-xl p-6">
                <h4 className="font-bold text-base-content mb-3">{faq.question}</h4>
                <p className="text-base-content/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-base-300 to-base-200 border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Join thousands of donors and volunteers who are making a difference in their communities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn btn-primary rounded-xl px-8 gap-2">
                <FaDonate />
                Find a Campaign
              </button>
              <button className="btn btn-outline btn-primary rounded-xl px-8 gap-2">
                <FaUsers />
                Become Volunteer
              </button>
              <button className="btn btn-outline rounded-xl px-8 gap-2">
                <FaShareAlt />
                Share Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;