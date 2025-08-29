import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PlacesSearches from '../../components/userPagesComponents/flightSearch/PlacesSearched';
import SearchBox from "../../components/common/SearchBox";
import FlightListing from "../../components/userPagesComponents/flightSearch/FlightListing";
import FlightSummary from "../../components/userPagesComponents/flightSearch/FlightSummary";

function FlightSearch() {
  const navigate = useNavigate();
  const selectedFlights = useSelector((s) => s.flights.selectedFlights);

  const goPassengerInfo = () => navigate('/seat-selection');

  return (
    <>
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <SearchBox />
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Choose Your <span className="text-[#1e3a8a]">Favourite</span> flight
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <FlightListing />
          </div>

          <div className="lg:w-1/3 mt-8">
            <FlightSummary />
            <div className="mt-6">
              <button
                onClick={goPassengerInfo}
                disabled={!selectedFlights.length}
                className={`w-full py-3 font-semibold rounded-lg shadow transition
                  ${selectedFlights.length
                    ? 'bg-[#1e3a8a] text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                title={selectedFlights.length ? 'Continue' : 'Select at least one flight'}
              >
                Select Your Favourite Seat
              </button>
            </div>
          </div>
        </div>
      </div>

      <PlacesSearches />
    </>
  );
}

export default FlightSearch;
