// src/components/adminPagesComponents/AddFlightForm.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';                      // ✅ axios instance yahin se
import { initialFlightFormData } from '../../data';

const AddFlightForm = ({ onClose, onAddFlight, flightToEdit }) => {
  const [formData, setFormData] = useState(initialFlightFormData);

  useEffect(() => {
    if (flightToEdit) {
      setFormData({
        ...initialFlightFormData,
        ...flightToEdit,
        meal: String(parseInt(flightToEdit.meal) || 0),
      });
    }
  }, [flightToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'logo' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === 'meal') {
        const qty = parseInt(val, 10);
        payload.append('meal', qty > 0 ? `${qty} Meal${qty > 1 ? 's' : ''}` : 'No Meal');
      } else if (key === 'logo' && val) {
        payload.append('logo', val);
      } else {
        payload.append(key, key === 'price' ? Number(val) : val);
      }
    });

    payload.append('departure', `${formData.departureTime} - ${formData.arrivalTime}`);

    const path = `/api/flights${flightToEdit ? `/${flightToEdit._id}` : '/createFlight'}`;
    const method = flightToEdit ? 'put' : 'post';

    try {
      const { data } = await api[method](path, payload); // ✅ baseURL + cookies handled
      onAddFlight?.(data);
      onClose?.();
    } catch (err) {
      console.error('Flight submission error:', err.response?.data || err.message);
      onClose?.();
    }
  };

  const renderInput = (label, name, type = 'text', colSpan = 1, placeholder = '', required = true) => (
    <div className={`md:col-span-${colSpan}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={type === 'file' ? undefined : formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        accept={type === 'file' ? 'image/*' : undefined}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#1e3a8a]">
            {flightToEdit ? 'Update Flight' : 'Add New Flight'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput("Airline Name", "airline")}
          {renderInput("Airline Logo", "logo", "file")}
          {renderInput("Flight Code", "flightCode")}
          {renderInput("Number of Stops", "stop", "text", 1, "e.g., 1 stop")}
          {renderInput("Departure Airport Code", "lax", "text", 1, "e.g., LAX")}
          {renderInput("Departure Time", "departureTime", "text", 1, "e.g., 7:00AM")}
          {renderInput("Arrival Airport Code", "laf", "text", 1, "e.g., JFK")}
          {renderInput("Arrival Time", "arrivalTime", "text", 1, "e.g., 4:15PM")}
          {renderInput("Duration", "duration")}
          {renderInput("Price (per person)", "price", "number")}
          {renderInput("Ticket Type", "type", "text", 1, "e.g., round trip")}
          {renderInput("Baggage Info", "baggage", "text", 1, "e.g., 1 baggage")}
          {renderInput("Number of Meals", "meal", "number", 2)}

          <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-3 00">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] rounded-md hover:bg-[#152963]">
              {flightToEdit ? 'Update Flight' : 'Add Flight'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlightForm;
