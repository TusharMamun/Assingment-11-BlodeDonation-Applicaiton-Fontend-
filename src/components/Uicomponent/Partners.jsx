import React from "react";
import { FaHospital, FaHandsHelping, FaShieldAlt } from "react-icons/fa";

const Partners = () => {
  const partners = [
    { name: "Dhaka Medical College", type: "Government Hospital", location: "Dhaka" },
    { name: "Chittagong Medical College", type: "Government Hospital", location: "Chittagong" },
    { name: "Bangabandhu Medical College", type: "Medical College", location: "Dhaka" },
    { name: "Red Crescent Society", type: "NGO", location: "Nationwide" },
    { name: "Square Hospital", type: "Private Hospital", location: "Dhaka" },
    { name: "United Hospital", type: "Private Hospital", location: "Dhaka" },
    { name: "BSMMU", type: "Specialized Hospital", location: "Dhaka" },
    { name: "Kurmitola General Hospital", type: "Military Hospital", location: "Dhaka" }
  ];

  const benefits = [
    {
      icon: <FaHospital className="text-2xl" />,
      title: "Verified Hospitals",
      description: "All partner hospitals are verified and follow strict medical protocols"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Safe Donation",
      description: "Ensured safety standards and post-donation care for all donors"
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "24/7 Support",
      description: "Round-the-clock coordination for emergency blood requirements"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Trusted Network
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Partner Hospitals & Organizations
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Collaborating with leading medical institutions across Bangladesh
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-base-200 rounded-2xl p-6 border border-base-300 hover:border-primary/50 transition-colors"
            >
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-bold text-base-content mb-2">{benefit.title}</h4>
              <p className="text-sm text-base-content/70">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-base-200 rounded-xl p-4 border border-base-300 hover:shadow-md transition-all text-center"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <FaHospital />
              </div>
              <h4 className="font-semibold text-base-content text-sm mb-1">{partner.name}</h4>
              <p className="text-xs text-base-content/70 mb-1">{partner.type}</p>
              <div className="inline-flex items-center gap-1 text-xs text-base-content/50">
                📍 {partner.location}
              </div>
            </div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <div className="mt-12 bg-gradient-to-r from-base-200 to-base-300 rounded-2xl border border-base-300 p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-base-content mb-3">
                Want to become a partner?
              </h3>
              <p className="text-base-content/70">
                Join our network of hospitals and organizations working together to save lives.
                Get access to our donor database and emergency response system.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <button className="btn btn-primary rounded-xl">
                Hospital Registration
              </button>
              <button className="btn btn-outline btn-primary rounded-xl">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;