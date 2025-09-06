import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EconomySeat from "../../components/userPagesComponents/passengerLnfo/EconomySeat";
import BusinessSeat from "../../components/userPagesComponents/passengerLnfo/BusinessSeat";
import { economyLayout, businessLayout } from "../../data";
import FlightSummary from "../../components/userPagesComponents/flightSearch/FlightSummary";
import { setSeatSelection } from "../../redux/slices/seatsSlice";

const SeatSelection = ({ flightId = "FLIGHT-1234", basePrice = 300 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

 
  const { classType, gender, selectedSeat } = useSelector((state) => state.seats);

  const reservedMap = useMemo(
    () =>
      classType === "economy"
        ? { "1A": { gender: "male" }, "2B": { gender: "female" } }
        : {},
    [classType]
  );

  const handleSeatSelect = (seat) => {
    dispatch(setSeatSelection({ classType, selectedSeat: seat, gender }));
  };

  const handleGenderChange = (g) => {
    dispatch(setSeatSelection({ classType, selectedSeat, gender: g }));
  };

  const handleClassChange = (c) => {
    dispatch(setSeatSelection({ classType: c, selectedSeat, gender }));
  };

  const handleContinue = () => {
    if (!selectedSeat) {
      alert("Please select a seat first");
      return;
    }
    

    const extraCharge = classType === "business" ? 150 : 0;
    const totalPrice = basePrice + extraCharge;

    const seatInfo = {
      seat: selectedSeat,
      gender,
      classType,
      flightId,
      totalPrice,
    };

    localStorage.setItem("selectedSeatInfo", JSON.stringify(seatInfo));
    navigate("/passenger-info", {
      state: {
        seat: selectedSeat,
        gender,
        classType,
        flightId,
      },
    });
  };

  const benefits = {
    economy: [
      "Standard legroom",
      "1 carry-on bag",
      "No extra charge",
      "Basic meal included",
    ],
    business: [
      "Extra legroom",
      "1 checked bag + 1 carry-on",
      "Priority boarding",
      "Complimentary meal & drinks",
      "Extra $150 charge",
    ],
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left: Seat Layout */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-lg">
          {classType === "economy" ? (
            <EconomySeat
              layout={economyLayout}
              reservedMap={reservedMap}
              selectedSeat={selectedSeat}
              gender={gender}
              onSelect={handleSeatSelect}
            />
          ) : (
            <BusinessSeat
              layout={businessLayout}
              reservedMap={reservedMap}
              selectedSeat={selectedSeat}
              gender={gender}
              onSelect={handleSeatSelect}
            />
          )}
        </div>
      </div>

      {/* Right: Info Panel + Flight Summary */}
      <div className="w-full md:flex-1 bg-white shadow-xl flex flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10 rounded-t-3xl md:rounded-none">
        <FlightSummary compact classTypeOverride={classType} selectedSeatOverride={selectedSeat} />

        {/* Class Tabs */}
        <div className="flex border-b mb-2">
          <button
            className={`flex-1 py-2 font-semibold text-sm sm:text-base ${
              classType === "economy"
                ? "border-b-4 border-[#1e3a8a] text-[#1e3a8a]"
                : "text-gray-500 hover:text-[#1e3a8a]"
            }`}
            onClick={() => handleClassChange("economy")}
          >
            Economy
          </button>
          <button
            className={`flex-1 py-2 font-semibold text-sm sm:text-base ${
              classType === "business"
                ? "border-b-4 border-[#1e3a8a] text-[#1e3a8a]"
                : "text-gray-500 hover:text-[#1e3a8a]"
            }`}
            onClick={() => handleClassChange("business")}
          >
            Business
          </button>
        </div>

        {/* Gender Select */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Passenger Gender</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => handleGenderChange("male")}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => handleGenderChange("female")}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Selected Seat Info & Benefits */}
        <div className="mt-2 text-gray-700 text-sm sm:text-base">
          <p>
            Selected Seat: <span className="font-semibold">{selectedSeat || "None"}</span>
          </p>
          <p>
            Class: <span className="font-semibold">{classType}</span>
          </p>

          <div className="mt-3">
            <p className="font-semibold mb-1">Benefits:</p>
            <ul className="list-disc list-inside">
              {benefits[classType].map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="flex-1 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e3a8a] transition"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
