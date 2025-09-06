// src/redux/slices/passengerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passengerInfo: null,
};

const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    setPassengerInfo: (state, action) => {
      state.passengerInfo = action.payload;
    },
    clearPassengerInfo: (state) => {
      state.passengerInfo = null;
    },
  },
});

export const { setPassengerInfo, clearPassengerInfo } = passengerSlice.actions;
export default passengerSlice.reducer;
