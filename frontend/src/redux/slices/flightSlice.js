import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// --- Async Thunks ---

// Fetch all flights
export const fetchFlights = createAsyncThunk('flights/fetchFlights', async () => {
  const response = await fetch('http://localhost:8080/api/flights');
  const data = await response.json();
  return data;
});

// Add a new flight
export const addFlight = createAsyncThunk('flights/addFlight', async (newFlight) => {
  const response = await fetch('http://localhost:8080/api/flights/createFlight', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFlight),
  });

  if (!response.ok) {
    throw new Error('Failed to add flight');
  }

  const data = await response.json();
  return data;
});

// Delete a flight
export const deleteFlight = createAsyncThunk('flights/deleteFlight', async (flightId) => {
  const response = await fetch(`http://localhost:8080/api/flights/${flightId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete flight');
  }

  return flightId;
});

// Update an existing flight
export const updateFlight = createAsyncThunk('flights/updateFlight', async (updatedFlightData) => {
  const response = await fetch(`http://localhost:8080/api/flights/${updatedFlightData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFlightData.formData),
  });

  if (!response.ok) {
    throw new Error('Failed to update flight');
  }

  const data = await response.json();
  return data;
});

// --- Slice ---

const flightSlice = createSlice({
  name: 'flights',
  initialState: {
    flights: [],
    status: 'idle',
    addFlightStatus: 'idle',
    deleteFlightStatus: 'idle',
    updateFlightStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Flights
      .addCase(fetchFlights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.flights = action.payload; // ✅ Server se aane wala data state mein daalein
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Add Flight - In cases ko ab manual update ki zarurat nahi, kyunki hum fetchFlights call kar rahe hain
      .addCase(addFlight.pending, (state) => {
        state.addFlightStatus = 'loading';
      })
      .addCase(addFlight.fulfilled, (state) => {
        state.addFlightStatus = 'succeeded';
      })
      .addCase(addFlight.rejected, (state) => {
        state.addFlightStatus = 'failed';
      })

      // Delete Flight
      .addCase(deleteFlight.pending, (state) => {
        state.deleteFlightStatus = 'loading';
      })
      .addCase(deleteFlight.fulfilled, (state) => {
        state.deleteFlightStatus = 'succeeded';
      })
      .addCase(deleteFlight.rejected, (state) => {
        state.deleteFlightStatus = 'failed';
      })

      // Update Flight
      .addCase(updateFlight.pending, (state) => {
        state.updateFlightStatus = 'loading';
      })
      .addCase(updateFlight.fulfilled, (state) => {
        state.updateFlightStatus = 'succeeded';
      })
      .addCase(updateFlight.rejected, (state) => {
        state.updateFlightStatus = 'failed';
      });
  },
});

export default flightSlice.reducer;