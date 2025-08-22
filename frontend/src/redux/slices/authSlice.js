
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    // Add the clearMessages reducer to reset error and message
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const { loginSuccess, logout, setError, setMessage, clearMessages } = authSlice.actions;
export default authSlice.reducer;
