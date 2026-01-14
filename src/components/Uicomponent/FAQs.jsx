import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register as a blood donor?",
      answer: "Simply click on 'Register' in the navigation, fill out your details including blood type and location, and verify your email. The process takes less than 5 minutes."
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we use end-to-end encryption and follow strict data protection protocols. Your contact information is only shared when you accept a donation request."
    },
    {
      question: "How quickly can I find a donor in an emergency?",
      answer: "Our platform connects you with available donors in your area within minutes. Average response time is 15-30 minutes for urgent requests."
    },
    {
      question: "Can I donate if I have medical conditions?",
      answer: "Certain conditions may affect eligibility. We recommend consulting with healthcare professionals. The platform provides basic eligibility guidelines."
    },
    {
      question: "How does the donation tracking work?",
      answer: "Each donation request goes through status updates: Pending → In Progress → Completed/Cancelled. Both donors and recipients can track progress."
    },
    {
      question: "Are there any costs involved?",
      answer: "The platform is completely free for donors and recipients. Hospital procedures may have standard medical costs."
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-base-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent mb-4">
            FAQs
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Find answers to common questions about blood donation and our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-base-200 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-base-content">{faq.question}</span>
                  <span className="text-primary">
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-base-300">
                    <p className="text-base-content/80">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold text-base-content mb-2">24/7 Helpline</h4>
              <p className="text-sm text-base-content/70">Emergency support available</p>
              <p className="text-primary font-semibold mt-2">+880 10204626</p>
            </div>

            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-base-content mb-2">Email Support</h4>
              <p className="text-sm text-base-content/70">Get detailed responses</p>
              <p className="text-secondary font-semibold mt-2">tusahr@blooddonation.com</p>
            </div>

            <div className="bg-base-100 rounded-2xl border border-base-300 p-6 text-center">
              <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h4 className="font-bold text-base-content mb-2">Live Chat</h4>
              <p className="text-sm text-base-content/70">Instant messaging support</p>
              <button className="btn btn-accent btn-sm mt-2">Start Chat</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;