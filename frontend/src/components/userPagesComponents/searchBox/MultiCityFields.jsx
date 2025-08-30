// src/components/userPagesComponents/searchBox/MultiCityFields.jsx
import React, { useEffect, useRef } from "react";

const MultiCityFields = ({ trips, onChangeTrip, onAddTrip, onRemoveTrip }) => {
  const bottomRef = useRef(null);

  // jab segment add ho, neeche smooth scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [trips.length]);

  return (
    <div className="w-full mt-4">
      {trips.map((trip, index) => (
        <div
          key={index}
          className="w-full mb-4 rounded-xl border border-[#1e3a8a]/30 p-3 bg-white"
        >
          {/* Header row with segment label + remove */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#1e3a8a]">
              Flight {index + 1}
            </p>
            <button
              type="button"
              onClick={() => onRemoveTrip?.(index)}
              className={`text-xs px-2 py-1 rounded-md border ${
                trips.length === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-red-50 hover:text-red-700 border-red-600 text-red-600"
              }`}
              disabled={trips.length === 1}
              aria-label={`Remove flight ${index + 1}`}
              title={trips.length === 1 ? "At least one segment required" : "Remove"}
            >
              Remove
            </button>
          </div>

          {/* Inputs — same look & feel as OneWay/RoundTrip */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2">
            <div className="p-2 w-full lg:w-1/3">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">From</label>
              <input
                type="text"
                value={trip.from}
                onChange={(e) => onChangeTrip(index, "from", e.target.value)}
                placeholder="Country, city or airport"
                className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-[#1e3a8a] rounded-md"
              />
            </div>

            <div className="p-2 w-full lg:w-1/3">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">To</label>
              <input
                type="text"
                value={trip.to}
                onChange={(e) => onChangeTrip(index, "to", e.target.value)}
                placeholder="Country, city or airport"
                className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-[#1e3a8a] rounded-md"
              />
            </div>

            <div className="p-2 w-full lg:w-1/3">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">Depart</label>
              <input
                type="date"
                value={trip.depart}
                onChange={(e) => onChangeTrip(index, "depart", e.target.value)}
                className="text-sm outline-none w-full p-2 border border-[#1e3a8a] rounded-md"
              />
            </div>
          </div>
        </div>
      ))}

      <div ref={bottomRef} />

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
