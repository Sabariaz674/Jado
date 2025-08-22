import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import Layout from './components/common/Layout';
import Home from './pages/homePages/Hero';
import FlightSearch from './pages/homePages/FlightSearch';
import AdminDashboard from './pages/adminDashboardPages/AdminDashboard';
import UserDashboard from './pages/userDashboardPages/UserDashboard';
import AdminLayout from './components/adminPagesComponents/adminlayout/AdminLayout';
import AddBooking from './pages/adminDashboardPages/AddBooking';
import FlightSchedule from './pages/adminDashboardPages/FlightSchedule';
import SignUp from './pages/homePages/SignUp';
import Login from './pages/homePages/Login';
import PassengerInfo from './pages/homePages/PassengerInfo';
import SeatSelection from './pages/homePages/SeatSelection';


function App() {
 
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        {/* Routes for all other pages under Layout */}
        <Route path='/user-dashboard' element={<UserDashboard />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="flight-search" element={<FlightSearch />} />
          <Route path='passenger-info' element={<PassengerInfo/>}/>
          <Route path='seat-selection' element={<SeatSelection />}/>
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/add-booking' element={<AddBooking />} />
          <Route path='/schedule' element={<FlightSchedule />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;