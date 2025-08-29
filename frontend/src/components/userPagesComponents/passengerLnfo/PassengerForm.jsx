// src/components/userPagesComponents/passengerLnfo/PassengerForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPassengerData, savePassenger } from "../../../redux/slices/PassengerSlice";
import {
  defaultFormData,
  isValidEmail,
  isValidPhone,
  getFallbackFlightId,
  getGenderChipClass
} from "../../../data";

const PassengerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedSeat = useSelector(s => s.seats.selectedSeat);
  const seatGender = useSelector(s => s.seats.gender);
  const seatFlightId = useSelector(s => s.seats.flightId);
  const selectedFlights = useSelector(s => s.flights?.selectedFlights || []);

  const flightId = seatFlightId || getFallbackFlightId(selectedFlights);

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  useEffect(() => {
    if (formData.sameAsP1) {
      setFormData(prev => ({
        ...prev,
        ecFirst: prev.firstName,
        ecLast: prev.lastName,
        ecEmail: prev.email,
        ecPhone: prev.phone
      }));
    }
  }, [formData.sameAsP1, formData.firstName, formData.lastName, formData.email, formData.phone]);

  const validate = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.dob &&
      isValidEmail(formData.email) &&
      isValidPhone(formData.phone) &&
      selectedSeat
    );
  };

  const handlePayment = async () => {
    if (!validate()) {
      console.log("Please fill all required fields and select a seat.");
      return;
    }

    const payload = {
      ...formData,
      gender: seatGender,
      seatId: selectedSeat,
      flightId
    };

    dispatch(setPassengerData(payload));
    const result = await dispatch(savePassenger(payload));
    if (savePassenger.rejected.match(result)) {
      console.log(result.payload?.message || "Could not save passenger");
    } else {
      navigate("/payment");
    }
  };

  const genderChip = getGenderChipClass(seatGender);

  const TextInput = ({ label, value, onChange, ...rest }) => (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">{label}</label>
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-10 w-full">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Passenger Information</h2>
          <p className="text-sm text-gray-500">Enter traveler details exactly as on the government ID.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm capitalize ${genderChip}`}>{seatGender || "—"}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${genderChip}`} title="Selected seat">
            Seat: {selectedSeat || "—"}
          </span>
        </div>
      </div>

      {/* Passenger 1 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Passenger 1 (Adult)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput label="First name*" value={formData.firstName} onChange={handleChange("firstName")} />
          <TextInput label="Last name*" value={formData.lastName} onChange={handleChange("lastName")} />
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Gender*</label>
            <input
              readOnly value={seatGender || ""}
              className="p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700"
              placeholder="Select on seat page"
            />
            <span className="text-xs text-gray-400 mt-1">(Change gender from Seat Selection page)</span>
          </div>
          <TextInput label="Date of birth*" type="date" value={formData.dob} onChange={handleChange("dob")} />
          <TextInput label="Email address*" type="email" value={formData.email} onChange={handleChange("email")} />
          <TextInput label="Phone number*" type="tel" value={formData.phone} onChange={handleChange("phone")} />
        </div>
      </div>

      {/* Emergency contact */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Emergency contact information</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={formData.sameAsP1}
            onChange={(e) => setFormData(prev => ({ ...prev, sameAsP1: e.target.checked }))}
            className="mr-2 h-4 w-4 text-[#1e3a8a] border-gray-300 rounded"
          />
          <label className="text-sm text-gray-500">Same as Passenger 1</label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput placeholder="First name" value={formData.ecFirst} onChange={handleChange("ecFirst")} />
          <TextInput placeholder="Last name" value={formData.ecLast} onChange={handleChange("ecLast")} />
          <TextInput placeholder="Email" type="email" value={formData.ecEmail} onChange={handleChange("ecEmail")} />
          <TextInput placeholder="Phone" type="tel" value={formData.ecPhone} onChange={handleChange("ecPhone")} />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          className="bg-white text-[#1e3a8a] border border-[#1e3a8a] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          type="button"
          disabled={!selectedSeat}
          onClick={handlePayment}
          className={`font-semibold py-3 px-6 rounded-lg transition ${
            selectedSeat ? "bg-[#1e3a8a] text-white hover:bg-blue-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Payment
        </button>
      </div>
    </div>
  );
};

export default PassengerForm;
