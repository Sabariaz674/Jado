import React from "react";

const AdminStatCard = ({ title, value, percentage, icon, altText }) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md flex flex-col justify-between w-full sm:w-1/2 md:w-3/3 lg:w-4/4">
      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-700 mt-3 sm:mt-5">
        {title}
      </h2>

      {/* Value */}
      <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-3 sm:mt-4">
        <div className="bg-[#1e3a8a] text-white py-1 px-3 rounded-lg text-xs sm:text-sm">
          {percentage}
        </div>
        <div className="flex justify-end items-center">
          <img
            src={icon}
            alt={altText}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminStatCard;
