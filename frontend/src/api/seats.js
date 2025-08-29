// src/api/seats.js
import api from "./api";

/** GET reserved seats for a flight (excluding current user/guest) */
export const loadReservedSeatsApi = (flightId, excludeUserId) =>
  api.get(`/api/seats/${flightId}`, { params: { excludeUserId } });

/** POST reserve a seat */
export const reserveSeatApi = ({ flightId, seatId, gender, klass = "economy", userId, userEmail }) =>
  api.post("/api/seats/reserve", {
    flightId,
    seatId,
    gender,
    klass,
    userId,      // mongoId OR guestId
    userEmail,   // optional (backend may resolve to _id)
  });

/** POST release a seat */
export const releaseSeatApi = ({ flightId, seatId, userId }) =>
  api.post("/api/seats/release", { flightId, seatId, userId });
