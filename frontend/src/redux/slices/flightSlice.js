// src/redux/slices/flightSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchFlightsApi,
  addFlightApi,
  deleteFlightApi,
  updateFlightApi,
  searchFlightsApi,
} from "../../api/flights";

// ---------------- Thunks ----------------
export const fetchFlights = createAsyncThunk("flights/fetchFlights", async (_, { rejectWithValue }) => {
  try {
    const { data } = await fetchFlightsApi();
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Failed to fetch flights" });
  }
});

export const addFlight = createAsyncThunk("flights/addFlight", async (newFlight, { rejectWithValue }) => {
  try {
    const { data } = await addFlightApi(newFlight);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Failed to add flight" });
  }
});

export const deleteFlight = createAsyncThunk("flights/deleteFlight", async (flightId, { rejectWithValue }) => {
  try {
    await deleteFlightApi(flightId);
    return flightId;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Failed to delete flight" });
  }
});

export const updateFlight = createAsyncThunk("flights/updateFlight", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await updateFlightApi(id, formData);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Failed to update flight" });
  }
});

export const searchFlights = createAsyncThunk("flights/searchFlights", async (criteria, { rejectWithValue }) => {
  try {
    const { data } = await searchFlightsApi(criteria);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data || { message: "Failed to search flights" });
  }
});

// ---------------- Slice ----------------
const flightSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    status: "idle",
    addFlightStatus: "idle",
    deleteFlightStatus: "idle",
    updateFlightStatus: "idle",
    error: null,

    selectedFlights: [],

    searchCriteria: null,
    searchResults: [],
    searchStatus: "idle",
    searchError: null,
  },
  reducers: {
    toggleSelectedFlight: (state, action) => {
      const f = action.payload;
      const exists = state.selectedFlights.find((x) => x._id === f._id);
      state.selectedFlights = exists
        ? state.selectedFlights.filter((x) => x._id !== f._id)
        : [...state.selectedFlights, f];
    },
    removeSelectedFlight: (state, action) => {
      const id = action.payload;
      state.selectedFlights = state.selectedFlights.filter((x) => x._id !== id);
    },
    clearSelectedFlights: (state) => {
      state.selectedFlights = [];
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload || null;
    },
    clearSearch: (state) => {
      state.searchCriteria = null;
      state.searchResults = [];
      state.searchStatus = "idle";
      state.searchError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.flights = action.payload;
        if (state.selectedFlights.length) {
          const map = new Map(action.payload.map((f) => [f._id, f]));
          state.selectedFlights = state.selectedFlights.map((sf) => map.get(sf._id)).filter(Boolean);
        }
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed"; state.error = action.payload?.message || action.error.message;
      })
      .addCase(addFlight.pending, (state) => { state.addFlightStatus = "loading"; state.error = null; })
      .addCase(addFlight.fulfilled, (state, action) => { state.addFlightStatus = "succeeded"; state.flights.unshift(action.payload); })
      .addCase(addFlight.rejected, (state, action) => { state.addFlightStatus = "failed"; state.error = action.payload?.message || action.error.message; })
      .addCase(deleteFlight.pending, (state) => { state.deleteFlightStatus = "loading"; state.error = null; })
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.deleteFlightStatus = "succeeded";
        const id = action.payload;
        state.flights = state.flights.filter((f) => f._id !== id);
        state.selectedFlights = state.selectedFlights.filter((f) => f._id !== id);
      })
      .addCase(deleteFlight.rejected, (state, action) => { state.deleteFlightStatus = "failed"; state.error = action.payload?.message || action.error.message; })
      .addCase(updateFlight.pending, (state) => { state.updateFlightStatus = "loading"; state.error = null; })
      .addCase(updateFlight.fulfilled, (state, action) => {
        state.updateFlightStatus = "succeeded";
        const idx = state.flights.findIndex((f) => f._id === action.payload._id);
        if (idx !== -1) state.flights[idx] = action.payload;
        const sidx = state.selectedFlights.findIndex((f) => f._id === action.payload._id);
        if (sidx !== -1) state.selectedFlights[sidx] = action.payload;
      })
      .addCase(updateFlight.rejected, (state, action) => { state.updateFlightStatus = "failed"; state.error = action.payload?.message || action.error.message; })
      .addCase(searchFlights.pending, (state) => { state.searchStatus = "loading"; state.searchError = null; })
      .addCase(searchFlights.fulfilled, (state, action) => { state.searchStatus = "succeeded"; state.searchResults = action.payload; })
      .addCase(searchFlights.rejected, (state, action) => { state.searchStatus = "failed"; state.searchError = action.payload?.message || action.error.message; });
  },
});

export const {
  toggleSelectedFlight,
  removeSelectedFlight,
  clearSelectedFlights,
  setSearchCriteria,
  clearSearch,
} = flightSlice.actions;

export default flightSlice.reducer;
