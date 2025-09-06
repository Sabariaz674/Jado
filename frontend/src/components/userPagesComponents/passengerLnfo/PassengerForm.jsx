import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { createStripeCheckoutSession } from "../../../api/passenger"; 


function readCookieJSON(name) {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${encodeURIComponent(name)}=`));
  if (!match) return null;
  try {
    const value = decodeURIComponent(match.split("=")[1]);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

const PassengerForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { seat, gender, classType } = state || {};

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("passengerInfo");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          dob: "",
          email: "",
          phone: "",
          sameAsP1: false,
          ecFirst: "",
          ecLast: "",
          ecEmail: "",
          ecPhone: "",
        };
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSameAsP1 = () => {
    setFormData((prev) => ({
      ...prev,
      sameAsP1: !prev.sameAsP1,
      ecFirst: !prev.sameAsP1 ? prev.firstName : "",
      ecLast: !prev.sameAsP1 ? prev.lastName : "",
      ecEmail: !prev.sameAsP1 ? prev.email : "",
      ecPhone: !prev.sameAsP1 ? prev.phone : "",
    }));
  };

  const handleSubmit = async () => {
    if (
      !seat ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.email ||
      !formData.phone
    ) {
      alert("Please fill all required fields and select a seat.");
      return;
    }

    // ✅ Stripe public key
     const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    
    const user = readCookieJSON("user");

    if (!user || !user._id) {
      alert("Please login before booking a flight.");
      return;
    }

    const selectedFlights =
      JSON.parse(localStorage.getItem("selectedFlights")) || [];

    const passenger = {
      ...formData,
      seatId: seat,
      gender,
      classType,
    };

    localStorage.setItem("passengerInfo", JSON.stringify(passenger));

    const subtotal = selectedFlights.reduce(
      (sum, f) => sum + (Number(f.price) || 0),
      0
    );
    const upgradeFee = classType === "business" ? 150 : 0;
    const totalPaid = subtotal + Math.round(subtotal * 0.24) + upgradeFee;

    const body = {
      passenger,
      flights: selectedFlights,
      totalPaid,
      user: user._id,
    };

    try {
      console.log("Sending body to backend:", body);

      // Use helper function 
      const res = await createStripeCheckoutSession(body);

      if (res?.id) {
        await stripe.redirectToCheckout({ sessionId: res.id });
      } else if (res?.url) {
        window.location.href = res.url;
      } else {
        alert("Failed to initiate Stripe session");
      }
    } catch (error) {
      console.error("Stripe session error:", error.message);
      alert(error.message || "Something went wrong with payment. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-[#1e3a8a]">
        Passenger Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-500 mb-1">First Name*</label>
          <input
            className="border p-2 w-full rounded"
            value={formData.firstName}
            onChange={handleChange("firstName")}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Name*</label>
          <input
            className="border p-2 w-full rounded"
            value={formData.lastName}
            onChange={handleChange("lastName")}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Date of Birth*</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={formData.dob}
            onChange={handleChange("dob")}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email*</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={formData.email}
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Phone*</label>
          <input
            type="tel"
            className="border p-2 w-full rounded"
            value={formData.phone}
            onChange={handleChange("phone")}
          />
        </div>

        {/* Read-only info fields */}
        <div>
          <label className="block text-sm text-gray-500 mb-1">Gender</label>
          <input
            readOnly
            className="border p-2 w-full rounded bg-gray-100"
            value={gender || ""}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Selected Seat</label>
          <input
            readOnly
            className="border p-2 w-full rounded bg-gray-100"
            value={seat || ""}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Type</label>
          <input
            readOnly
            className="border p-2 w-full rounded bg-gray-100"
            value={classType || ""}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="bg-[#1e3a8a] text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default PassengerForm;
