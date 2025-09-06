import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  const handleLogout = () => {

    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`pt-24 fixed left-0 top-0 h-full bg-white w-64 shadow-lg transition-all
          ${isOpen ? "block" : "hidden"} 
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
                  to="/add-booking"
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
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white p-2 rounded-md w-full text-left"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toggle button for mobile */}
      <div className="w-full bg-[#1e3a8a] flex justify-between lg:hidden">
        <button onClick={toggleMenu} className="text-white text-3xl">
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
