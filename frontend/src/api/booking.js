// src/api/booking.js
import api from "./api";

export const fetchBookingDetails = async (sessionId) => {
  try {
    const response = await api.get(`/api/payment/booking-detail`, {
      params: { session_id: sessionId },
    });
    return response.data.booking;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw new Error("Could not retrieve booking details.");
  }
};
export const fetchAllBookings = async () => {
  try {
    const res = await api.get("/api/allbooking/all");
    return res.data.bookings || [];
  } catch (err) {
    console.error("Error fetching bookings:", err?.response?.data || err);
    throw new Error("Could not retrieve bookings.");
  }
};