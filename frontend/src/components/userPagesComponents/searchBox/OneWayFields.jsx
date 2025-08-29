import React from "react";

const OneWayFields = ({ from, setFrom, to, setTo, depart, setDepart }) => {
  const on = (setter) => (e) => setter(e.target.value);

  return (
    <>
      <div className="flex flex-col flex-1">
        <label className="text-sm font-semibold text-gray-600 mb-1">From</label>
        <input
          type="text"
          value={from}
          onChange={on(setFrom)}
          placeholder="LAX"
          className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-[#1e3a8a] rounded-md"
        />
      </div>

      <div className="flex flex-col flex-1">
        <label className="text-sm font-semibold text-gray-600 mb-1">To</label>
        <input
          type="text"
          value={to}
          onChange={on(setTo)}
          placeholder="JFK"
          className="text-sm outline-none placeholder-gray-400 w-full p-2 border border-[#1e3a8a] rounded-md"
        />
      </div>

      <div className="flex flex-col flex-1">
        <label className="text-sm font-semibold text-gray-600 mb-1">Depart</label>
        <input
          type="date"
          value={depart}
          onChange={on(setDepart)}
          className="text-sm outline-none w-full p-2 border border-[#1e3a8a] rounded-md"
        />
      </div>
    </>
  );
};

export default OneWayFields;
