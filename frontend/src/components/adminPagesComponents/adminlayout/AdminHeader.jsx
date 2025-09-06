import React from "react";
import { useLocation } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();

  // Example: Admin ka name (ye aap context ya localStorage se fetch kar sakte ho)
  const adminName = "Ali Faisal";

  // First letter nikalna
  const firstLetter = adminName.charAt(0).toUpperCase();

  const getTitle = () => {
    switch (location.pathname) {
      case "/admin-dashboard":
        return "Dashboard";
      case "/add-booking":
        return "Bookings";
      case "/flight-schedule":
        return "Schedule";
      case "/messages":
        return "Messages";
      case "/tracking":
        return "Tracking";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 h-auto md:h-16 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
      {/* 🔹 Dynamic Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e3a8a]">
        {getTitle()}
      </h1>

      {/* 🔹 Admin Avatar */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e3a8a] text-white font-bold">
          {firstLetter}
        </div>

      </div>
    </div>
  );
};

export default AdminHeader;
