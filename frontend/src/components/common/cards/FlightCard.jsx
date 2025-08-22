import React from 'react';
import { PlaneLanding } from 'lucide-react';
import BaggageIcon from '../../../assets/BaggageIcon.png';
import NoMealIcon from '../../../assets/NoMealIcon.png';

const BASE_URL = 'http://localhost:8080';

const FlightCard = ({
  airline,
  logo,
  flightCode,
  duration,
  departure,
  stop,
  price,
  type,
  meal,
  baggage,
  lax,
  laf,
}) => {
  if (!airline || !logo) {
    return null;
  }

  const [departureTime, arrivalTime] = departure.split(' - ');
  const stopDisplay = stop === '0' ? 'Direct' : `${stop} Stop${stop > 1 ? 's' : ''}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full max-w-[360px] sm:max-w-full">
      
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Airline Info */}
        <div className="flex items-center gap-4 w-full sm:w-auto flex-shrink-0">
          {logo && (
            <img
              src={`${BASE_URL}${logo}`}
              alt={airline}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl text-gray-600 font-semibold">
              {airline}
            </span>
            <span className="text-sm text-gray-500">ID: {flightCode}</span>
            <span className="text-sm text-gray-500">{duration} hrs</span>
          </div>
        </div>

        {/* Route / Time */}
        <div className="flex items-center justify-center w-full sm:w-auto flex-grow">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold whitespace-nowrap">{departureTime}</span>
            <span className="text-xs text-gray-500">{lax}</span>
          </div>

          <div className="flex flex-col items-center mx-4">
            <div className="w-16 sm:w-28 lg:w-40 h-px bg-gray-300 relative">
              <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#1e3a8a] -mt-1 -ml-1"></div>
              <div className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-[#1e3a8a] -mt-1 -mr-1"></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{stopDisplay}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold whitespace-nowrap">{arrivalTime}</span>
            <span className="text-xs text-gray-500">{laf}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Facilities */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <img src={BaggageIcon} alt="Baggage" className="w-5 h-5" />
            <span className="text-sm text-gray-500 font-semibold">Baggage</span>
            <span className="text-sm text-gray-500">{baggage}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={NoMealIcon} alt="Meal" className="w-5 h-5" />
            {/* The previous extra "Meal" text has been removed from here */}
            <span className="text-sm text-gray-500">{meal}</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex justify-between items-center w-full sm:w-auto sm:justify-start sm:gap-4">
            <span className="text-xl font-bold text-[#1e3a8a]">
              {price}
              <span className="text-sm text-gray-500">/pax</span>
            </span>
            <span className="text-sm text-gray-500">{type}</span>
          </div>

          {/* <button
            className="text-white text-sm bg-[#1e3a8a] px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition w-full sm:w-auto"
            onClick={() => console.log('View Details Clicked!')}
          >
            View Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;