import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const sidebarRef = useRef(null); 

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    
    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
     
      <div
        ref={sidebarRef}
        className={`pt-24 fixed left-0 top-0 h-full bg-white w-64 shadow-lg transition-all
          ${isOpen ? 'block' : 'hidden'} 
          lg:block`}
      >
        
        <div className="absolute top-4 right-4 z-50 lg:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="p-4 flex flex-col">
        
          <div className="mb-8">
            <div className="text-2xl font-bold text-yellow-700">
              <span className="text-[#1e3a8a]">Jadoo</span>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="add-booking"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-book"></i>
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/flight-schedule"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-calendar"></i>
                  <span>Schedule</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/payments"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-credit-card"></i>
                  <span>Payments</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-envelope"></i>
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-location-arrow"></i>
                  <span>Flight Tracking</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md"
                >
                  <i className="fas fa-tag"></i>
                  <span>Deals</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal section with toggle button (for mobile and medium screens) */}
      <div className="w-full bg-[#1e3a8a] flex justify-between lg:hidden">
        <button onClick={toggleMenu} className="text-white text-3xl">
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </div>

    </div>
  );
};

export default AdminMenu;
