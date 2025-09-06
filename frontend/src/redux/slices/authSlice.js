// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

/**
 * NOTE:
 * - httpOnly "token" cookie React se READ nahi hoti (security).
 * - Isliye yahan sirf "userInfo" ko client-readable cookie me store kar rahe hain
 *   taake refresh par user hydrate ho jaye.
 * - Auth checks => state.isAuthenticated || !!state.user
 */

const getInitialState = () => {
  const userInfoCookie = Cookies.get('userInfo');
  if (userInfoCookie) {
    try {
      const user = JSON.parse(userInfoCookie);
      return {
        user,
        // token ko client cookie se mat padho; server httpOnly cookie handle karega
        token: null,
        isAuthenticated: true,
        error: null,
        message: null,
      };
    } catch (error) {
      console.error('Failed to parse user info from cookie:', error);
      Cookies.remove('userInfo');
    }
  }
  return {
    user: null,
    token: null,            // optional: memory-only token if you really need
    isAuthenticated: false,
    error: null,
    message: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    // payload: { user, token? }
    loginSuccess: (state, action) => {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null; // keep in memory ONLY if you must send Bearer headers
      state.isAuthenticated = !!user;

      // client-readable cookie for user (7 days)
      if (user) {
        Cookies.set('userInfo', JSON.stringify(user), { expires: 7, sameSite: 'Lax' });
      }
      // DO NOT set a readable "token" cookie here; backend already set httpOnly cookie
    },

    // optional: restore from user object (e.g., after /auth/me)
    setUser: (state, action) => {
      const user = action.payload || null;
      state.user = user;
      state.isAuthenticated = !!user;
      if (user) {
        Cookies.set('userInfo', JSON.stringify(user), { expires: 7, sameSite: 'Lax' });
      } else {
        Cookies.remove('userInfo');
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove('userInfo');
      // NOTE: httpOnly token cookie ko clear karne ke liye backend /auth/logout hit karein
      // jo res.clearCookie('token', { sameSite: 'Lax', secure: false, httpOnly: true }) kare.
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
});

export const { loginSuccess, setUser, logout, setError, setMessage, clearMessages } = authSlice.actions;
export default authSlice.reducer;

// (optional) convenient selectors
export const selectAuth = (s) => s.auth;
export const selectUser = (s) => s.auth.user;
export const selectIsAuthed = (s) => !!(s.auth.isAuthenticated || s.auth.user);
