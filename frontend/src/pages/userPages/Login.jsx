// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginSuccess, setError } from '../../redux/slices/authSlice';
import GoogleLogin from './GoogleLogin';
import LeftAnimation from '../../components/common/LeftAnimation';
import Cookies from 'js-cookie';
import { loginApi } from '../../api/auth'; // helper


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^.{6,}$/;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);


  const [fieldErrors, setFieldErrors] = useState({});


  const rawNext = new URLSearchParams(location.search).get('next') || '/';
  const next = rawNext.startsWith('/login') ? '/' : rawNext;

 
  const setFieldErr = (k, msg) =>
    setFieldErrors((e) => ({ ...e, [k]: msg }));
  const clearFieldErr = (k) =>
    setFieldErrors((e) => {
      const c = { ...e };
      delete c[k];
      return c;
    });

  
  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!emailRegex.test(email.trim())) errs.email = 'Enter a valid email';

    if (!password) errs.password = 'Password is required';
    else if (!passwordRegex.test(password)) errs.password = 'At least 6 characters';

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };


  const onEmailChange = (v) => {
    setEmail(v);
    if (!v.trim()) setFieldErr('email', 'Email is required');
    else if (!emailRegex.test(v.trim())) setFieldErr('email', 'Enter a valid email');
    else clearFieldErr('email');
  };
  const onPasswordChange = (v) => {
    setPassword(v);
    if (!v) setFieldErr('password', 'Password is required');
    else if (!passwordRegex.test(v)) setFieldErr('password', 'At least 6 characters');
    else clearFieldErr('password');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(''));

   
    if (!validate()) return;

    setLoading(true);
    try {
      const { data, status } = await loginApi({ email: email.trim(), password });
      if (status === 200) {
       
        dispatch(loginSuccess({ user: data.user, token: data.token }));

       
        Cookies.set('user', JSON.stringify(data.user), {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });
        Cookies.set('token', data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });

        
        if (data.user?.isAdmin) {
          navigate('/admin-dashboard', { replace: true });
        } else {
          navigate(next, { replace: true });
        }
      }
    } catch (err) {
      if (err.response) {
        dispatch(setError(err.response.data?.message || '❌ Something went wrong'));
      } else if (err.request) {
        dispatch(setError('❌ No response from server. Please try again.'));
      } else {
        dispatch(setError('❌ Something went wrong with the request.'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-xl mx-auto mt-15 bg-white rounded-lg shadow-md overflow-hidden mb-15">
      <LeftAnimation />
      <div className="w-full md:w-1/2 p-6 text-black">
        <h2 className="text-2xl font-bold text-center text-[#1e3a8a] mb-6">Login</h2>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Email"
              className={`w-full px-4 py-2 border-2 rounded outline-none focus:outline-blue-500 ${
                fieldErrors.email ? 'border-red-400' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-2 border-2 rounded outline-none focus:outline-blue-500 ${
                fieldErrors.password ? 'border-red-400' : 'border-gray-300'
              }`}
              required
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold px-4 py-2 rounded-full shadow-md disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex justify-between text-sm text-[#334155] mt-4">
            <Link to="/forgot-password" className="hover:text-[#1e3a8a]">Forgot Password?</Link>
            <Link to="/signup" className="hover:text-[#1e3a8a]">Sign Up</Link>
          </div>

          <div className="my-4 text-center">
            <GoogleLogin onSuccessCallback={() => navigate(next, { replace: true })} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
