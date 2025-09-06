import React from "react";

const BookingCard = ({ booking, onViewDetail }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-[#1e3a8a]";
      case "Pending":
        return "bg-blue-800";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const flight = booking.flights?.[0] || {};
  const passenger = booking.passenger || {};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition duration-200">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {flight.flightCode || "N/A"}
        </h3>
        <span
          className={`${getStatusColor(
            booking.status
          )} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}
        >
          {booking.status}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-3">
        <p>
          <span className="font-medium">Airline:</span> {flight.airline || "N/A"}
        </p>
        <p>
          <span className="font-medium">Passenger:</span>{" "}
          {passenger.firstName} {passenger.lastName}
        </p>
        <p>
          <span className="font-medium">Departure:</span>{" "}
          {flight.departureTime || "N/A"}
        </p>
        <p>
          <span className="font-medium">Arrival:</span>{" "}
          {flight.arrivalTime || "N/A"}
        </p>
        <p>
          <span className="font-medium">Class:</span> {passenger.classType || "N/A"}
        </p>
        <p>
          <span className="font-medium">Seat:</span> {passenger.seatId || "N/A"}
        </p>
        <p>
          <span className="font-medium">Meal:</span> {flight.meal || "N/A"}
        </p>
        <p>
          <span className="font-medium">Baggage:</span> {flight.baggage || "N/A"}
        </p>
        <p>
          <span className="font-medium">Total Paid:</span> ${booking.totalPaid || 0}
        </p>
      </div>

      {/* ✅ View Detail Button */}
      <div className="text-right">
        <button
          onClick={onViewDetail}
          className="text-[#1e3a8a] hover:underline font-medium"
        >
          View Detail
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
