import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const TeamMembers = () => {
  const team = [
    {
      name: "Dr. Rahim Khan",
      role: "Medical Director",
      expertise: "Hematology Specialist",
      description: "15+ years in blood transfusion services",
      image: "RK"
    },
    {
      name: "Fatima Ahmed",
      role: "Platform Manager",
      expertise: "Tech & Community Outreach",
      description: "Managed 200+ volunteer networks",
      image: "FA"
    },
    {
      name: "Ahmad Siddique",
      role: "Lead Developer",
      expertise: "Full Stack Development",
      description: "Built scalable donation platforms",
      image: "AS"
    },
    {
      name: "Nusrat Jahan",
      role: "Donor Relations",
      expertise: "Community Engagement",
      description: "Connects donors with hospitals",
      image: "NJ"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-base-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Our Team
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Meet The People Behind Our Mission
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            A dedicated team of medical professionals, developers, and volunteers working together to save lives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="bg-base-100 rounded-2xl border border-base-300 p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content text-2xl font-bold mb-4">
                  {member.image}
                </div>
                
                <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                
                <div className="mt-3 px-3 py-1 bg-primary/10 rounded-full">
                  <p className="text-xs font-medium text-primary">{member.expertise}</p>
                </div>
                
                <p className="mt-3 text-sm text-base-content/70">{member.description}</p>
                
                <div className="mt-4 flex items-center gap-3">
                  <a href="#" className="h-8 w-8 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:text-primary hover:bg-base-300 transition-colors">
                    <FaLinkedin className="text-sm" />
                  </a>
                  <a href="#" className="h-8 w-8 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:text-primary hover:bg-base-300 transition-colors">
                    <FaTwitter className="text-sm" />
                  </a>
                  <a href="#" className="h-8 w-8 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:text-primary hover:bg-base-300 transition-colors">
                    <FaGithub className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <p className="text-sm text-base-content/70">Medical Partners</p>
          </div>
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-sm text-base-content/70">Support Available</p>
          </div>
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-base-content/70">Success Rate</p>
          </div>
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">5K+</div>
            <p className="text-sm text-base-content/70">Lives Impacted</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;