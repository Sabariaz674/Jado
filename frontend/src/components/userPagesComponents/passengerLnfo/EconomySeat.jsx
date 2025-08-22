import React, { useState } from "react";
import { Check } from "lucide-react";

const seatData = [
  // First section (Rows 6-13) with a 3-3 configuration
  [{ seat: "6A" }, { seat: "6B" }, { seat: "6C" }, null, { seat: "6D" }, { seat: "6E" }, { seat: "6F" }],
  [{ seat: "7A" }, { seat: "7B" }, { seat: "7C" }, null, { seat: "7D" }, { seat: "7E" }, { seat: "7F" }],
  [{ seat: "8A" }, { seat: "8B" }, { seat: "8C" }, null, { seat: "8D" }, { seat: "8E", reserved: true }, { seat: "8F" }],
  [{ seat: "9A" }, { seat: "9B" }, { seat: "9C" }, null, { seat: "9D" }, { seat: "9E" }, { seat: "9F" }],
  [{ seat: "10A" }, { seat: "10B" }, { seat: "10C" }, null, { seat: "10D" }, { seat: "10E" }, { seat: "10F" }],
  [{ seat: "11A" }, { seat: "11B" }, { seat: "11C" }, null, { seat: "11D" }, { seat: "11E" }, { seat: "11F" }],
  [{ seat: "12A" }, { seat: "12B" }, { seat: "12C" }, null, { seat: "12D" }, { seat: "12E" }, { seat: "12F" }],
  [{ seat: "13A" }, { seat: "13B" }, { seat: "13C" }, null, { seat: "13D" }, { seat: "13E" }, { seat: "13F" }],
  null,
  [{ seat: "14A", exit: true }, { seat: "14B" }, null, { seat: "14D" }, { seat: "14E" }],
  [{ seat: "15A" }, { seat: "15B", reserved: true }, null, { seat: "15D" }, { seat: "15E" }],
  [{ seat: "16A" }, { seat: "16B" }, null, { seat: "16D" }, { seat: "16E" }],
  [{ seat: "17A" }, { seat: "17B" }, null, { seat: "17D", exit: true }, { seat: "17E" }],
];

const EconomySeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [femaleSelectedSeat] = useState("8F");

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const getSeatClasses = (seat) => {
    if (!seat) return "h-8 w-8 sm:h-10 sm:w-10";
    const isSelected = selectedSeats.includes(seat.seat);
    const isReserved = seat.reserved;
    const isExit = seat.exit;
    const isFemaleSeat = seat.seat === femaleSelectedSeat;

    const baseClasses =
      "h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors relative";

    if (isReserved) return `${baseClasses} bg-gray-300 cursor-not-allowed text-gray-800`;
    if (isSelected && isFemaleSeat) return `${baseClasses} bg-pink-600 text-white`;
    if (isSelected) return `${baseClasses} bg-[#1e3a8a] text-white`;
    if (isExit) return `${baseClasses} bg-yellow-500 text-white`;

    return `${baseClasses} bg-blue-200 hover:bg-blue-300 text-gray-800`;
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 bg-transparent shadow-none rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-lg sm:text-xl font-bold">Economy Class Seat</h2>
      </div>

      {/* Legend */}
      <div className="text-xs sm:text-sm flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1e3a8a]" /> <span>Selected</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-200" /> <span>Available</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300" /> <span>Reserved</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" /> <span>Exit</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="w-4 h-4 rounded-full bg-pink-600" /> <span>Female Seat</span>
        </div>
      </div>

      {/* Seat Map */}
      <div className="space-y-2 overflow-x-auto min-w-max px-2 sm:px-0">
        {seatData.map((row, rowIndex) =>
          row === null ? (
            <div key={rowIndex} className="my-4 sm:my-6" />
          ) : (
            <div key={rowIndex}>
              {row[0].exit && (
                <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm mb-1">
                  <span>Exit row</span>
                </div>
              )}
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600 w-5 sm:w-6 text-right mr-1 sm:mr-2">
                  {row[0].seat.slice(0, -1)}
                </span>
                {row.map((seat, seatIndex) =>
                  seat ? (
                    <button
                      key={seatIndex}
                      disabled={seat.reserved}
                      onClick={() => toggleSeat(seat.seat)}
                      className={getSeatClasses(seat)}
                    >
                      {selectedSeats.includes(seat.seat) && (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
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

      {/* Selected Seats */}
      <div className="mt-6 text-center text-gray-600 text-sm sm:text-base">
        Selected Seats:{" "}
        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
      </div>
    </div>
  );
};

export default EconomySeat;
