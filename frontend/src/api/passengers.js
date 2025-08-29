// src/api/passengers.js
import api from "./api";

// Server ko jo payload bhejna hai (already prepared with userId/userEmail)
export const savePassengerApi = (payload) =>
  api.post("/api/passengers", payload);
