import React from 'react';
import DashboardContent from '../../components/adminPagesComponents/DashboardContent';
import TicketSalesGraph from '../../components/adminPagesComponents/TicketSalesGraph';
import FlightListing from '../../components/userPagesComponents/flightSearch/FlightListing';
import {stats} from "../../data"


const AdminDashboard = () => {
  
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
