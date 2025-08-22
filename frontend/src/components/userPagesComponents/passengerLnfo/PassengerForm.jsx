import React from 'react';
import { useNavigate } from 'react-router-dom';

const PassengerForm = () => {
 
  const navigate = useNavigate();

 
  const handleSelectSeats = () => {
    
    navigate('/seat-selection');
  };

  return (
    <div className="flex-1 w-full lg:w-auto bg-white rounded-xl shadow-lg p-6 lg:p-10">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Passenger information</h2>
        <p className="text-sm text-gray-500 max-w-2xl">
          Enter the required information for each traveler and be sure that it exactly matches
          the government-issued ID presented at the airport.
        </p>
      </div>

      {/* Passenger 1 (Adult) Form */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Passenger 1 (Adult)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">First name*</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Middle</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Last name*</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Suffix</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          {/* Gender selection added here */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Gender*</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input type="radio" id="male" name="gender" value="male" className="h-4 w-4 text-[#1e3a8a] focus:ring-[#1e3a8a] border-gray-300" />
                <label htmlFor="male" className="ml-2 text-sm text-gray-700">Male</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="female" name="gender" value="female" className="h-4 w-4 text-[#1e3a8a] focus:ring-[#1e3a8a] border-gray-300" />
                <label htmlFor="female" className="ml-2 text-sm text-gray-700">Female</label>
              </div>
            </div>
          </div>
          {/* End of new gender section */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Date of birth*</label>
            <input type="text" placeholder="MM/DD/YYYY" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Email address*</label>
            <input type="email" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Phone number*</label>
            <input type="tel" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Redress number</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Known traveller number</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
        </div>
      </div>

      {/* Emergency Contact Information (rest of the form remains the same) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Emergency contact information</h3>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="sameAsPassenger1" className="mr-2 h-4 w-4 text-[#1e3a8a] focus:ring-[#1e3a8a] border-gray-300 rounded" />
          <label htmlFor="sameAsPassenger1" className="text-sm text-gray-500">Same as Passenger 1</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">First name*</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Last name*</label>
            <input type="text" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Email address*</label>
            <input type="email" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Phone number*</label>
            <input type="tel" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" />
          </div>
        </div>
      </div>

      {/* Bag Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Bag information</h3>
        <p className="text-sm text-gray-500 mb-4">
          Each passenger is allowed one free carry-on bag and one personal item. First
          checked bag for each passenger is also free. Second bag check fees are waived for
          loyalty program members.
          
        </p>
        <div className="flex items-center justify-between sm:justify-start sm:gap-10">
          <span className="text-sm text-gray-500">Passenger 1</span>
          <span className="text-sm text-gray-800 font-medium">First Last</span>
          <div className="flex items-center ml-auto sm:ml-0 gap-2">
            <span className="text-sm text-gray-500">Checked bags</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
              <span className="px-3 py-1 text-gray-800">1</span>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="bg-white text-[#1e3a8a] border border-[#1e3a8a] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
          Save and close
        </button>
        {/* Step 4: Add the onClick handler to the "Select seats" button */}
        <button
          className="bg-[#1e3a8a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          onClick={handleSelectSeats}
        >
          Select seats
        </button>
      </div>
    </div>
  );
};

export default PassengerForm;