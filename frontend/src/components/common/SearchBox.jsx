import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const SearchBox = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  
  // Naye dropdown values ke liye state
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");
  const [showTravellersDropdown, setShowTravellersDropdown] = useState(false);

  const [tripType, setTripType] = useState("one-way");
  const [multiTrips, setMultiTrips] = useState([{ from: "", to: "", depart: "" }]);

  // Trip type change ko handle karega (One Way, Round Trip, Multi-City)
  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  // Multi-city trips input changes ko handle karega
  const handleMultiTripChange = (index, field, value) => {
    const newTrips = [...multiTrips];
    newTrips[index][field] = value;
    setMultiTrips(newTrips);
  };

  // Multi-city ke liye naya trip input jode
  const addNewTrip = () => {
    setMultiTrips([...multiTrips, { from: "", to: "", depart: "" }]);
  };

  const handleSearchh = () => {
    // navigate function ko call karega
    navigate('/Search-Ticket');
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4 sm:px-8 mb-25">
      {/* Trip Type Selection Dropdown */}
      <div className="w-full max-w-7xl mb-4">
        <label htmlFor="trip-type" className="sr-only">Trip Type</label>
        <select 
          id="trip-type"
          value={tripType} 
          onChange={handleTripTypeChange}
          className="p-2 border border-[#1e3a8a] rounded-xl w-full sm:w-auto text-sm font-semibold text-[#1e3a8a] outline-none"
        >
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
          <option value="multi-city">Multi-City</option>
        </select>
      </div>

      <div className="flex flex-col shadow-lg w-full max-w-5xl bg-white p-6 rounded-2xl">
        
        {/* Main Search Flex Container */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
          {/* From */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Country, city or airport"
              className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-[#1e3a8a] rounded-md"
            />
          </div>

          {/* To */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Country, city or airport"
              className="text-sm outline-none placeholder-gray-400 p-2 border border-[#1e3a8a] rounded-md"
            />
          </div>

          {/* Depart Date */}
          <div className="flex flex-col flex-1">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Depart</label>
            <input
              type="date"
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
              className="text-sm outline-none w-full p-2 border border-[#1e3a8a] rounded-md"
            />
          </div>

          {/* Return Date - Only for Round Trip */}
          {tripType === "round-trip" && (
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Return</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="text-sm outline-none w-full p-2 border border-[#1e3a8a] rounded-md"
              />
            </div>
          )}

          {/* Travellers and Search Button */}
          <div className="flex flex-col md:flex-row lg:flex-row items-end gap-2 w-full lg:w-auto">
            {/* Travellers Dropdown Button */}
            <div className="relative w-full">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Traveller/class</label>
              <button
                type="button"
                className="flex justify-between items-center w-full p-2 text-left border border-[#1e3a8a] rounded-md text-sm outline-none bg-white"
                onClick={() => setShowTravellersDropdown(!showTravellersDropdown)}
              >
                <span className="truncate">{`${adults} Adult, ${children} Child, ${cabinClass}`}</span>
                <FaChevronDown className={`h-4 w-4 transform transition-transform duration-200 ${showTravellersDropdown ? 'rotate-180' : ''}`} />
              </button>
              {/* Dropdown Content - Ab fixed width hai taake container se bahar na jaaye */}
              {showTravellersDropdown && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-64">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Adult</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                      >-</button>
                      <span>{adults}</span>
                      <button
                        className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setAdults(adults + 1)}
                      >+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-700">Child</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                      >-</button>
                      <span>{children}</span>
                      <button
                        className="bg-gray-200 text-gray-700 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setChildren(children + 1)}
                      >+</button>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="radio" value="economy" checked={cabinClass === 'economy'} onChange={() => setCabinClass('economy')} className="mr-2" /> Economy
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="radio" value="business" checked={cabinClass === 'business'} onChange={() => setCabinClass('business')} className="mr-2" /> Business
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div
              className="bg-[#1e3a8a] hover:bg-blue-800 text-white font-semibold px-6 py-3 flex items-center justify-center rounded-xl cursor-pointer transition w-full mt-4 md:mt-0"
              onClick={handleSearchh}
            >
              Search
            </div>
          </div>
        </div>

        {/* Multi-City Trip Inputs */}
        {tripType === "multi-city" && (
          <div className="w-full mt-4">
            {multiTrips.map((trip, index) => (
              <div key={index} className="flex flex-wrap lg:flex-nowrap gap-2 mb-4 w-full">
                {/* From Field */}
                <div className="p-2 w-full lg:w-1/3">
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">From</label>
                  <input
                    type="text"
                    value={trip.from}
                    onChange={(e) => handleMultiTripChange(index, 'from', e.target.value)}
                    placeholder="Country, city or airport"
                    className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* To Field */}
                <div className="p-2 w-full lg:w-1/3">
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">To</label>
                  <input
                    type="text"
                    value={trip.to}
                    onChange={(e) => handleMultiTripChange(index, 'to', e.target.value)}
                    placeholder="Country, city or airport"
                    className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Depart Field */}
                <div className="p-2 w-full lg:w-1/3">
                  <label className="text-sm font-semibold text-gray-600 mb-1 block">Depart</label>
                  <input
                    type="date"
                    value={trip.depart}
                    onChange={(e) => handleMultiTripChange(index, 'depart', e.target.value)}
                    className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-[#1e3a8a] hover:underline mt-4"
              onClick={addNewTrip}
            >
              + Add another flight
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;