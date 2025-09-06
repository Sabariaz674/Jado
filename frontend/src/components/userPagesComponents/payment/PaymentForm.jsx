import React from "react";

const PaymentForm = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-[#1e3a8a] mb-6 ">Payment method</h2>

      {/* Card method only */}
      <div className="border p-3 rounded-lg flex items-center justify-center gap-2 border-[#1e3a8a] bg-green-50 mb-6">
        <img src="https://w7.pngwing.com/pngs/753/77/png-transparent-credit-card-visa-logo-payment-debit-card-visa-blue-company-text-thumbnail.png" alt="Visa Mastercard" className="h-6" />
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Name on card" className="input" />
        <input type="text" placeholder="Card number" className="input" />
        <input type="text" placeholder="MM/YY" className="input" />
        <input type="text" placeholder="CVV" className="input" />
      </div>

      <label className="flex items-center gap-2 mb-4">
        <input type="checkbox" className="accent-[#1e3a8a]" />
        Use same address as billing info
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Address" className="input" />
        <input type="text" placeholder="Nationality" className="input" />
        <input type="text" placeholder="Zip/Postal code" className="input" />
      </div>

      <button className="w-full bg-[#1e3a8a] text-white font-semibold py-3 rounded-lg hover:bg-[#1e3a8a] transition">
        Submit
      </button>
    </div>
  );
};

export default PaymentForm;
