import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


const getInitialState = () => {
  const userInfoCookie = Cookies.get('userInfo');
  const tokenCookie = Cookies.get('token');

  if (userInfoCookie && tokenCookie) {
    try {
      const user = JSON.parse(userInfoCookie);
      return {
        user: user,
        token: tokenCookie,
        error: null,
        message: null,
      };
    } catch (error) {
      console.error("Failed to parse user info from cookie:", error);
     
      Cookies.remove('userInfo');
      Cookies.remove('token');
      return {
        user: null,
        token: null,
        error: null,
        message: null,
      };
    }
  }

  return {
    user: null,
    token: null,
    error: null,
    message: null,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(), 
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      
      Cookies.set('userInfo', JSON.stringify(action.payload.user), { expires: 7 }); // Expires in 7 days
      Cookies.set('token', action.payload.token, { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      
     
      Cookies.remove('userInfo');
      Cookies.remove('token');
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

export const { loginSuccess, logout, setError, setMessage, clearMessages } = authSlice.actions;
export default authSlice.reducer;