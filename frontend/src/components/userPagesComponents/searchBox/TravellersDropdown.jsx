import React from "react";
import { FaChevronDown } from "react-icons/fa";

const TravellersDropdown = ({
  dropdownRef,
  open, setOpen,
  adults, setAdults,
  children, setChildren,
  cabinClass, setCabinClass,
}) => {
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-sm font-semibold text-gray-600 mb-1 block">Traveller/class</label>
      <button
        type="button"
        className="flex justify-between items-center w-full p-2 text-left border border-[#1e3a8a] rounded-md text-sm outline-none bg-white"
        onClick={() => setOpen((s) => !s)}
      >
        <span className="truncate">{`${adults} Adult, ${children} Child, ${cabinClass}`}</span>
        <FaChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-64">
          {/* Adults */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-gray-700">Adult</span>
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6"
                onClick={() => setAdults((n) => Math.max(1, n - 1))}
              >-</button>
              <span>{adults}</span>
              <button
                className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6"
                onClick={() => setAdults((n) => n + 1)}
              >+</button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-gray-700">Child</span>
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6"
                onClick={() => setChildren((n) => Math.max(0, n - 1))}
              >-</button>
              <span>{children}</span>
              <button
                className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6"
                onClick={() => setChildren((n) => n + 1)}
              >+</button>
            </div>
          </div>

          
         
        </div>
      )}
    </div>
  );
};

export default TravellersDropdown;
