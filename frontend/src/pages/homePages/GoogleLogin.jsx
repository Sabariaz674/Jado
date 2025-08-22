import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import googleLogo from "../../assets/google.png";
import { useDispatch } from 'react-redux';
import { loginSuccess, setError } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie to store user data

// This function now uses `withCredentials: true` to ensure cookies are handled.
const googleAuth = (code) => axios.get(`http://localhost:8080/auth/google?code=${code}`, {
  withCredentials: true // Crucial for sending and receiving HttpOnly cookies
});

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code);

        // Your backend now sends the token as an HttpOnly cookie,
        // so we don't try to access it from the response body.
        const { email, name, image, role } = result.data.user;

        // We use js-cookie to store the non-sensitive user data,
        // aligning with your manual login implementation.
        const userObj = { email, name, image, role };
        Cookies.set('user-info', JSON.stringify(userObj), { expires: 7, secure: true, sameSite: 'Strict' });

        // Update the Redux state with only the user object, not the token.
        dispatch(loginSuccess({ user: userObj }));

        if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/hero');
        }
      }
    } catch (err) {
      console.error('Error while requesting google code', err);
      dispatch(setError('❌ Google login failed: ' + err.message));
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
