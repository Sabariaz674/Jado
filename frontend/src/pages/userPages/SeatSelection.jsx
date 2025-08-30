import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setClassType,
  setGender,
  setFlightId,
  selectSeatLocal,
  loadReservedSeats,
  reserveSeat,
} from "../../redux/slices/seatSlice";
import EconomySeat from "../../components/userPagesComponents/passengerLnfo/EconomySeat";
import BusinessSeat from "../../components/userPagesComponents/passengerLnfo/BusinessSeat";
import economy from "../../assets/economy.png";
import business from "../../assets/business.png";
import { economyLayout, businessLayout } from "../../data";

const SeatSelection = ({ flightId: flightIdProp = "FLIGHT-1234" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classType, gender, selectedSeat, reservedMap, loading } = useSelector(
    (s) => s.seats
  );
  const selectedFlights = useSelector((s) => s.flights?.selectedFlights || []);
  const activeFlight = selectedFlights?.[0] || null;

  const derivedFlightId =
    activeFlight?.flightCode ||
    activeFlight?.flightId ||
    activeFlight?._id ||
    flightIdProp;

  const routeText = activeFlight
    ? `${activeFlight.from || activeFlight.origin || "?"} → ${activeFlight.to || activeFlight.destination || "?"}`
    : "SFO → NRT";

  const timeText = activeFlight
    ? [activeFlight.departureTime, activeFlight.arrivalTime].filter(Boolean).join(" — ")
    : "Feb 25, 7:00AM — Mar 21, 12:15PM";

  useEffect(() => {
    dispatch(setFlightId(derivedFlightId));
    dispatch(loadReservedSeats(derivedFlightId));
  }, [dispatch, derivedFlightId]);

  const handleContinue = async () => {
    if (!selectedSeat) return alert("Please select a seat first.");

    const action = await dispatch(
      reserveSeat({
        flightId: derivedFlightId,
        seatId: selectedSeat,
        gender,
        klass: classType,
      })
    );

    if (reserveSeat.fulfilled.match(action)) navigate("/passenger-info");
    else alert(action.payload?.message || "Seat reservation failed");
  };

  const onSeatClick = (seatId) => dispatch(selectSeatLocal(seatId));

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
              onSelect={onSeatClick}
              loading={loading}
            />
          ) : (
            <BusinessSeat
              layout={businessLayout}
              reservedMap={reservedMap}
              selectedSeat={selectedSeat}
              gender={gender}
              onSelect={onSeatClick}
              loading={loading}
            />
          )}
        </div>
      </div>

      {/* Right: Info Panel */}
      <div className="w-full md:flex-1 bg-white shadow-xl flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 rounded-t-3xl md:rounded-none">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 font-semibold text-sm sm:text-base ${
              classType === "economy"
                ? "border-b-4 border-[#1e3a8a] text-[#1e3a8a]"
                : "text-gray-500 hover:text-[#1e3a8a]"
            }`}
            onClick={() => dispatch(setClassType("economy"))}
          >
            Economy
          </button>
          <button
            className={`flex-1 py-2 font-semibold text-sm sm:text-base ${
              classType === "business"
                ? "border-b-4 border-[#1e3a8a] text-[#1e3a8a]"
                : "text-gray-500 hover:text-[#1e3a8a]"
            }`}
            onClick={() => dispatch(setClassType("business"))}
          >
            Business
          </button>
        </div>

        {/* Flight Details */}
        <div className="mb-4 space-y-1">
          <div className="text-sm text-gray-500">
            Flight ID:{" "}
            <span className="font-medium text-gray-700">
              {activeFlight?.flightCode || derivedFlightId}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Airline:{" "}
            <span className="font-medium text-gray-700">
              {activeFlight?.airline || "-"}
            </span>
          </div>
        </div>

        {/* Route + Time */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">{routeText}</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{timeText}</p>
        </div>

        {/* Gender Select */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">Passenger Gender</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => dispatch(setGender("male"))}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => dispatch(setGender("female"))}
              />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Seat Info */}
        {classType === "economy" ? (
          <div className="space-y-3 text-sm">
            <p>✅ Built-in entertainment system</p>
            <p>✅ Complimentary snacks and drinks</p>
            <p>✅ One free carry-on and personal item</p>
            <img src={economy} alt="Economy Seats" className="w-full rounded-lg object-cover" />
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <p>✅ Extended leg room</p>
            <p>✅ Two free checked bags</p>
            <p>✅ Priority boarding</p>
            <p>✅ Personalized service</p>
            <p>✅ Enhanced food and drink</p>
            <p>✅ Seats recline 40% more</p>
            <p>✅ Upgrade your seat for only $199</p>
            <img src={business} alt="Business Seats" className="w-full rounded-lg object-cover" />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-6">
          <button
            className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => navigate(-1)}
          >
            Save & Close
          </button>
          <button
            className="flex-1 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e3a8a] transition disabled:opacity-60"
            onClick={handleContinue}
            disabled={!selectedSeat || loading}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
