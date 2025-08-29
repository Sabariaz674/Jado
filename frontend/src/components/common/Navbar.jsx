import React, { useState, useRef, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import Cookies from 'js-cookie';
import JadoAnimation from './JadoAnimation'; // Import JadoAnimation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { user } = useSelector((state) => state.auth);

  // Load user from cookies if Redux state is empty
  if (!user) {
    const userInfoCookie = Cookies.get('userInfo');
    if (userInfoCookie) {
      try {
        user = JSON.parse(userInfoCookie);
      } catch (err) {
        console.error("Failed to parse user cookie", err);
      }
    }
  }

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
    dispatch(logout());
    Cookies.remove('userInfo');
    Cookies.remove('token');
    navigate('/login'); // redirect to login page
  };

  return (
    <nav className="bg-white py-4 shadow-md">
      <div className="max-w-full mx-auto px-6 flex items-center justify-between">
        
        <div className="mr-6">
          <JadoAnimation /> {/* Here we are using JadoAnimation as the logo */}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-[#1e3a8a] font-medium">
          <Link to="/" className="hover:text-[#1e3a8a]">Home</Link>
          <Link to="/flight-search" className="hover:text-[#1e3a8a]">Flight</Link>
          <Link to="/about" className="hover:text-[#1e3a8a]">About</Link>
          <Link to="/contact" className="hover:text-[#1e3a8a]">Contact</Link>

          {user ? (
            <div className="flex items-center space-x-4">
              {/* Logout Button (left) */}
              <button onClick={handleLogout} className="hover:text-red-600">
                Logout
              </button>
              {/* Profile Avatar (right) */}
              <div 
                onClick={() => navigate('/user-dashboard')} 
                className="cursor-pointer flex items-center"
              >
                {user.image ? (
                  <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-black font-semibold">{getInitials(user.username)}</span>
                  </div>
                )}
              </div>
            </div>
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
      {isOpen && (
        <div ref={menuRef} className="md:hidden px-6 pt-4 pb-6 space-y-4 bg-gray-100">
          <Link to="/" className="hover:text-[#1e3a8a]">Home</Link>
          <Link to="/flight-search" className="block hover:text-[#1e3a8a]">Flight</Link>
          <Link to="/about" className="block hover:text-[#1e3a8a]">About</Link>
          <Link to="/contact" className="block hover:text-[#1e3a8a]">Contact</Link>
          

          {user ? (
            <>
              {/* Logout first */}
              <button onClick={handleLogout} className="block text-red-600">
                Logout
              </button>
              {/* Profile second */}
              <div 
                onClick={() => { setIsOpen(false); navigate('/user-dashboard'); }} 
                className="flex items-center space-x-2 cursor-pointer"
              >
                {user.image ? (
                  <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-black font-semibold">{getInitials(user.username)}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="block">
                <button className="w-full border border-[#1e3a8a] text-[#1e3a8a] px-4 py-2 rounded-full">
                  Sign In
                </button>
              </Link>
              <Link to="/sign-up" className="block">
                <button className="w-full bg-[#1e3a8a] text-white px-4 py-2 rounded-full hover:bg-indigo-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
