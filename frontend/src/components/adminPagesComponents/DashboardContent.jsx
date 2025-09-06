import React, { useEffect, useState } from "react";
import AdminStatCard from "../common/cards/AdminStatCard";
import completedIcon from "../../assets/completed-icon.png";
import activeIcon from "../../assets/active-icon.png";
import revenueIcon from "../../assets/revenue-icon.png";
import { fetchDashboardStats } from "../../api/dashboard";

const DashboardContent = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadStats();
  }, []);

  if (!stats) {
    return <div className="p-7 text-gray-600">Loading dashboard stats...</div>;
  }

  return (
    <div className="flex-grow p-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AdminStatCard
          title="Total Flights"
          value={stats.totalFlights}
          percentage="100%"
          icon={completedIcon}
        />
        <AdminStatCard
          title="Total Bookings"
          value={stats.totalBookings}
          percentage="100%"
          icon={activeIcon}
        />
        <AdminStatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          percentage="100%"
          icon={revenueIcon}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
