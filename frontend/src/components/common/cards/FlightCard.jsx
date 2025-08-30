import React, { memo } from 'react';
import BaggageIcon from '../../../assets/BaggageIcon.png';
import NoMealIcon from '../../../assets/NoMealIcon.png';

const BASE_URL = import.meta.env.VITE_API_URL;

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
  onSelect,
}) => {
  if (!airline || !logo) return null;

  const logoSrc = logo?.startsWith('http') ? logo : `${BASE_URL}${logo}`;

  let departureTime = '';
  let arrivalTime = '';

  // Old Logic (for single string)
  if (typeof departure === 'string' && departure.includes(' - ')) {
    [departureTime, arrivalTime] = departure.split(' - ');
  }

  // ✅ New Logic (for array)
  if (Array.isArray(departure) && departure.length > 0 && typeof departure[0] === 'string') {
    const firstDepartureString = departure[0];
    if (firstDepartureString.includes(' - ')) {
      [departureTime, arrivalTime] = firstDepartureString.split(' - ');
    }
  }

  // stops label
  const nStops = Number.isNaN(Number(stop)) ? 0 : Number(stop);
  const stopDisplay = nStops === 0 ? 'Direct' : `${nStops} Stop${nStops > 1 ? 's' : ''}`;

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full max-w-[360px] sm:max-w-full
                     hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect?.()}
    >
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Airline Info */}
        <div className="flex items-center gap-4 w-full sm:w-auto flex-shrink-0">
          <img
            src={logoSrc}
            alt={`${airline} logo`}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl text-gray-800 font-semibold">
              {airline}
            </span>
            {flightCode && <span className="text-sm text-gray-500">ID: {flightCode}</span>}
            {duration && <span className="text-sm text-gray-500">{duration}</span>}
          </div>
        </div>

        {/* Route / Time */}
        <div className="flex items-center justify-center w-full sm:w-auto flex-grow">
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold whitespace-nowrap">{departureTime}</span>
            {!!lax && <span className="text-xs text-gray-500">{lax}</span>}
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
            {!!laf && <span className="text-xs text-gray-500">{laf}</span>}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Facilities */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <img src={BaggageIcon} alt="Baggage" className="w-5 h-5" />
            <span className="text-sm text-gray-600 font-semibold">Baggage</span>
            {baggage && <span className="text-sm text-gray-600">{baggage}</span>}
          </div>
          <div className="flex items-center gap-2">
            <img src={NoMealIcon} alt="Meal" className="w-5 h-5" />
            <span className="text-sm text-gray-600">{meal || 'No Meal'}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex justify-between items-center w-full sm:w-auto sm:justify-start sm:gap-4">
            <span className="text-xl font-bold text-[#1e3a8a]">
              {typeof price === 'number' ? `$${price}` : price}
              <span className="text-sm text-gray-500">/pax</span>
            </span>
            {type && <span className="text-sm text-gray-500">{type}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;