import React, { useState, useEffect } from 'react';
import FlightCard from '../../common/cards/FlightCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from '../../../redux/slices/flightSlice';

const FlightListingLeft = () => {
  const dispatch = useDispatch();
  const { flights, status, addFlightStatus } = useSelector((state) => state.flights);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (status === 'idle' || addFlightStatus === 'succeeded') {
      dispatch(fetchFlights());
    }
  }, [dispatch, status, addFlightStatus]);

  const handleToggle = () => {
    if (visibleCount < flights.length) {
      setVisibleCount(flights.length);
    } else {
      setVisibleCount(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isShowingAll = visibleCount >= flights.length;

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-gray-500">Loading flights...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-red-500">Failed to fetch flights. Please try again later.</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-2xl font-bold text-gray-600">No flights found.</p>
        <p className="text-md text-gray-500 mt-2">Add a new flight to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {flights.slice(0, visibleCount).map((flight, index) => (
          <div key={index} className="relative">
            <FlightCard
              airline={flight.airline}
              logo={flight.logo}
              flightCode={flight.flightCode}
              duration={flight.duration}
              departure={flight.departure}
              stop={flight.stop}
              price={flight.price}
              type={flight.type}
              meal={flight.meal}
              baggage={flight.baggage}
              lax={flight.lax}
              laf={flight.laf}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <p className="text-gray-600 font-medium mb-4 sm:mb-0">
          Showing {Math.min(visibleCount, flights.length)} of {flights.length} results
        </p>
        <button
          onClick={handleToggle}
          className="text-[#1e3a8a] font-semibold py-2 px-6 border border-[#1e3a8a] rounded-md hover:bg-[#1e3a8a] hover:text-white transition"
        >
          {isShowingAll ? 'Show less flights' : 'Show all flights'}
        </button>
      </div>
    </div>
  );
};

export default FlightListingLeft;
