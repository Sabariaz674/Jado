import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCriteria, searchFlights } from "../../redux/slices/flightSlice";
import OneWayFields from "../userPagesComponents/searchBox/OneWayFields";
import RoundTripFields from "../userPagesComponents/searchBox/RoundTripFields";
import MultiCityFields from "../userPagesComponents/searchBox/MultiCityFields";
import TravellersDropdown from "../userPagesComponents/searchBox/TravellersDropdown";

function useOutsideClick(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onOutside?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onOutside]);
}

const SearchBox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // basic fields
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("one-way");

  // travellers
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");
  const [openTravellers, setOpenTravellers] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setOpenTravellers(false));

  // multi-city
  const [multiTrips, setMultiTrips] = useState([{ from: "", to: "", depart: "" }]);

  const onChangeTrip = (i, field, value) => {
    setMultiTrips((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: value };
      return copy;
    });
  };
  const onAddTrip = () => setMultiTrips((p) => [...p, { from: "", to: "", depart: "" }]);
  const onRemoveTrip = (i) =>
    setMultiTrips((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)));

  const on = (setter) => (e) => setter(e.target.value);

  // search
  const handleSearch = () => {
    if (tripType !== "multi-city") {
      if (!from.trim() || !to.trim()) {
        alert("Please enter both From and To");
        return;
      }
    } else {
      for (let idx = 0; idx < multiTrips.length; idx++) {
        const seg = multiTrips[idx];
        if (!seg.from.trim() || !seg.to.trim() || !seg.depart) {
          alert(`Please complete all fields for segment ${idx + 1}`);
          return;
        }
      }
    }

    const criteria = {
      from: from.trim().toUpperCase(),
      to: to.trim().toUpperCase(),
      tripType,
      depart: depart || undefined,
      returnDate: tripType === "round-trip" ? returnDate || undefined : undefined,
      adults,
      children,
      cabinClass,
      ...(tripType === "multi-city" && {
        multiTrips: multiTrips.map((t) => ({
          ...t,
          from: t.from.trim().toUpperCase(),
          to: t.to.trim().toUpperCase(),
        })),
      }),
    };

    dispatch(setSearchCriteria(criteria));
    dispatch(searchFlights(criteria));

    const params = new URLSearchParams();
    Object.entries(criteria).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        params.set(k, typeof v === "string" ? v : JSON.stringify(v));
      }
    });
    navigate(`/flight-search?${params.toString()}`);
  };

  // reusable travellers + search block
  const TravellersAndSearch = (
    <div className="flex flex-col md:flex-row items-end gap-2 w-full lg:w-auto">
      <TravellersDropdown
        dropdownRef={dropdownRef}
        open={openTravellers}
        setOpen={setOpenTravellers}
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        cabinClass={cabinClass}
        setCabinClass={setCabinClass}
      />
      <button
        className="bg-[#1e3a8a] hover:bg-[#1e3a8a]  text-white font-semibold px-6 py-3 rounded-xl transition w-full mt-4 md:mt-0"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-10 px-4 sm:px-8 mb-15">
      {/* Trip Type */}
      <div className="w-full max-w-7xl mb-4">
        <label htmlFor="trip-type" className="sr-only">
          Trip Type
        </label>
        <select
          id="trip-type"
          value={tripType}
          onChange={on(setTripType)}
          className="p-2 border border-[#1e3a8a] rounded-xl w-full sm:w-auto text-sm font-semibold text-[#1e3a8a] outline-none"
        >
          <option value="one-way">One Way</option>
          <option value="round-trip">Round Trip</option>
          <option value="multi-city">Multi-City</option>
        </select>
      </div>

      {/* Main Card */}
      <div className="flex flex-col shadow-lg w-full max-w-5xl bg-white p-6 rounded-2xl">
        {/* Top row for one-way / round-trip */}
        {tripType === "one-way" && (
          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
            <OneWayFields
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
              depart={depart}
              setDepart={setDepart}
            />
            {TravellersAndSearch}
          </div>
        )}

        {tripType === "round-trip" && (
          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
            <RoundTripFields
              from={from}
              setFrom={setFrom}
              to={to}
              setTo={setTo}
              depart={depart}
              setDepart={setDepart}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
            />
            {TravellersAndSearch}
          </div>
        )}

        {/* Multi-city UI */}
        {tripType === "multi-city" && (
          <>
            <MultiCityFields
              trips={multiTrips}
              onChangeTrip={onChangeTrip}
              onAddTrip={onAddTrip}
              onRemoveTrip={onRemoveTrip}
            />
            <div className="mt-4 flex justify-end">{TravellersAndSearch}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
