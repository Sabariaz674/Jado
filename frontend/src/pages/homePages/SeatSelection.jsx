import React, { useState } from "react";
import EconomySeat from "../../components/userPagesComponents/passengerLnfo/EconomySeat";
import BusinessSeat from "../../components/userPagesComponents/passengerLnfo/BusinessSeat";
import economy from "../../assets/economy.png";
import business from "../../assets/business.png";

const SeatSelection = () => {
  const [activeClass, setActiveClass] = useState("economy");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side: Seat Map */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-lg">
          {activeClass === "economy" ? <EconomySeat /> : <BusinessSeat />}
        </div>
      </div>

      {/* Right Side: Flight Info & Tabs */}
      <div className="w-full md:flex-1 bg-white shadow-xl flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-t-3xl md:rounded-none">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`flex-1 py-2 font-semibold transition-colors text-sm sm:text-base ${
              activeClass === "economy"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveClass("economy")}
          >
            Economy
          </button>
          <button
            className={`flex-1 py-2 font-semibold transition-colors text-sm sm:text-base ${
              activeClass === "business"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveClass("business")}
          >
            Business
          </button>
        </div>

        {/* Flight Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">SFO → NRT</h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Feb 25, 7:00AM — Mar 21, 12:15PM
          </p>
        </div>

        {/* Class Info */}
        {activeClass === "economy" ? (
          <div className="space-y-3 text-sm">
            <p>✅ Built-in entertainment system</p>
            <p>✅ Complimentary snacks and drinks</p>
            <p>✅ One free carry-on and personal item</p>
            <img
              src={economy}
              alt="Economy Seats"
              className="w-full rounded-lg object-cover"
            />
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <p>✅ Extended leg room</p>
            <p>✅ Two free checked bags</p>
            <p>✅ Priority boarding</p>
            <p>✅ Personalized service</p>
            <p>✅ Enhanced food and drink</p>
            <p>✅ Seats recline 40% more</p>
            <p>✅ Upgrade your seat for only $199</p>
            <img
              src={business}
              alt="Business Seats"
              className="w-full rounded-lg object-cover"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-6">
          <button className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition">
            Save & Close
          </button>
          <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;