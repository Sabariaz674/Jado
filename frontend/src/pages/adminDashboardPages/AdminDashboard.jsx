import React from 'react';
import DashboardContent from '../../components/adminPagesComponents/DashboardContent';
import TicketSalesGraph from '../../components/adminPagesComponents/TicketSalesGraph';
import FlightListing from '../../components/userPagesComponents/flightSearch/FlightListing';


const AdminDashboard = () => {
  const stats = {
    completedFlights: 152,
    completedPercentage: '92%',
    activeFlights: 24,
    activePercentage: '6%',
    canceledFlights: 8,
    canceledPercentage: '2%',
    totalRevenue: '$45,000',
    revenuePercentage: '12%',
  };

  return (
    <>

      <DashboardContent stats={stats} />
      <TicketSalesGraph />
      <div className=' mt-4'>
        <h1 className="text-3xl font-semibold text-[#1e3a8a] ml-7">All Booking</h1>
        <FlightListing/>
      </div>

    </>

  );
};

export default AdminDashboard;
