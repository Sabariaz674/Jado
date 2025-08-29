import React from "react";
import { Check } from "lucide-react";

const EconomySeat = ({ layout, reservedMap = {}, selectedSeat, gender, onSelect, loading }) => {
  const getSeatClasses = (seat) => {
    if (!seat) return "h-8 w-8 sm:h-10 sm:w-10";

    const base = "h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors relative";
    const isExit = seat.exit;
    const isReserved = !!reservedMap[seat.seat];
    const isSelected = selectedSeat === seat.seat;

    if (isReserved) return `${base} bg-gray-300 cursor-not-allowed text-gray-800`;
    if (isSelected && gender === "female") return `${base} bg-pink-600 text-white`;
    if (isSelected) return `${base} bg-[#1e3a8a] text-white`;
    if (isExit) return `${base} bg-yellow-500 text-white`;
    return `${base} bg-blue-200 hover:bg-blue-300 text-gray-800`;
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-transparent rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-lg sm:text-xl font-bold">Economy Class Seat</h2>
        {loading && <span className="text-xs text-gray-500">Loading…</span>}
      </div>

      {/* Legend */}
      <div className="text-xs sm:text-sm flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#1e3a8a]" /> <span>Selected (Male)</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-pink-600" /> <span>Selected (Female)</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-200" /> <span>Available</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gray-300" /> <span>Reserved (Others)</span></div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-yellow-500" /> <span>Exit</span></div>
      </div>

      {/* Seat Map */}
      <div className="space-y-2 overflow-x-auto min-w-max px-2 sm:px-0">
        {layout.map((row, rowIndex) =>
          row === null ? (
            <div key={rowIndex} className="my-4 sm:my-6" />
          ) : (
            <div key={rowIndex}>
              {row[0]?.exit && <div className="text-gray-500 text-xs sm:text-sm mb-1">Exit row</div>}
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600 w-5 sm:w-6 text-right mr-1 sm:mr-2">
                  {row[0]?.seat ? row[0].seat.replace(/[A-Z]$/,'') : ''}
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
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                      )}
                    </button>
                  ) : (
                    <div key={seatIndex} className="w-8 sm:w-10" />
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-6 text-center text-gray-600 text-sm sm:text-base">Selected Seat: {selectedSeat || "None"}</div>
    </div>
  );
};

export default EconomySeat;
