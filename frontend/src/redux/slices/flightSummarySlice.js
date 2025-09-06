// src/redux/slices/flightSummarySlice.js
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "selectedFlights";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (flights) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
  } catch {}
};

const initialState = {
  selectedFlights: loadFromStorage(),  
};

const flightSummarySlice = createSlice({
  name: "flightSummary",
  initialState,
  reducers: {
    addFlightToSummary: (state, action) => {
      state.selectedFlights = [action.payload];
      const exists = state.selectedFlights.some(
        (f) =>
          (f._id || f.flightCode) ===
          (action.payload._id || action.payload.flightCode)
      );
      if (!exists) {
        state.selectedFlights.push(action.payload);
        saveToStorage(state.selectedFlights);
      }
    },
    removeFlightFromSummary: (state, action) => {
      const id = action.payload;
      state.selectedFlights = state.selectedFlights.filter(
        (f) => (f._id || f.flightCode) !== id
      );
      saveToStorage(state.selectedFlights);
    },
    clearFlightSummary: (state) => {
      state.selectedFlights = [];
      saveToStorage([]);
    },
    setFlightSummary: (state, action) => {
      state.selectedFlights = action.payload || [];
      saveToStorage(state.selectedFlights);
    },
  },
});

export const {
  addFlightToSummary,
  removeFlightFromSummary,
  clearFlightSummary,
  setFlightSummary,
} = flightSummarySlice.actions;

export default flightSummarySlice.reducer;
