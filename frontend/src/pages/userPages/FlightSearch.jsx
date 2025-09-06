import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PlacesSearches from '../../components/userPagesComponents/flightSearch/PlacesSearched';
import SearchBox from "../../components/common/SearchBox";
import FlightListing from "../../components/userPagesComponents/flightSearch/FlightListing";
import FlightSummary from "../../components/userPagesComponents/flightSearch/FlightSummary";

function FlightSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFlights = useSelector((s) => s.flightSummary.selectedFlights || []);

  // Country passed from CountryFlight
  const country = location.state?.country || "China"; 

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
                    ? 'bg-[#1e3a8a] text-white hover:bg-[#1e3a8a]'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                title={selectedFlights.length ? 'Continue' : 'Select at least one flight'}
              >
                Select Your Favourite Seat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pass country dynamically */}
      <PlacesSearches country={country} />
    </>
  );
}

export default FlightSearch;
