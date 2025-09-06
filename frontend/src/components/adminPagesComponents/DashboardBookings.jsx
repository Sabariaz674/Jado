import React, { useEffect, useState } from "react";
import BookingCard from "../../components/common/cards/BookingCard";
import { fetchAllBookings } from "../../api/booking";

const DashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchAllBookings();

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const normalize = (d) =>
          new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

        const filtered = data.filter((b) => {
          const bookingDate = new Date(b.createdAt);
          const normalized = normalize(bookingDate);
          return (
            normalized === normalize(today) ||
            normalized === normalize(yesterday)
          );
        });

        setBookings(filtered);
      } catch (err) {
        console.error(err.message);
      }
    };
    loadBookings();
  }, []);

  const closeModal = () => setSelectedBooking(null);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-6 ">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e3a8a] mt-16 sm:mt-0">
          Recent Bookings (Today & Yesterday)
        </h1>
      </div>

      {/* ✅ Mobile & Tablet view (BookingCard) */}
      <div className="xl:hidden space-y-4 sm:mt-10">
        {bookings.map((booking, index) => (
          <BookingCard
            key={index}
            booking={booking}
            onViewDetail={() => setSelectedBooking(booking)}
          />
        ))}
      </div>

      {/* ✅ Desktop view (Table) */}
      <div className="hidden xl:block overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full text-sm sm:text-base border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-left text-xs sm:text-sm">
              <th className="px-4 py-3 font-semibold">Flight No</th>
              <th className="px-4 py-3 font-semibold">Airline</th>
              <th className="px-4 py-3 font-semibold">Departure</th>
              <th className="px-4 py-3 font-semibold">Arrival</th>
              <th className="px-4 py-3 font-semibold">Passenger</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {bookings.map((booking, index) => {
              const flight = booking.flights?.[0] || {};
              const passenger = booking.passenger || {};
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">{flight.flightCode}</td>
                  <td className="px-4 py-3">{flight.airline}</td>
                  <td className="px-4 py-3">{flight.departureTime}</td>
                  <td className="px-4 py-3">{flight.arrivalTime}</td>
                  <td className="px-4 py-3">
                    {passenger.firstName} {passenger.lastName}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        booking.status === "Confirmed"
                          ? "bg-[#1e3a8a]"
                          : booking.status === "Pending"
                          ? "bg-blue-800"
                          : "bg-red-500"
                      } text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="text-[#1e3a8a] hover:underline font-medium"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Booking Details
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-medium">Flight Code:</span>{" "}
                {selectedBooking.flights?.[0]?.flightCode}
              </p>
              <p>
                <span className="font-medium">Airline:</span>{" "}
                {selectedBooking.flights?.[0]?.airline}
              </p>
              <p>
                <span className="font-medium">Departure:</span>{" "}
                {selectedBooking.flights?.[0]?.departureTime}
              </p>
              <p>
                <span className="font-medium">Arrival:</span>{" "}
                {selectedBooking.flights?.[0]?.arrivalTime}
              </p>
              <p>
                <span className="font-medium">Stops:</span>{" "}
                {selectedBooking.flights?.[0]?.stops || "Direct"}
              </p>
              <p>
                <span className="font-medium">Baggage:</span>{" "}
                {selectedBooking.flights?.[0]?.baggage}
              </p>
              <p>
                <span className="font-medium">Meal:</span>{" "}
                {selectedBooking.flights?.[0]?.meal}
              </p>
              <p>
                <span className="font-medium">Passenger:</span>{" "}
                {selectedBooking.passenger?.firstName}{" "}
                {selectedBooking.passenger?.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedBooking.passenger?.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {selectedBooking.passenger?.phone}
              </p>
              <p>
                <span className="font-medium">Seat:</span>{" "}
                {selectedBooking.passenger?.seatId}
              </p>
              <p>
                <span className="font-medium">Class:</span>{" "}
                {selectedBooking.passenger?.classType}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {selectedBooking.passenger?.gender}
              </p>
              <p>
                <span className="font-medium">Total Paid:</span> $
                {selectedBooking.totalPaid}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedBooking.status}
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="bg-[#1e3a8a] hover:bg-[#1e3a8a] text-white px-6 py-2 rounded-lg shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBookings;
