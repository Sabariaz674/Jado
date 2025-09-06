import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchBookingDetails } from "../../api/booking"; 

const BookingDetail = () => {
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const ticketRef = useRef();

  
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");
      if (!sessionId) {
        setError("Missing session ID.");
        setIsLoading(false);
        return;
      }

      try {
        const booking = await fetchBookingDetails(sessionId);
        setBookingData(booking);
      } catch (err) {
        setError("Could not retrieve booking details. Please contact support.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.search]);


  useEffect(() => {
    if (bookingData) {
      localStorage.removeItem("passengerInfo");
      localStorage.removeItem("selectedFlights");
    }
  }, [bookingData]);

  if (isLoading || (!bookingData && !error)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading booking details...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const { passenger, flights, totalPaid, bookingId } = bookingData;
  const flight = flights[0];

  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
      <div
        className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden"
        ref={ticketRef}
      >
       
        <div className="w-3/4 p-6 space-y-4">
         
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              ✈️ <span className="text-xl">Airline</span>{" "}
              {flight.airline || "Unnamed Airline"}
            </h2>
            <div className="text-right">
              <span className="text-sm block text-gray-500">
                {flight.classType}
              </span>
                <span className="text-sm block text-gray-500">
                {flight.flightType}
              </span>
              
              <span className="text-sm block text-gray-500">{flight.gender}</span>
            </div>
          </div>

          {/* Passenger Info */}
          <div>
            <p className="text-sm text-gray-500">Passenger:</p>
            <p className="text-sm text-gray-800">
              <span className="font-semibold">First Name:</span>{" "}
              {passenger.firstName}
              <span className="font-semibold ml-6">Last Name:</span>{" "}
              {passenger.lastName}
              <span className="font-semibold ml-6">Email:</span>{" "}
              {passenger.email}
              <span className="font-semibold ml-6">Phone:</span>{" "}
              {passenger.phone}
            </p>
          </div>

          {/* Flight Info */}
          <div className="flex justify-between text-center py-4 border-t border-b">
            <div>
              <p className="text-sm text-gray-500">Departure</p>
              <p className="text-2xl font-bold text-[#1e3a8a]">
                {flight.departureTime}
              </p>
              <p className="text-sm text-gray-600">{flight.from}</p>
              <p className="text-xs text-gray-400">{flight.departureDate}</p>
            </div>
            <div className="flex items-center flex-col justify-center text-sm text-gray-600">
              <span className="text-xs">🕓</span>
              <span>{flight.duration}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Arrival</p>
              <p className="text-2xl font-bold text-[#1e3a8a]">
                {flight.arrivalTime}
              </p>
              <p className="text-sm text-gray-600">{flight.to}</p>
              <p className="text-xs text-gray-400">{flight.arrivalDate}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <p>🧳 Baggage: {flight.baggage}</p>
              <p>🍱 Meal: {flight.meal}</p>
              <p>💺 Seat: {passenger.seatId}</p>
              <p>🚻 Gender: {passenger.gender}</p>
              <p>🎫 Class Type: {passenger.classType}</p>
            </div>
          </div>
        </div>

        {/* Right section: Booking info */}
        <div className="w-1/4 bg-[#1e3a8a] text-white p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-medium">Jadoo-flight</h3>
            <p className="text-xl">{bookingId}</p>

            <p className="text-sm mt-4 font-light">Airline Code</p>
            <p className="text-lg font-bold">{flight.flightCode}</p>
          </div>

          <div className="border-t border-white mt-4 pt-4 text-center">
            <p className="text-sm">Paid</p>
            <p className="text-xl font-bold">${totalPaid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;