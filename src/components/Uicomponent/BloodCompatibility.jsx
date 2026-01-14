import React, { useState } from "react";
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";

const BloodCompatibility = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("O+");
  
  const compatibilityData = {
    "O+": {
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"],
      description: "O+ is the most common blood type (38% of population). Known as the 'universal donor' for Rh-positive recipients.",
      population: "38%"
    },
    "O-": {
      canDonateTo: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["O-"],
      description: "O- is the universal donor. Can donate to anyone but can only receive from O- donors.",
      population: "7%"
    },
    "A+": {
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      description: "A+ is the second most common blood type. Can donate to A+ and AB+ recipients.",
      population: "34%"
    },
    "A-": {
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"],
      description: "A- can donate to both A and AB blood types (positive and negative).",
      population: "6%"
    },
    "B+": {
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      description: "B+ is relatively rare. Can donate to B+ and AB+ recipients.",
      population: "9%"
    },
    "B-": {
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"],
      description: "B- is very rare. Can donate to B and AB blood types.",
      population: "2%"
    },
    "AB+": {
      canDonateTo: ["AB+"],
      canReceiveFrom: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      description: "AB+ is the universal recipient. Can receive from all blood types.",
      population: "3%"
    },
    "AB-": {
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["A-", "B-", "AB-", "O-"],
      description: "AB- is the rarest blood type. Can donate to AB+ and AB- recipients.",
      population: "1%"
    }
  };

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const currentData = compatibilityData[selectedBloodType];

  return (
    <section className="py-12 sm:py-16 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary mb-4">
            <FaQuestionCircle />
            Blood Type Guide
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-3">
            Blood Type Compatibility
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Understanding blood compatibility is crucial for safe transfusions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blood Type Selector */}
          <div className="lg:col-span-1">
            <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
              <h3 className="text-lg font-bold text-base-content mb-4">Select Blood Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
                {bloodTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedBloodType(type)}
                    className={`rounded-xl p-4 text-center transition-all ${
                      selectedBloodType === type
                        ? 'bg-primary text-primary-content border-2 border-primary'
                        : 'bg-base-100 text-base-content border border-base-300 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-1">{type}</div>
                    <div className="text-xs opacity-80">
                      {compatibilityData[type].population} population
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Compatibility Info */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-base-300 to-base-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-base-content">
                      {selectedBloodType} Blood Type
                    </h3>
                    <p className="text-sm text-base-content/70 mt-1">
                      {currentData.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{selectedBloodType}</div>
                    <div className="text-sm text-base-content/70">Selected Type</div>
                  </div>
                </div>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Can Donate To */}
                <div className="bg-base-200 rounded-xl p-5">
                  <h4 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                    Can Donate To <FaArrowRight className="text-success" />
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {currentData.canDonateTo.map(type => (
                      <div
                        key={`donate-${type}`}
                        className="rounded-lg bg-success/20 border border-success/30 px-4 py-2"
                      >
                        <span className="font-bold text-success">{type}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-base-content/70 mt-4">
                    This blood type can safely donate to {currentData.canDonateTo.length} blood types
                  </p>
                </div>

                {/* Can Receive From */}
                <div className="bg-base-200 rounded-xl p-5">
                  <h4 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
                    Can Receive From <FaArrowRight className="text-error" />
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {currentData.canReceiveFrom.map(type => (
                      <div
                        key={`receive-${type}`}
                        className="rounded-lg bg-error/20 border border-error/30 px-4 py-2"
                      >
                        <span className="font-bold text-error">{type}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-base-content/70 mt-4">
                    This blood type can safely receive from {currentData.canReceiveFrom.length} blood types
                  </p>
                </div>
              </div>

              {/* Compatibility Chart */}
              <div className="p-6 border-t border-base-300">
                <h4 className="text-lg font-bold text-base-content mb-4">Quick Reference</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-base-300">
                        <th className="text-left py-3 font-semibold text-base-content">Blood Type</th>
                        <th className="text-left py-3 font-semibold text-base-content">Can Donate To</th>
                        <th className="text-left py-3 font-semibold text-base-content">Can Receive From</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bloodTypes.slice(0, 4).map(type => (
                        <tr key={type} className="border-b border-base-300/50">
                          <td className="py-3 font-bold text-base-content">{type}</td>
                          <td className="py-3 text-base-content/80">
                            {compatibilityData[type].canDonateTo.join(", ")}
                          </td>
                          <td className="py-3 text-base-content/80">
                            {compatibilityData[type].canReceiveFrom.join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodCompatibility;