// DashboardContent.js
import React from 'react';
import AdminStatCard from '../common/cards/AdminStatCard';
import completedIcon from '../../assets/completed-icon.png';
import activeIcon from '../../assets/active-icon.png';
import canceledIcon from '../../assets/canceled-icon.png';
import revenueIcon from '../../assets/revenue-icon.png';

const DashboardContent = ({ stats }) => {
  // Check if stats is undefined or null
  if (!stats) {
    return (
      <div className=" p-7 text-gray-600">
        Loading dashboard stats...
      </div>
    );
  }

  return (
    <div className="flex-grow p-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard
          title="Completed Flights"
          value={stats.completedFlights}
          percentage={stats.completedPercentage}
          icon={completedIcon}
          altText="Completed"
        />
        <AdminStatCard
          title="Active Flights"
          value={stats.activeFlights}
          percentage={stats.activePercentage}
          icon={activeIcon}
          altText="Active"
        />
        <AdminStatCard
          title="Cancelled Flights"
          value={stats.canceledFlights}
          percentage={stats.canceledPercentage}
          icon={canceledIcon}
          altText="Cancelled"
        />
        <AdminStatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          percentage={stats.revenuePercentage}
          icon={revenueIcon}
          altText="Revenue"
        />
      </div>
    </div>
  );
};

export default DashboardContent;
