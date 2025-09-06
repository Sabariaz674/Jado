// src/components/userPagesComponents/flightSearch/FlightListing.jsx
import React, { useState, useEffect } from 'react';
import FlightCard from '../../common/cards/FlightCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights, toggleSelectedFlight } from '../../../redux/slices/flightSlice';
import { addFlightToSummary } from "../../../redux/slices/flightSummarySlice";



const FlightListing = () => {
  const dispatch = useDispatch();

  // ⬇️ 
  const {
    flights,
    status,
    addFlightStatus,
    searchResults,
    searchStatus,
    searchCriteria,
  } = useSelector((s) => s.flights);

  const [visibleCount, setVisibleCount] = useState(3);


  const usingSearch = Boolean(searchCriteria) || searchStatus !== 'idle';


  const flightsToDisplay = usingSearch ? searchResults : flights;


  useEffect(() => {
    if (!usingSearch && (status === 'idle' || addFlightStatus === 'succeeded')) {
      dispatch(fetchFlights());
    }
  }, [dispatch, status, addFlightStatus, usingSearch]);


  useEffect(() => {
    setVisibleCount((v) => Math.min(v, flightsToDisplay.length || 3));
  }, [flightsToDisplay.length]);

  const handleToggle = () => {
    if (visibleCount < flightsToDisplay.length) {
      setVisibleCount(flightsToDisplay.length);
    } else {
      setVisibleCount(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ⏳ Loading
  if (usingSearch && searchStatus === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-gray-500">Loading flights...</p>
      </div>
    );
  }
  if (!usingSearch && status === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-gray-500">Loading flights...</p>
      </div>
    );
  }


  if (usingSearch && searchStatus === 'failed') {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-red-500">Failed to fetch flights.</p>
      </div>
    );
  }
  if (!usingSearch && status === 'failed') {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl text-red-500">Failed to fetch flights.</p>
      </div>
    );
  }



  if (!flightsToDisplay.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-2xl font-bold text-gray-600">
          {usingSearch ? 'No flights match your search.' : 'No flights found.'}
        </p>
        <p className="text-md text-gray-500 mt-2">
          {usingSearch ? 'Try different From/To or dates.' : 'Add a new flight to get started!'}
        </p>
      </div>
    );
  }

  // ✅ Render (design as-is)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {flightsToDisplay.slice(0, visibleCount).map((flight) => (
          <div key={flight._id} className="relative">
            <FlightCard
              {...flight}
              onSelect={() => {
                dispatch(toggleSelectedFlight(flight));       
                dispatch(addFlightToSummary(flight));         
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <p className="text-gray-600 font-medium mb-4 sm:mb-0">
          Showing {Math.min(visibleCount, flightsToDisplay.length)} of {flightsToDisplay.length} results
        </p>
        {flightsToDisplay.length > 3 && (
          <button
            onClick={handleToggle}
            className="text-[#1e3a8a] font-semibold py-2 px-6 border border-[#1e3a8a] rounded-md hover:bg-[#1e3a8a] hover:text-white transition"
          >
            {visibleCount >= flightsToDisplay.length ? 'Show less flights' : 'Show all flights'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FlightListing;
