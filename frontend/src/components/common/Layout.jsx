import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50"> {/* Ensure this section grows to fill available space */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
