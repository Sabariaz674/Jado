import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar stays fixed at the top */}
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow bg-gray-50">
        {/* Render the children components here */}
        <Outlet />
      </main>
      
      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
