import React, { useState } from "react";
import { Check } from "lucide-react";

const BusinessSeat = () => {
  const BusinessSeatData = [
    [{ seat: "1A", available: true }, { seat: "1B", available: false }, null, { seat: "1C", available: false }, { seat: "1D", available: true }],
    [{ seat: "2A", available: true }, { seat: "2B", available: true }, null, { seat: "2C", available: false }, { seat: "2D", available: false }],
    [{ seat: "3A", available: false }, { seat: "3B", available: true }, null, { seat: "3C", available: true }, { seat: "3D", available: true }],
    [{ seat: "4A", available: true }, { seat: "4B", available: true }, null, { seat: "4C", available: true }, { seat: "4D", available: true }],
    [{ seat: "5A", available: true }, { seat: "5B", available: true }, null, { seat: "5C", available: true }, { seat: "5D", available: true }],
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const getSeatClasses = (seat) => {
    if (!seat) return "w-8 sm:w-10 md:w-12"; 
    const isSelected = selectedSeats.includes(seat.seat);
    const baseClasses =
      "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-lg flex items-center justify-center font-semibold transition-colors relative";

    if (!seat.available) return `${baseClasses} bg-gray-300 cursor-not-allowed`;
    if (isSelected) return `${baseClasses} bg-green-500 text-white`;
    return `${baseClasses} bg-green-300 hover:bg-green-400`;
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-10 bg-transparent min-h-screen w-full overflow-x-auto">
      <div className="rounded-[30px] p-4 sm:p-6 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
          Business Class
        </h2>

        {/* Seats grid */}
        <div className="space-y-4">
          {BusinessSeatData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center gap-2 sm:gap-4"
            >
              <span className="text-gray-500 font-bold text-sm sm:text-base md:text-lg w-4 sm:w-6 text-right mr-1 sm:mr-2">
                {rowIndex + 1}
              </span>
              {row.map((seat, seatIndex) =>
                seat ? (
                  <button
                    key={seatIndex}
                    disabled={!seat.available}
                    onClick={() => toggleSeat(seat.seat)}
                    className={getSeatClasses(seat)}
                  >
                    {selectedSeats.includes(seat.seat) && (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                    )}
                  </button>
                ) : (
                  <div key={seatIndex} className="w-8 sm:w-10 md:w-12" />
                )
              )}
            </div>
          ))}
        </div>

        {/* Legends */}
        <div className="mt-8 text-xs sm:text-sm flex flex-wrap justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-500" />{" "}
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-green-300" />{" "}
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gray-300" />{" "}
            <span>Unavailable</span>
          </div>
        </div>

        {/* Selected Seats */}
        <div className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Selected Seats:{" "}
          {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
        </div>
      </div>
    </div>
  );
};

export default BusinessSeat;
