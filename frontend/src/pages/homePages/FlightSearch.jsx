import React from "react";
import { useNavigate } from 'react-router-dom';
import PlacesSearches from '../../components/userPagesComponents/flightSearch/PlacesSearched'
import SearchBox from "../../components/common/SearchBox";
import FlightListing from "../../components/userPagesComponents/flightSearch/FlightListing";
import FlightSummary from "../../components/userPagesComponents/flightSearch/FlightSummary";

function FlightSearch() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/passenger-info')
  };

  return (
    <>
      {/* Naya container jo sab kuch center karega */}
      <div className="px-6 py-12 max-w-7xl mx-auto">
        <SearchBox />
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Choose Your <span className="text-[#1e3a8a]">Favourite</span> flight
        </p>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <FlightListing />
          </div>

          {/* Right Column for Flight Summary and Button */}
          <div className="lg:w-1/3 mt-8">
            <FlightSummary />

            {/* Moved Button Section */}
            <div className="mt-6">
              <button
                className="w-full py-3 text-white font-semibold bg-[#1e3a8a] rounded-lg shadow hover:bg-indigo-700 transition duration-200"
                onClick={handleNavigate}
              >
                Passenger information
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