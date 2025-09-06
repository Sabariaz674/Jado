import React from "react";
import { FaUsers, FaCheckCircle, FaTrophy } from "react-icons/fa"; // Importing icons from react-icons

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-[#1e3a8a] mb-8">
          Why Book Flights With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-[#1e3a8a] text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">5000+ Happy Travelers</h3>
            <p className="text-gray-600">
              Thousands of customers trust us every month to book affordable and safe flights worldwide.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <FaCheckCircle className="text-[#1e3a8a] text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">100% Secure Booking</h3>
            <p className="text-gray-600">
              With verified airlines and trusted payment gateways, your booking experience is always safe and reliable.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              <FaTrophy className="text-[#1e3a8a] text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-[#1e3a8a] mb-2">28+ Years of Excellence</h3>
            <p className="text-gray-600">
              With decades of experience in the travel industry, we guarantee you the best deals and smooth journeys.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
