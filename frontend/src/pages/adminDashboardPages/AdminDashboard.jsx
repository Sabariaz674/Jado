import React from 'react';
import DashboardContent from '../../components/adminPagesComponents/DashboardContent';
import TicketSalesGraph from '../../components/adminPagesComponents/TicketSalesGraph';
import { stats } from "../../data"
import DashboardBookings from '../../components/adminPagesComponents/DashboardBookings';


const AdminDashboard = () => {

  return (
    <>

      <DashboardContent stats={stats} />
      <TicketSalesGraph />
      <DashboardBookings />


    </>

  );
};

export default AdminDashboard;
