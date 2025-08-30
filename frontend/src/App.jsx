import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/common/Layout';
import Home from './pages/userPages/Home';
import FlightSearch from './pages/userPages/FlightSearch';
import AdminDashboard from './pages/adminDashboardPages/AdminDashboard';
import UserDashboard from './pages/userDashboardPages/UserDashboard';
import AdminLayout from './components/adminPagesComponents/adminlayout/AdminLayout';
import AddBooking from './pages/adminDashboardPages/AddBooking';
import FlightSchedule from './pages/adminDashboardPages/FlightSchedule';
import SignUp from './pages/userPages/SignUp';
import Login from './pages/userPages/Login';
import PassengerInfo from './pages/userPages/PassengerInfo';
import SeatSelection from './pages/userPages/SeatSelection';
import About from './pages/userPages/About';
import Contact from './pages/userPages/Contact';
import Payment from './pages/userPages/Payment';
import ProtectedRoute from './components/common/ProtectedRoute';
import AddFlightForm from './components/adminPagesComponents/AddFlightForm'

function App() {
  

  return (
    <Routes>
      {/* User Dashboard */}
      <Route path="/user-dashboard" element={<UserDashboard />} />

      {/* User Layout Pages */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="flight-search" element={<FlightSearch />} />
        <Route path="passenger-info" element={<PassengerInfo />} />
        <Route path="seat-selection" element={<SeatSelection />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="payment" element={<ProtectedRoute><Payment /></ProtectedRoute>}
        />
      </Route>

      {/* Admin Layout Pages */}
      
      <Route element={<AdminLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-booking" element={<AddBooking />} />
        <Route path="/flight-schedule" element={<FlightSchedule />} />
       <Route path="/flight-form" element={<AddFlightForm />} />
       <Route path="flight-form/:id" element={<AddFlightForm />} />

        

      </Route>
    </Routes>
  );
}

export default App;
