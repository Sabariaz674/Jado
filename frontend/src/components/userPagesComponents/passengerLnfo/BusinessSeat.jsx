import React from "react";
import { Check } from "lucide-react";

const BusinessSeat = ({ layout, reservedMap = {}, selectedSeat, gender, onSelect, loading }) => {
  const getSeatClasses = (seat) => {
    if (!seat) return "w-8 sm:w-10 md:w-12";
    const base = "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center font-semibold transition-colors relative";
    const isReserved = !!reservedMap[seat.seat];
    const isSelected = selectedSeat === seat.seat;

    if (isReserved) return `${base} bg-gray-300 cursor-not-allowed`;
    if (isSelected && gender === "female") return `${base} bg-pink-600 text-white`;
    if (isSelected) return `${base} bg-green-600 text-white`;
    return `${base} bg-green-300 hover:bg-green-400`;
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-10 bg-transparent min-h-screen w-full overflow-x-auto">
      <div className="rounded-[30px] p-4 sm:p-6 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Business Class</h2>
          {loading && <span className="text-xs text-gray-500">Loading…</span>}
        </div>
        <div className="mt-8 text-xs sm:text-sm flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
          <div className="flex items-center gap-2"><div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-600" /> <span>Selected (Male)</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-pink-600" /> <span>Selected (Female)</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-300" /> <span>Available</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gray-300" /> <span>Reserved (Others)</span></div>
        </div>

        <div className="space-y-4">
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-center justify-center gap-2 sm:gap-4">
              <span className="text-gray-500 font-bold text-sm sm:text-base md:text-lg w-4 sm:w-6 text-right mr-1 sm:mr-2">
                {rowIndex + 1}
              </span>
              {row.map((seat, seatIndex) =>
                seat ? (
                  <button
                    key={seatIndex}
                    disabled={!!reservedMap[seat.seat]}
                    onClick={() => onSelect(seat.seat)}
                    className={getSeatClasses(seat)}
                    aria-label={seat.seat}
                    title={reservedMap[seat.seat] ? `Reserved by ${reservedMap[seat.seat].gender}` : seat.seat}
                  >
                    {selectedSeat === seat.seat && (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                    )}
                  </button>
                ) : (
                  <div key={seatIndex} className="w-8 sm:w-10 md:w-12" />
                )
              )}
            </div>
          ))}
        </div>

        {/* legend */}
        

        <div className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Selected Seat: {selectedSeat || "None"}
        </div>
      </div>
    </div>
  );
};

export default BusinessSeat;
