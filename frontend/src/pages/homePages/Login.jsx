import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess, setError } from '../../redux/slices/authSlice';
import GoogleLogin from './GoogleLogin'
import LeftAnimation from '../../components/common/LeftAnimation';
import Cookies from 'js-cookie';  // Import js-cookie
import axios from 'axios'; // Import axios

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError('')); // Clear any previous error messages

    try {
      
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        { email, password },
        { withCredentials: true } 
      );

     
      const result = response.data;

      if (response.status === 200) {
        dispatch(loginSuccess({ user: result.user }));
        // Store user info in a cookie
        Cookies.set('user-info', JSON.stringify(result.user), { expires: 7, secure: true, sameSite: 'Strict' });

        if (result.user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
     
      if (err.response) {
        
        dispatch(setError(err.response.data.message || '❌ Something went wrong'));
      } else if (err.request) {
       
        dispatch(setError('❌ No response from server. Please try again.'));
      } else {
        
        dispatch(setError('❌ Something went wrong with the request.'));
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-xl mx-auto mt-15 bg-white rounded-lg shadow-md overflow-hidden mb-15">
      <LeftAnimation />
      <div className="w-full md:w-1/2 p-6 text-black sm:">
        <h2 className="text-2xl font-bold text-center text-[#1e3a8a] mb-6">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border-2 border-gray-300 outline-none focus:outline-blue-500 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border-2 border-gray-300 outline-none focus:outline-blue-500 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold px-4 py-2 rounded-full shadow-md"
          >
            Sign In
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex justify-between text-sm text-[#334155] mt-4">
            <Link to="/forgot-password" className="hover:text-[#1e3a8a]">Forgot Password?</Link>
            <Link to="/signup" className="hover:text-[#1e3a8a]">Sign Up</Link>
          </div>

          <div className="my-4 text-center">
            <GoogleLogin onSuccessCallback={() => navigate('/')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
