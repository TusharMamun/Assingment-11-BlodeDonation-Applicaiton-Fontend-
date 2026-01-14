import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahim Ahmed",
      role: "Blood Recipient",
      story: "My daughter needed emergency surgery and we couldn't find B- blood. This platform connected us with 3 donors within 2 hours. Lifesaver!",
      bloodType: "B-",
      rating: 5,
      image: "R"
    },
    {
      name: "Dr. Fatima Khan",
      role: "Hospital Administrator",
      story: "As a medical professional, I've seen this platform revolutionize emergency blood management in our region. Response time has improved by 70%.",
      bloodType: "O+",
      rating: 5,
      image: "F"
    },
    {
      name: "Tasnim Akter",
      role: "Regular Donor",
      story: "I've donated 4 times through this platform. The process is smooth, and knowing I've helped save lives is incredibly rewarding.",
      bloodType: "A+",
      rating: 5,
      image: "T"
    },
    {
      name: "Mohammad Hasan",
      role: "Volunteer Coordinator",
      story: "Coordinating 200+ donors has never been easier. The dashboard features make management seamless for our volunteer team.",
      bloodType: "AB+",
      rating: 4,
      image: "M"
    }
  ];

  const stats = [
    { number: "1,500+", label: "Lives Saved" },
    { number: "5,000+", label: "Registered Donors" },
    { number: "2,800+", label: "Successful Donations" },
    { number: "47", label: "Partner Hospitals" }
  ];

  return (
    <section className="py-12 sm:py-16 bg-base-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent mb-4">
            Community Stories
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Stories That Inspire
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Real stories from donors, recipients, and medical professionals
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-base-100 rounded-2xl p-6 text-center border border-base-300 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-base-content/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-base-100 rounded-2xl border border-base-300 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {testimonial.image}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base-content">{testimonial.name}</h4>
                      <p className="text-sm text-base-content/70">{testimonial.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {testimonial.bloodType}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-sm ${
                          i < testimonial.rating ? 'text-warning' : 'text-base-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative pl-6">
                <FaQuoteLeft className="absolute left-0 top-0 text-base-300 text-xl" />
                <p className="text-base-content/80 italic">
                  "{testimonial.story}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-base-100 to-base-200 rounded-2xl border border-base-300 p-8 inline-block">
            <h3 className="text-xl font-bold text-base-content mb-3">
              Share Your Story
            </h3>
            <p className="text-base-content/70 mb-6 max-w-md">
              Have you donated or received blood through our platform? Share your experience to inspire others.
            </p>
            <button className="btn btn-primary rounded-xl px-8">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;