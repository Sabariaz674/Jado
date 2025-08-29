// src/api/flights.js
import api from "./api";

// Get all flights
export const fetchFlightsApi = () => api.get("/api/flights");

// Add flight (FormData or JSON)
export const addFlightApi = (newFlight) => {
  if (newFlight instanceof FormData) {
    return api.post("/api/flights/createFlight", newFlight);
  }
  return api.post("/api/flights/createFlight", newFlight);
};

// Delete flight
export const deleteFlightApi = (id) => api.delete(`/api/flights/${id}`);

// Update flight
export const updateFlightApi = (id, formData) => {
  if (formData instanceof FormData) {
    return api.put(`/api/flights/${id}`, formData);
  }
  return api.put(`/api/flights/${id}`, formData);
};

// Search flights
export const searchFlightsApi = (criteria) => {
  const params = {};
  if (criteria?.from) params.from = criteria.from;
  if (criteria?.to) params.to = criteria.to;
  if (criteria?.tripType) params.tripType = criteria.tripType;
  if (criteria?.q) params.q = criteria.q;

  return api.get("/api/flights/search", { params });
};
