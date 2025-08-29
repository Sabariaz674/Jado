import React from "react";

const MultiCityFields = ({ trips, onChangeTrip, onAddTrip }) => {
  return (
    <div className="w-full mt-4">
      {trips.map((trip, index) => (
        <div key={index} className="flex flex-wrap lg:flex-nowrap gap-2 mb-4 w-full">
          <div className="p-2 w-full lg:w-1/3">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">From</label>
            <input
              type="text"
              value={trip.from}
              onChange={(e) => onChangeTrip(index, "from", e.target.value)}
              placeholder="Country, city or airport"
              className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="p-2 w-full lg:w-1/3">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">To</label>
            <input
              type="text"
              value={trip.to}
              onChange={(e) => onChangeTrip(index, "to", e.target.value)}
              placeholder="Country, city or airport"
              className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="p-2 w-full lg:w-1/3">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Depart</label>
            <input
              type="date"
              value={trip.depart}
              onChange={(e) => onChangeTrip(index, "depart", e.target.value)}
              className="text-sm outline-none w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="text-sm text-[#1e3a8a] hover:underline mt-2"
        onClick={onAddTrip}
      >
        + Add another flight
      </button>
    </div>
  );
};

export default MultiCityFields;
