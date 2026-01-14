import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaTint, FaPhone } from "react-icons/fa";

const UrgentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        bloodType: "O+",
        hospital: "Dhaka Medical College",
        location: "Dhaka, Dhaka",
        time: "2 hours ago",
        units: 3,
        phone: "+880 1712345678",
        priority: "urgent"
      },
      {
        id: 2,
        bloodType: "B-",
        hospital: "Chittagong Medical College",
        location: "Chittagong, Chittagong",
        time: "4 hours ago",
        units: 2,
        phone: "+880 1812345678",
        priority: "urgent"
      },
      {
        id: 3,
        bloodType: "A+",
        hospital: "Mymensingh Medical College",
        location: "Mymensingh, Mymensingh",
        time: "6 hours ago",
        units: 1,
        phone: "+880 1912345678",
        priority: "urgent"
      },
      {
        id: 4,
        bloodType: "AB+",
        hospital: "Rajshahi Medical College",
        location: "Rajshahi, Rajshahi",
        time: "8 hours ago",
        units: 2,
        phone: "+880 1612345678",
        priority: "normal"
      }
    ];
    
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const getCardClassName = (priority) => {
    if (priority === 'urgent') {
      return 'border-error/30 bg-error/5';
    }
    return 'border-base-300 bg-base-100';
  };

  const getIconClassName = (priority) => {
    if (priority === 'urgent') {
      return 'bg-error/20 text-error';
    }
    return 'bg-primary/20 text-primary';
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-base-100 to-base-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-error/20 bg-error/10 px-3 py-1 text-sm font-semibold text-error mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse"></span>
            Urgent Blood Requests
            <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse"></span>
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Emergency Blood Needs
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Patients in critical condition need your help. These requests are time-sensitive.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-base-200 rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-base-300 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {requests.map((req) => (
                <div 
                  key={req.id} 
                  className={`rounded-2xl border p-6 transition-all hover:shadow-lg ${getCardClassName(req.priority)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${getIconClassName(req.priority)}`}>
                        <FaTint className="text-2xl" />
                      </div>
                      <div>
                        <p className="text-xs text-base-content/50">Blood Type</p>
                        <p className="text-2xl font-bold text-base-content">{req.bloodType}</p>
                      </div>
                    </div>
                    {req.priority === 'urgent' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-error/20 px-3 py-1 text-xs font-medium text-error">
                        <span className="h-1.5 w-1.5 rounded-full bg-error animate-pulse"></span>
                        URGENT
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-base-content/50" />
                      <span className="text-base-content/80">{req.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaMapMarkerAlt className="text-base-content/50" />
                      <span className="text-base-content/80">{req.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-base-content/50" />
                      <span className="text-base-content/80">{req.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaTint className="text-base-content/50" />
                      <span className="text-base-content/80">{req.units} units needed</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-base-300">
                    <div className="flex items-center justify-between">
                      <a 
                        href={`tel:${req.phone}`}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-focus"
                      >
                        <FaPhone />
                        Call Now
                      </a>
                      <Link
           
                        className="text-sm font-medium text-base-content/70 hover:text-base-content"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/donation-requests"
                className="btn btn-outline btn-primary rounded-xl px-8"
              >
                View All Requests
              </Link>
            </div>
          </>
        )}

        <div className="mt-12 bg-base-100 rounded-2xl border border-base-300 p-6">
          <h3 className="text-lg font-bold text-base-content mb-4">Most Needed Blood Groups</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(group => (
              <div 
                key={group} 
                className={`rounded-xl p-4 text-center ${group === 'O-' ? 'bg-error/10 border border-error/20' : 'bg-base-200'}`}
              >
                <p className="text-xl font-bold text-base-content mb-1">{group}</p>
                <p className="text-xs text-base-content/50">
                  {group === 'O-' ? 'Critical Need' : 'Available'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentRequests;