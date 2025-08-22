import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice'; // Import logout action

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Access user data from Redux

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getInitials = (username) => {
    if (!username) return '';
    return username.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    localStorage.removeItem('user-info'); // Clear user info from local storage
  };

  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="max-w-full mx-auto px-6 flex items-center justify-between">
        <div className="cursor-pointer flex items-center justify-center w-full md:w-auto">
          <h1 className="text-xl text-[#1e3a8a] font-semibold">Jadoo</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm text-[#1e3a8a] font-medium">
          <Link to="/flight-search" className="hover:text-[#1e3a8a]">Flight</Link>
          <Link to="/about" className="hover:text-[#1e3a8a]">About</Link>
          <Link to="/contact" className="hover:text-[#1e3a8a]">Contact</Link>
          <Link to="/logout" className="hover:text-[#1e3a8a]">Logout</Link>
          

          {user ? ( // If user is logged in
            <>
              <Link to="/user-dashboard" className="flex items-center space-x-2">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-black font-semibold">{getInitials(user.username)}</span>
                  </div>
                )}
              </Link>
              
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="hover:text-[#1e3a8a] border border-[#1e3a8a] text-[#1e3a8a] px-4 py-1 rounded-full transition-colors duration-200">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="bg-[#1e3a8a] text-white px-4 py-1 rounded-full hover:bg-indigo-700 transition-colors duration-200">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 focus:outline-none">
            <FaBars className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden fixed top-0 right-0 w-1/2 h-full bg-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-black text-2xl">&times;</button>
        <div className="flex flex-col items-center space-y-6 pt-12">
          <Link to="/flight-search" className="text-[#1e3a8a] text-lg font-semibold p-4 w-full text-center hover:bg-indigo-600">Flight</Link>
          <Link to="/about" className="text-[#1e3a8a] text-lg font-semibold p-4 w-full text-center hover:bg-indigo-600">Hotels</Link>
          <Link to="/contact" className="text-[#1e3a8a] text-lg font-semibold p-4 w-full text-center hover:bg-indigo-600">Contact</Link>
          <Link to="/logout" className="text-[#1e3a8a] text-lg font-semibold p-4 w-full text-center hover:bg-indigo-600">Logout</Link>

          {user ? (
            <>
              <Link to="/user-dashboard" className="flex flex-col items-center">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-black font-semibold">{getInitials(user.username)}</span>
                  </div>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#1e3a8a] text-lg font-semibold p-4 w-full text-center hover:bg-indigo-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-[#1e3a8a] text-lg font-semibold p-4 w-full text-center hover:bg-indigo-600">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="bg-[#1e3a8a] text-white text-lg font-semibold p-4 w-full text-center hover:bg-indigo-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
