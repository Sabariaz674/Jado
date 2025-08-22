import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook import karein

// Main component containing the entire flight summary
const FlightSummary = () => {
  const navigate = useNavigate(); // Hook ko initialize karein

  // Example flight data
  const flights = [
    {
      airline: 'Hawaiian Airlines',
      flightCode: 'FIG4312',
      duration: '16h 45m (-1d)',
      stopoverTime: '2h 45m',
      departureTime: '7:00 AM',
      arrivalTime: '4:15 PM',
      logoUrl: 'https://cdn.icon-icons.com/icons2/1210/PNG/512/1492723659-57_83626.png' // Use a placeholder URL
    },
    {
      airline: 'Hawaiian Airlines',
      flightCode: 'FIG4312',
      duration: '16h 45m (-1d)',
      stopoverTime: '2h 45m',
      departureTime: '7:00 AM',
      arrivalTime: '4:15 PM',
      logoUrl: 'https://cdn.icon-icons.com/icons2/1210/PNG/512/1492723659-57_83626.png' // Use a placeholder URL
    },
  ];

  const subtotal = 503;
  const taxesAndFees = 121;
  const total = subtotal + taxesAndFees;

  // Inner component for a single flight card, defined within the main component
  const FlightSummaryCard = ({
    airline,
    flightCode,
    duration,
    stopoverTime,
    departureTime,
    arrivalTime,
    logoUrl
  }) => (
    <div className="flex p-4 border rounded-lg bg-gray-50 border-gray-200">
      {/* Left Section: Airline Info */}
      <div className="flex items-start">
        <img
          src={logoUrl}
          alt={`${airline} logo`}
          className="w-10 h-10 mr-4 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">{airline}</span>
          <span className="text-xs text-gray-500">{flightCode}</span>
        </div>
      </div>
      
      {/* Right Section: Flight Times and Duration */}
      <div className="flex flex-col ml-auto text-right">
        <span className="text-sm font-semibold text-gray-800">{duration}</span>
        <span className="text-xs text-gray-500 mt-1">{departureTime} - {arrivalTime}</span>
        <span className="text-xs text-[#1e3a8a] mt-1">{stopoverTime} in HNL</span>
      </div>
    </div>
  );

  // Button click handler function
  const handleNavigate = () => {
    navigate('/passenger-info');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Flight Cards Section */}
      <div className="space-y-4">
        {flights.map((flight, index) => (
          <FlightSummaryCard
            key={index}
            airline={flight.airline}
            flightCode={flight.flightCode}
            duration={flight.duration}
            stopoverTime={flight.stopoverTime}
            departureTime={flight.departureTime}
            arrivalTime={flight.arrivalTime}
            logoUrl={flight.logoUrl}
          />
        ))}
      </div>

      {/* Price Summary Section */}
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 mt-1">
          <span>Taxes and Fees</span>
          <span>${taxesAndFees}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;