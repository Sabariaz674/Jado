
import React, { useEffect, useState } from 'react';
import { initialFlightFormData } from '../../data';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { addFlight, updateFlight } from '../../redux/slices/flightSlice';


const AIRLINE_NAME = /^[A-Za-z][A-Za-z\s]{1,49}$/;
const FLIGHT_CODE_7 = /^[A-Z0-9]{7}$/;
const IATA3 = /^[A-Z]{3}$/;
const TIME_12H = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

const AddFlightForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();                     
  const flightToEdit = location.state?.flight;    
  const isEdit = Boolean(id || flightToEdit?._id);
  const updateId = flightToEdit?._id || id;    

  const [formData, setFormData] = useState(initialFlightFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (flightToEdit) {
      setFormData({
        ...initialFlightFormData,
        ...flightToEdit,
        meal: String(parseInt(flightToEdit.meal) || 0),
      });
    }
  }, [flightToEdit]);

  const setErr = (name, msg) => setErrors((p) => ({ ...p, [name]: msg }));
  const clearErr = (name) =>
    setErrors((p) => {
      const c = { ...p };
      delete c[name];
      return c;
    });

  const normalizeTime = (v) => {
    if (!v) return v;
    const t = v.toUpperCase().replace(/\s+/g, '');
    const m = t.match(/^(0?[1-9]|1[0-2]):([0-5][0-9])(AM|PM)$/);
    if (!m) return v.trim();
    return `${m[1]}:${m[2]} ${m[3]}`;
  };

  const validateField = (name, value) => {
    const v = (typeof value === 'string' ? value : value ?? '').toString().trim();
    switch (name) {
      case 'airline':
        if (!v) return 'Airline name is required';
        if (!AIRLINE_NAME.test(v)) return 'Only letters and spaces (2–50 chars)';
        return '';
      case 'flightCode':
        if (!v) return 'Flight code is required';
        if (!FLIGHT_CODE_7.test(v)) return 'Exactly 7 uppercase letters/numbers';
        return '';
      case 'lax':
      case 'laf':
        if (!v) return 'Airport code is required';
        if (!IATA3.test(v)) return 'Use 3-letter airport code (e.g., LAX)';
        return '';
      case 'departureTime':
      case 'arrivalTime':
        if (!v) return 'Time is required';
        if (!TIME_12H.test(v)) return 'Use time like 7:00AM or 10:30 PM';
        return '';
      case 'stop': {
        if (!v) return 'Stops is required';
        const n = parseInt(v, 10);
        if (Number.isNaN(n) || n < 0) return 'Enter a non-negative number';
        return '';
      }
      case 'price': {
        if (v === '' || v === null) return 'Price is required';
        const num = Number(v);
        if (!Number.isFinite(num) || num <= 0) return 'Enter a price greater than 0';
        return '';
      }
      case 'meal': {
        const n = parseInt(v || '0', 10);
        if (Number.isNaN(n) || n < 0) return 'Meals must be 0 or more';
        return '';
      }
      case 'logo': {
        if (!value) return ''; // optional
        if (!(value instanceof File)) return 'Invalid file';
        if (!value.type?.startsWith('image/')) return 'Logo must be an image';
        return '';
      }
      case 'type':
        if (!v) return 'Ticket type is required';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const keys = [
      'airline',
      'flightCode',
      'stop',
      'lax',
      'departureTime',
      'laf',
      'arrivalTime',
      'price',
      'type',
      'meal',
      'logo',
    ];
    const errs = {};
    keys.forEach((k) => {
      const msg = validateField(k, formData[k]);
      if (msg) errs[k] = msg;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let nextVal = name === 'logo' ? files?.[0] : value;

    if (name === 'flightCode') nextVal = String(nextVal).toUpperCase().replace(/\s+/g, '');
    if (name === 'lax' || name === 'laf') nextVal = String(nextVal).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    if (name === 'airline') nextVal = String(nextVal).replace(/[^A-Za-z\s]/g, '');
    if (name === 'stop' || name === 'meal') nextVal = String(nextVal).replace(/[^\d]/g, '').slice(0, 6);
    if (name === 'price') nextVal = String(nextVal).replace(/[^\d.]/g, '');

    setFormData((p) => ({ ...p, [name]: nextVal }));
    const msg = validateField(name, nextVal);
    if (msg) setErr(name, msg);
    else clearErr(name);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'departureTime' || name === 'arrivalTime') {
      const formatted = normalizeTime(value);
      setFormData((p) => ({ ...p, [name]: formatted }));
      const msg = validateField(name, formatted);
      if (msg) setErr(name, msg);
      else clearErr(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === 'meal') {
        const qty = parseInt(val, 10) || 0;
        payload.append('meal', qty > 0 ? `${qty} Meal${qty > 1 ? 's' : ''}` : 'No Meal');
      } else if (key === 'logo' && val) {
        payload.append('logo', val);
      } else if (key === 'stop') {
        payload.append('stop', parseInt(val, 10) || 0);
      } else if (key === 'price') {
        payload.append('price', Number(val));
      } else {
        payload.append(key, val);
      }
    });
    payload.append('departure', `${formData.departureTime} - ${formData.arrivalTime}`);

    try {
      if (isEdit && updateId) {
        await dispatch(updateFlight({ id: updateId, formData: payload })).unwrap();
      } else {
        await dispatch(addFlight(payload)).unwrap();
      }
      navigate('/flight-schedule', { replace: true });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const renderInput = (
    label,
    name,
    type = 'text',
    colSpan = 1,
    placeholder = '',
    required = true,
    extraProps = {}
  ) => (
    <div className={`md:col-span-${colSpan}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={type === 'file' ? undefined : formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        accept={type === 'file' ? 'image/*' : undefined}
        required={required}
        aria-invalid={!!errors[name]}
        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
          errors[name] ? 'border-red-400' : 'border-gray-300'
        }`}
        {...extraProps}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name]}</p>}
    </div>
  );

  return (
    
      <div className="w-full max-w-310 ">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#1e3a8a]">
              {isEdit ? 'Update Flight' : 'Add New Flight'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("Airline Name", "airline", "text", 1, "e.g., Qatar Airways")}
            {renderInput("Airline Logo", "logo", "file")}
            {renderInput("Flight Code (7 chars)", "flightCode", "text", 1, "e.g., QR123AB", true, { maxLength: 7 })}
            {renderInput("Number of Stops", "stop", "text", 1, "e.g., 1 or 0 (Non-stop)", true, { inputMode: 'numeric' })}
            {renderInput("Departure Airport Code", "lax", "text", 1, "e.g., LAX", true, { maxLength: 3 })}
            {renderInput("Departure Time", "departureTime", "text", 1, "e.g., 7:00AM")}
            {renderInput("Arrival Airport Code", "laf", "text", 1, "e.g., JFK", true, { maxLength: 3 })}
            {renderInput("Arrival Time", "arrivalTime", "text", 1, "e.g., 4:15PM")}
            {renderInput("Duration", "duration", "text", 1, "e.g., 7h 30m", false)}
            {renderInput("Price (per person)", "price", "text", 1, "e.g., 450", true, { inputMode: 'decimal' })}
            {renderInput("Ticket Type", "type", "text", 1, "e.g., round trip")}
            {renderInput("Baggage Info", "baggage", "text", 1, "e.g., 1 baggage", false)}
            {renderInput("Number of Meals", "meal", "text", 2, "e.g., 0, 1, 2...", true, { inputMode: 'numeric' })}

            <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => navigate('/flight-schedule')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#1e3a8a] rounded-md hover:bg-[#152963]"
              >
                {isEdit ? 'Update Flight' : 'Add Flight'}
              </button>
            </div>
          </form>

        </div>
      </div>
    
  );
};

export default AddFlightForm;
