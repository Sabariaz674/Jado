
import React from 'react';

const AdminStatCard = ({ title, value, percentage, icon, altText }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-700 mt-5">{title}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="bg-[#1e3a8a] text-white py-1 px-3 rounded-lg text-xs mb-6">
          {percentage}
        </div>
        <div className="flex justify-end items-center mt-4">
          <img src={icon} alt={altText} className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default AdminStatCard;
