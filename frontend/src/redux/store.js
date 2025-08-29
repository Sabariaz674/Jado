import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import flightReducer from "./slices/flightSlice";
import passengerReducer from "./slices/PassengerSlice";
import seatReducer from "./slices/seatSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,       // Login / Signup / Auth
    flights: flightReducer,  // Flight related state
    passenger: passengerReducer, // Passenger details
    seats: seatReducer,      // Seat fetch + reserve (cookies ke sath)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Cookies ki wajah se serializable check hata diya
    }),
});

export default store;
