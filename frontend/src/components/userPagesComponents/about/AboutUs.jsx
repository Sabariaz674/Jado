import React from "react";
import aboutImage from "../../../assets/dubaicountry.jpg"; // Import image

const AboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full">
        {/* Horizontal Line with Text */}
        <div className="flex items-center mb-8">
          <span className="mx-4 text-[#1e3a8a] font-bold text-lg sm:text-xl md:text-2xl">ABOUT US</span> {/* Text */}
          <div className="flex-grow border-t border-[#1e3a8a]"></div> {/* Line */}
        </div>

        {/* Image and Text Content Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Image on the top for smaller screens, left for larger screens */}
          <div className="flex-1 mb-8 md:mb-0 md:mr-8">
            <img
              src={aboutImage} // Use the imported image
              alt="Flight booking"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content on the right for larger screens, top for smaller screens */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1e3a8a] mb-4">
              WORLD’S BEST FLIGHT BOOKING SERVICE FOR YOU
            </h2>
            <p className="text-gray-700 mb-6">
              We provide the best flight booking services globally with great deals, flexible options, and the most reliable air travel solutions.
            </p>

            <p className="text-gray-700 mb-6">
              Whether you're flying for business or leisure, we ensure your journey is seamless from start to finish.
            </p>

            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Fast and Easy Booking Process</li>
              <li>Best Deals on International & Domestic Flights</li>
              <li>24/7 Customer Support to Assist You</li>
              <li>Secure Payments and Instant Confirmation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
