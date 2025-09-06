import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearFlightSummary,
  removeFlightFromSummary,
} from "../../../redux/slices/flightSummarySlice";

const TAX_RATE = 0.24;
const UPGRADE_FEE = 150;

const FlightSummary = ({
  compact = true,
  classTypeOverride,
  selectedSeatOverride,
}) => {
  const dispatch = useDispatch();

  const selectedFlights =
    useSelector((s) => s.flightSummary.selectedFlights) || [];

  const reduxClassType = useSelector((s) => s.seats?.classType);
  const reduxSelectedSeat = useSelector((s) => s.seats?.selectedSeat);

  const classType = classTypeOverride ?? reduxClassType;
  const selectedSeat = selectedSeatOverride ?? reduxSelectedSeat;

  const upgradeFee =
    classType === "business" && selectedSeat ? UPGRADE_FEE : 0;

  if (!selectedFlights.length) {
    return (
      <div className="text-sm text-gray-600">
        Select one or more flights to see details & prices here.
      </div>
    );
  }

  const subtotal = selectedFlights.reduce(
    (sum, f) => sum + (Number(f.price) || 0),
    0
  );
  const taxesAndFees = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxesAndFees + upgradeFee;

  return (
    <div className="text-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          Selected flights ({selectedFlights.length})
        </h3>
        <button
          onClick={() => dispatch(clearFlightSummary())}
          className="text-red-600 hover:text-red-700 text-xs underline-offset-2 hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {selectedFlights.map((flight) => {
          const price = Number(flight.price) || 0;

          return (
            <div
              key={flight._id || flight.flightCode}
              className="rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {flight.airline}{" "}
                    <span className="text-gray-500">• {flight.flightCode}</span>
                  </div>
                  <div className="text-[12px] text-gray-500 truncate">
                    {flight.duration} • {flight.departureTime} - {flight.arrivalTime}
                  </div>
                  <div className="text-[12px] text-gray-600 mt-1 space-x-2">
                    {flight.meal && (
                      <span>🍱 <span className="font-medium">{flight.meal}</span></span>
                    )}
                    {flight.baggage && (
                      <span>🧳 <span className="font-medium">{flight.baggage}</span></span>
                    )}
                    {flight.type && (
                      <span>✈️ <span className="font-medium">{flight.type}</span></span>
                    )}
                  </div>

                  {flight.stop !== undefined && (
                    <div className="text-[#1e3a8a] text-[12px]">
                      {flight.stop === "0"
                        ? "Direct"
                        : `${flight.stop} stop(s)`}
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-gray-800 font-medium">${price}</div>
                  <button
                    onClick={() =>
                      dispatch(
                        removeFlightFromSummary(flight._id || flight.flightCode)
                      )
                    }
                    className="mt-1 text-red-600 text-[12px] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Totals */}
      <div className="mt-4 border-t border-gray-200 pt-3 space-y-1">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Taxes and Fees</span>
          <span>${taxesAndFees}</span>
        </div>
        {upgradeFee > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Business upgrade</span>
            <span>+${upgradeFee}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-900 font-extrabold text-base">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
