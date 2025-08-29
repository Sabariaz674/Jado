// src/pages/auth/SignUp.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LeftAnimation from '../../components/common/LeftAnimation';
import { setError, setMessage, clearMessages } from '../../redux/slices/authSlice';
import { signupApi } from '../../api/auth'; // <-- FIX: use helper (was '../../../api' by mistake)

const SignUp = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleManualSignup = async (e) => {
    e.preventDefault();
    dispatch(clearMessages());

    try {
      const response = await signupApi(formData);//helpur function
      if (response.status === 201) {
        dispatch(setMessage('✅ Signup successful. Please Login.'));
        navigate('/login');
      } else {
        dispatch(setError(response.data?.message || '❌ Something went wrong.'));
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || '❌ Something went wrong, please try again.'));
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full ml-100 mb-15 mt-15" style={{
      width: '90vw',
      maxWidth: '700px',
      padding: 0,
      borderRadius: '12px',
      background: 'white',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      border: 'none',
      overflow: 'hidden',
    }}>
      <LeftAnimation />
      <div className="w-full md:w-2/2 p-6 text-black">
        <h2 className="text-2xl mb-4 text-[#4A90E2] text-center">Sign Up for Jadoo</h2>
        <form onSubmit={handleManualSignup}>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full mb-4 px-4 py-2 border-2 border-gray-300 outline-none focus:outline-blue-500" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mb-4 px-4 py-2 border-2 border-gray-300 outline-none focus:outline-blue-500" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full mb-4 px-4 py-2 border-2 border-gray-300 outline-none focus:outline-blue-500" required />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full mb-4 px-4 py-2 border-2 border-gray-300 outline-none focus:outline-blue-500" required />

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {message && <div className="text-green-500 text-sm mb-4">{message}</div>}

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" required />
            <label className="text-sm">I agree to the terms and conditions</label>
          </div>

          <div className="my-4 flex items-center">
            <div className="flex-1 h-[1px] bg-gray-300" />
            <span className="mx-4 text-sm">or</span>
            <div className="flex-1 h-[1px] bg-gray-300" />
          </div>

          <button type="submit" className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white font-semibold px-6 py-3 w-full shadow-md transition duration-300">
            Create Account
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to="/login" className="inline-block text-[#1e3a8a] font-semibold px-6 py-3 rounded-md transition duration-300 cursor-pointer">
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
