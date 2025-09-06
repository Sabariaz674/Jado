// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import flightReducer from "./slices/flightSlice";
import flightSummaryReducer from "./slices/flightSummarySlice";
import seatsReducer from "./slices/seatsSlice";
import passengerReducer from "./slices/passengerSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    flights: flightReducer,
    flightSummary: flightSummaryReducer,
    seats: seatsReducer, 
     passenger: passengerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
