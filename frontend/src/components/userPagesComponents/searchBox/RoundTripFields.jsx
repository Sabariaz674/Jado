import React from "react";
import OneWayFields from "./OneWayFields";

/**
 * Desktop: From | To | Depart | Return  (same design/spacing)
 * Tablet/Phone: items wrap neatly into 2-3 columns; min widths stop squish.
 */
const RoundTripFields = ({
  from, setFrom,
  to, setTo,
  depart, setDepart,
  returnDate, setReturnDate
}) => {
  const on = (setter) => (e) => setter(e.target.value);

  return (
    <div className="w-full flex-1">
      {/* keep one-way's first three fields exactly the same */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-3">
        {/* From */}
        <div className="flex-1 min-w-[160px]">
          <label className="text-sm font-semibold text-gray-600 mb-1 block">From</label>
          <input
            type="text"
            value={from}
            onChange={on(setFrom)}
            placeholder="Country, city"
            className="w-full p-2 text-sm outline-none border border-[#1e3a8a] rounded-md"
          />
        </div>

        {/* To */}
        <div className="flex-1 min-w-[160px]">
          <label className="text-sm font-semibold text-gray-600 mb-1 block">To</label>
          <input
            type="text"
            value={to}
            onChange={on(setTo)}
            placeholder="Country, city"
            className="w-full p-2 text-sm outline-none border border-[#1e3a8a] rounded-md"
          />
        </div>

        {/* Depart */}
        <div className="flex-1 min-w-[160px]">
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Depart</label>
          <input
            type="date"
            value={depart}
            onChange={on(setDepart)}
            className="w-full p-2 text-sm outline-none border border-[#1e3a8a] rounded-md"
          />
        </div>

        {/* Return (new 4th box; same styling) */}
        <div className="flex-1 min-w-[160px]">
          <label className="text-sm font-semibold text-gray-600 mb-1 block">Return</label>
          <input
            type="date"
            value={returnDate}
            onChange={on(setReturnDate)}
            className="w-full p-2 text-sm outline-none border border-[#1e3a8a] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default RoundTripFields;
