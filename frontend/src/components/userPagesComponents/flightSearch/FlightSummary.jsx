import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSelectedFlights, removeSelectedFlight } from '../../../redux/slices/flightSlice';

const TAX_RATE = 0.24;  
const UPGRADE_FEE = 199; 

const FlightSummary = ({ compact = false }) => {
  const dispatch = useDispatch();
  const selectedFlights = useSelector((state) => state.flights.selectedFlights || []);
  const { classType, selectedSeat } = useSelector((s) => s.seats || {});
  
  // Calculate the business class upgrade fee
  const upgradeFee = classType === 'business' && selectedSeat ? UPGRADE_FEE : 0;
  if (!selectedFlights.length) {
    return (
      <div className={`mx-auto bg-white rounded-lg shadow-lg ${compact ? 'p-3' : 'p-4'} max-w-md`}>
        <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600`}>
          Select one or more flights to see details & prices here.
        </p>
      </div>
    );
  }

  // Calculate subtotal, taxes, and total cost
  const subtotal = selectedFlights.reduce((sum, flight) => sum + (Number(flight.price) || 0), 0);
  const taxesAndFees = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxesAndFees + upgradeFee;

  return (
    <div className={`mx-auto bg-white rounded-lg shadow-lg max-w-md ${compact ? 'p-3' : 'p-4'}`}>

      {/* Header with flight count and clear button */}
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
        <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold text-gray-800`}>
          Selected flights ({selectedFlights.length})
        </h3>
        <button
          onClick={() => dispatch(clearSelectedFlights())}
          className={`text-red-600 hover:text-red-700 ${compact ? 'text-xs' : 'text-sm'} underline-offset-2 hover:underline`}
          title="Clear all selected flights"
        >
          Clear all
        </button>
      </div>

      {/* Flight list */}
      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        {selectedFlights.map((flight) => {
          const price = Number(flight.price) || 0;
          const tax = Math.round(price * TAX_RATE);
          const totalPrice = price + tax;

          return (
            <div key={flight._id || flight.flightCode} className={`flex border rounded-lg bg-gray-50 border-gray-200 ${compact ? 'p-2' : 'p-3'}`}>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate">
                  {flight.airline} <span className="text-gray-500">• {flight.flightCode}</span>
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {flight.duration} • {flight.departureTime} - {flight.arrivalTime}
                </div>
                {flight.stop !== undefined && (
                  <div className="text-[#1e3a8a] text-xs">
                    {flight.stop === '0' ? 'Direct' : `${flight.stop} stop(s)`}
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="text-gray-700">Fare: ${price}</div>
                

                {/* Remove flight button */}
                <button
                  onClick={() => dispatch(removeSelectedFlight(flight._id))}
                  className={`mt-1 text-red-600 hover:underline ${compact ? 'text-[11px]' : 'text-xs'}`}
                  title="Remove this flight"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals Section */}
      <div className={`border-t border-gray-200 ${compact ? 'pt-3 mt-4' : 'pt-4 mt-6'}`}>
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span><span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Taxes and Fees</span><span>${taxesAndFees}</span>
        </div>

        {upgradeFee > 0 && (
          <div className="flex justify-between text-gray-700">
            <span>Business upgrade</span><span>+${upgradeFee}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span><span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightSummary;
