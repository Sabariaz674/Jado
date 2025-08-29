import React from "react";
import OneWayFields from "./OneWayFields";

const RoundTripFields = ({
  from, setFrom,
  to, setTo,
  depart, setDepart,
  returnDate, setReturnDate
}) => {
  const on = (setter) => (e) => setter(e.target.value);

  return (
    <>
      <OneWayFields
        from={from} setFrom={setFrom}
        to={to} setTo={setTo}
        depart={depart} setDepart={setDepart}
      />
      <div className="flex flex-col flex-1">
        <label className="text-sm font-semibold text-gray-600 mb-1">Return</label>
        <input
          type="date"
          value={returnDate}
          onChange={on(setReturnDate)}
          className="text-sm outline-none w-full p-2 border border-[#1e3a8a] rounded-md"
        />
      </div>
    </>
  );
};

export default RoundTripFields;
