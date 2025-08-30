import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFlights, deleteFlight } from '../../redux/slices/flightSlice';
import { useNavigate } from 'react-router-dom';
import FlightScheduleListing from '../../components/adminPagesComponents/FlightScheduleListing';

const FlightSchedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleUpdate = (flight) => {
    navigate(`/flight-form/${flight._id}`, { state: { flight } });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this flight?')) return;
    try {
      await dispatch(deleteFlight(id)).unwrap();
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  return (
    // Adjust py and px for small screens
    <div className="py-6 px-4 sm:py-12 sm:px-6 flex justify-center items-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
          Flight Schedule
        </h1>

        <div className="flex justify-end mb-4 sm:mb-6">
          <button
            onClick={() => navigate('/flight-form')}
            className="bg-[#1e3a8a] hover:bg-[#152960] transition-colors duration-300 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-md shadow-lg text-sm sm:text-base"
          >
            Add New Flight
          </button>
        </div>

        <FlightScheduleListing
          onDeleteFlight={handleDelete}
          onUpdateFlight={handleUpdate}
        />
      </div>
    </div>
  );
};

export default FlightSchedule;