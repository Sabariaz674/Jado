import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchFlights,
  addFlight,
  deleteFlight,
  updateFlight,
} from '../../redux/slices/flightSlice';
import AddFlightForm from '../../components/adminPagesComponents/AddFlightForm';
import FlightScheduleListing from '../../components/adminPagesComponents/FlightScheduleListing';

const FlightSchedule = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);          
  const [editingFlight, setEditingFlight] = useState(null); 

  
  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
    setEditingFlight(null); 
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingFlight) {
        await dispatch(updateFlight({ id: editingFlight._id, formData })).unwrap();
      } else {
        await dispatch(addFlight(formData)).unwrap();
      }

     
      dispatch(fetchFlights());
      setShowForm(false);
      setEditingFlight(null);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  
  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this flight?");
    if (!confirmed) return;

    try {
      await dispatch(deleteFlight(id)).unwrap();
      dispatch(fetchFlights());
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setShowForm(true);
  };

  return (
    <div className="py-12 px-6 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-7xl">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Flight Schedule Management
          </h1>

          {showForm && (
            <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                {editingFlight ? 'Update Flight' : 'Add New Flight'}
              </h2>

              <AddFlightForm
                onClose={toggleForm}
                onSubmit={handleSubmit}
                flightToEdit={editingFlight}
              />
            </div>
          )}

          <div className="flex justify-end mb-6">
            <button
              onClick={toggleForm}
              className="bg-[#1e3a8a] hover:bg-[#152960] transition-colors duration-300 text-white font-bold py-3 px-6 rounded-md shadow-lg"
            >
              {showForm ? 'Hide Form' : 'Add New Flight'}
            </button>
          </div>

          <FlightScheduleListing
            onDeleteFlight={handleDelete}
            onUpdateFlight={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightSchedule;
