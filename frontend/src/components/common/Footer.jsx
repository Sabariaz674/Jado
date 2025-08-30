import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-4 sm:px-8 md:px-20 py-12 text-sm text-gray-600">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div>
          <h2 className="text-[#1e3a8a] font-bold text-2xl md:text-lg mb-3">Jadoo</h2>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <ul className="space-y-1">
            <li><Link to="/about">About Jadoo</Link></li>
            <li><Link to="/how-it-works">How it works</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Partner with us</h3>
          <ul className="space-y-1">
            <li><Link to="/partnership">Partnership programs</Link></li>
            <li><Link to="/affiliate">Affiliate program</Link></li>
            <li><Link to="/connectivity">Connectivity partners</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
          <ul className="space-y-1">
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Get the app</h3>
          <ul className="space-y-1">
            {/* External links ko <a> hi rehne diya */}
            <li>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                Jadoo for Android
              </a>
            </li>
            <li>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                Jadoo for iOS
              </a>
            </li>
            <li><Link to="/mobile">Mobile site</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center text-xs text-gray-500 gap-4">
        <p className="text-center sm:text-left">© 2025 Jadoo Incorporated</p>
        <div className="flex gap-4 justify-center sm:justify-start">
          {/* Socials external hai isliye <a> */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-indigo-600 cursor-pointer text-xl sm:text-2xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-indigo-600 cursor-pointer text-xl sm:text-2xl" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="hover:text-indigo-600 cursor-pointer text-xl sm:text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
