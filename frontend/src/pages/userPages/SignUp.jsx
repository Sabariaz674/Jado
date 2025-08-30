// src/pages/auth/SignUp.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LeftAnimation from '../../components/common/LeftAnimation';
import { setError, setMessage, clearMessages } from '../../redux/slices/authSlice';
import { signupApi } from '../../api/auth';

const MIN_PW_LEN = 7; 

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const passwordRegex =
  /^(?=.*[!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/]).{7,}$/; 

const usernameRegex =
  /^[A-Za-z][A-Za-z\s]{1,49}$/;

const SignUp = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const setErr = (name, msg) =>
    setFieldErrors((e) => ({ ...e, [name]: msg }));

  const clearErr = (name) =>
    setFieldErrors((e) => {
      const copy = { ...e };
      delete copy[name];
      return copy;
    });

  const validateField = (name, value, all = {}) => {
    switch (name) {
      case 'username': {
        if (!value.trim()) return 'Username is required';
        if (!usernameRegex.test(value.trim()))
          return 'Only letters/spaces (2–50 chars)';
        return '';
      }
      case 'email': {
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value.trim()))
          return 'Enter a valid email';
        return '';
      }
      case 'password': {
        if (!value) return 'Password is required';
        if (value.length < MIN_PW_LEN)
          return `At least ${MIN_PW_LEN} characters`;
        if (!passwordRegex.test(value))
          return 'Include at least 1 special character';
        return '';
      }
      case 'confirmPassword': {
        if (!value) return 'Confirm your password';
        if (value !== (all.password ?? '')) return 'Passwords do not match';
        return '';
      }
      case 'agree': {
        if (!value) return 'Please accept terms';
        return '';
      }
      default:
        return '';
    }
  };

  const validateAll = () => {
    const errs = {};
    ['username', 'email', 'password', 'confirmPassword', 'agree'].forEach((k) => {
      const msg = validateField(k, formData[k], formData);
      if (msg) errs[k] = msg;
    });
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // restrict username to letters/spaces only
    const nextValue =
      name === 'username'
        ? value.replace(/[^A-Za-z\s]/g, '')
        : value;

    const finalValue = type === 'checkbox' ? checked : nextValue;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // live-validate this field
    const msg = validateField(name, finalValue, { ...formData, [name]: finalValue });
    if (msg) setErr(name, msg);
    else clearErr(name);

    // if password changes, re-check confirm
    if (name === 'password' && formData.confirmPassword) {
      const cpMsg = validateField('confirmPassword', formData.confirmPassword, {
        ...formData,
        [name]: finalValue,
      });
      if (cpMsg) setErr('confirmPassword', cpMsg);
      else clearErr('confirmPassword');
    }
  };

  const handleManualSignup = async (e) => {
    e.preventDefault();
    dispatch(clearMessages());

    if (!validateAll()) return;

    try {
      const response = await signupApi({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 201) {
        dispatch(setMessage('✅ Signup successful. Please Login.'));
        navigate('/login');
      } else {
        dispatch(setError(response.data?.message || '❌ Something went wrong.'));
      }
    } catch (err) {
      dispatch(
        setError(err?.response?.data?.message || '❌ Something went wrong, please try again.')
      );
    }
  };

  const inputBase =
    'w-full mb-3 px-4 py-2 border-2 rounded-md outline-none focus:outline-blue-500';

  return (
    <div
      className="flex flex-col md:flex-row w-full h-full ml-100 mb-15 mt-15"
      style={{
        width: '90vw',
        maxWidth: '700px',
        padding: 0,
        borderRadius: '12px',
        background: 'white',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
        border: 'none',
        overflow: 'hidden',
      }}
    >
      <LeftAnimation />

      <div className="w-full md:w-2/2 p-6 text-black">
        <h2 className="text-2xl mb-4 text-[#4A90E2] text-center">Sign Up for Jadoo</h2>

        <form onSubmit={handleManualSignup} noValidate>
          {/* Username */}
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className={`${inputBase} ${
              fieldErrors.username ? 'border-red-400' : 'border-gray-300'
            }`}
            required
          />
          {fieldErrors.username && (
            <p className="text-red-500 text-xs -mt-2 mb-2">{fieldErrors.username}</p>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${inputBase} ${
              fieldErrors.email ? 'border-red-400' : 'border-gray-300'
            }`}
            required
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs -mt-2 mb-2">{fieldErrors.email}</p>
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password (≥7 chars & 1 special)"
            className={`${inputBase} ${
              fieldErrors.password ? 'border-red-400' : 'border-gray-300'
            }`}
            required
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-xs -mt-2 mb-2">{fieldErrors.password}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`${inputBase} ${
              fieldErrors.confirmPassword ? 'border-red-400' : 'border-gray-300'
            }`}
            required
          />
          {fieldErrors.confirmPassword && (
            <p className="text-red-500 text-xs -mt-2 mb-2">{fieldErrors.confirmPassword}</p>
          )}

          {/* Global redux messages */}
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
          {message && <div className="text-green-500 text-sm mb-3">{message}</div>}

          {/* Terms */}
          <label className="flex items-center mb-3 gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
          {fieldErrors.agree && (
            <p className="text-red-500 text-xs -mt-2 mb-2">{fieldErrors.agree}</p>
          )}

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-1 h-[1px] bg-gray-300" />
            <span className="mx-4 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-gray-300" />
          </div>

          <button
            type="submit"
            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold px-6 py-3 w-full shadow-md transition duration-300"
          >
            Create Account
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link
                to="/login"
                className="inline-block text-[#1e3a8a] font-semibold px-6 py-3 rounded-md transition duration-300 cursor-pointer"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
