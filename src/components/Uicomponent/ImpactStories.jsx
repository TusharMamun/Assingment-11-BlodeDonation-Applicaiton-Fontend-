import React, { useState } from "react";
import { FaHeart, FaUserMd, FaUsers, FaAward } from "react-icons/fa";

const ImpactStories = () => {
  const [activeTab, setActiveTab] = useState("donors");

  const stories = {
    donors: [
      {
        name: "Rajib Hossain",
        story: "I've donated blood 12 times through this platform. The ease of finding urgent requests in my area keeps me motivated to donate regularly.",
        location: "Dhaka",
        donations: 12,
        icon: <FaHeart className="text-xl" />
      },
      {
        name: "Sadia Rahman",
        story: "As a universal donor (O-), I get frequent requests. The notification system helps me respond quickly to emergencies.",
        location: "Chittagong",
        donations: 8,
        icon: <FaHeart className="text-xl" />
      }
    ],
    hospitals: [
      {
        name: "Dr. Amina Khatun",
        story: "Our hospital has reduced emergency blood request time by 70% using this platform. Real-time donor availability is life-saving.",
        location: "Medical College Hospital",
        impact: "70% faster response",
        icon: <FaUserMd className="text-xl" />
      },
      {
        name: "Square Hospital",
        story: "Integrating with this platform has streamlined our blood bank management and emergency response procedures.",
        location: "Private Hospital Network",
        impact: "Streamlined process",
        icon: <FaUserMd className="text-xl" />
      }
    ],
    volunteers: [
      {
        name: "Volunteer Network",
        story: "Our team of 50+ volunteers manages donor coordination and ensures timely delivery to hospitals across the region.",
        location: "Nationwide",
        members: 50,
        icon: <FaUsers className="text-xl" />
      }
    ]
  };

  return (
    <section className="py-12 sm:py-16 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary mb-4">
            <FaAward />
            Impact Stories
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Stories That Drive Our Mission
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Real experiences from donors, hospitals, and volunteers making a difference.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "donors", label: "Donors", count: stories.donors.length },
            { id: "hospitals", label: "Hospitals", count: stories.hospitals.length },
            { id: "volunteers", label: "Volunteers", count: stories.volunteers.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 text-base-content hover:bg-base-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs bg-base-100/30 px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stories[activeTab].map((story, index) => (
            <div 
              key={index} 
              className="bg-base-200 rounded-2xl border border-base-300 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {story.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-base-content">{story.name}</h3>
                    <span className="text-xs font-medium px-3 py-1 bg-base-300 rounded-full">
                      {story.location}
                    </span>
                  </div>
                  <p className="text-base-content/80 mb-4">{story.story}</p>
                  <div className="pt-4 border-t border-base-300/50">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {story.donations && (
                          <span className="font-semibold text-primary">{story.donations} donations</span>
                        )}
                        {story.impact && (
                          <span className="font-semibold text-secondary">{story.impact}</span>
                        )}
                        {story.members && (
                          <span className="font-semibold text-accent">{story.members}+ members</span>
                        )}
                      </div>
                      <button className="text-sm font-medium text-primary hover:text-primary-focus">
                        Read full story →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-base-content mb-3">
                Share Your Story
              </h3>
              <p className="text-base-content/70">
                Have you been impacted by our platform? Share your experience and inspire others to join the lifesaving mission.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <button className="btn btn-primary rounded-xl">
                Share Your Story
              </button>
              <button className="btn btn-outline btn-primary rounded-xl">
                Read More Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;