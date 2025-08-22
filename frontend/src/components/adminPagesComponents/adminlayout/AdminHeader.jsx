import React from 'react';

const AdminHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 h-auto md:h-16 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      {/* Search & Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4 w-full md:w-auto justify-between">
        <input
          type="text"
          placeholder="Search anything"
          className="w-full md:w-auto p-2 text-sm sm:text-base border border-gray-300 rounded-md"
        />
        
      </div>
    </div>
  );
};

export default AdminHeader;
