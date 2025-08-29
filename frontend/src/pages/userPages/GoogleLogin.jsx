// src/pages/auth/GoogleLogin.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginSuccess, setError } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import googleLogo from "../../assets/google.png";
import { exchangeGoogleCode } from '../../api/auth'; // <-- helper

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const { data } = await exchangeGoogleCode(authResult.code);//helper function

        const { email, name, image, role } = data.user || {};
        const userObj = { email, name, image, role };

        Cookies.set('userInfo', JSON.stringify(userObj), {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });

        dispatch(loginSuccess({ user: userObj }));

        if (role === 'admin') navigate('/admin-dashboard');
        else navigate('/');
      }
    } catch (err) {
      console.error('Error while requesting Google code', err);
      dispatch(setError('❌ Google login failed: ' + (err.response?.data?.message || err.message)));
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error('Google login error:', error);
      dispatch(setError('❌ Google login failed: ' + error.message));
    },
    flow: 'auth-code',
  });

  return (
    <button
      onClick={googleLogin}
      className="border border-gray-300 hover:border-blue-600 text-blue-600 font-medium px-4 py-2 rounded-md shadow-md w-full flex items-center justify-center space-x-3 transition duration-200"
    >
      <img src={googleLogo} alt="Google" className="w-5 h-5" />
      <span className="text-sm sm:text-base">Continue with Google</span>
    </button>
  );
};

export default GoogleLogin;
