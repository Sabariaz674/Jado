import React from 'react';
import {bookings} from '../../data'
const AddBooking = () => {
  // Sample data to be displayed in the table rows
  
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header section with flexible layout for responsiveness */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-0">All Booking</h1>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition duration-200">
          + Add Booking
        </button>
      </div>

      {/* Responsive table section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Table structure for large screens */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-left text-xs sm:text-sm">
                <th className="px-4 py-3 font-semibold">Flight No</th>
                <th className="px-4 py-3 font-semibold">Airline</th>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Departure</th>
                <th className="px-4 py-3 font-semibold">Arrival</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Passengers</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 font-medium">{booking.flightNo}</td>
                  <td className="px-4 py-3">{booking.airline}</td>
                  <td className="px-4 py-3">{booking.route}</td>
                  <td className="px-4 py-3">{booking.departure}</td>
                  <td className="px-4 py-3">{booking.arrival}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">{booking.passengers}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        booking.status === 'Confirmed'
                          ? 'bg-green-500'
                          : booking.status === 'Pending'
                          ? 'bg-[#1e3a8a]'
                          : 'bg-red-500'
                      } text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card-like structure for small and medium screens */}
        <div className="xl:hidden">
          {bookings.map((booking, index) => (
            <div key={index} className="border-b border-gray-200 p-4 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800">{booking.flightNo}</span>
                <span
                  className={`${
                    booking.status === 'Confirmed'
                      ? 'bg-[#1e3a8a]'
                      : booking.status === 'Pending'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  } text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="font-medium">Airline: <span className="font-normal">{booking.airline}</span></div>
                <div className="font-medium">Route: <span className="font-normal">{booking.route}</span></div>
                <div className="font-medium">Departure: <span className="font-normal">{booking.departure}</span></div>
                <div className="font-medium">Arrival: <span className="font-normal">{booking.arrival}</span></div>
                <div className="font-medium">Date: <span className="font-normal">{booking.date}</span></div>
                <div className="font-medium">Passengers: <span className="font-normal">{booking.passengers}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddBooking;
