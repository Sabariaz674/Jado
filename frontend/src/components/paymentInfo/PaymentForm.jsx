// frontend/src/components/paymentInfo/PaymentForm.jsx
import { useState } from "react";

export default function PaymentForm({ onSubmit }) {
  const [method, setMethod] = useState("card"); // "card" | "paypal"
  const [f, setF] = useState({ nameOnCard: "", cardNumber: "", exp: "", cvv: "" });

  const change = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); onSubmit?.({ method, ...f }); };

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-3xl rounded-2xl border bg-white p-5 sm:p-6 md:p-8 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">Payment method</h2>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setMethod("card")}
          className={`flex items-center justify-between rounded-xl border p-4 ${method === "card" ? "border-indigo-600 ring-2 ring-indigo-600/30" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="flex items-center gap-2">
            <span className={`h-4 w-4 rounded-full border ${method === "card" ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`} />
            <span className="font-medium">Card</span>
          </div>
          <span className="rounded-md border px-2 py-1 text-[10px] font-semibold tracking-wide">VISA</span>
        </button>

        <button type="button" onClick={() => setMethod("paypal")}
          className={`flex items-center justify-between rounded-xl border p-4 ${method === "paypal" ? "border-indigo-600 ring-2 ring-indigo-600/30" : "border-gray-200 hover:border-gray-300"}`}>
          <div className="flex items-center gap-2">
            <span className={`h-4 w-4 rounded-full border ${method === "paypal" ? "bg-indigo-600 border-indigo-600" : "border-gray-300"}`} />
            <span className="font-medium">PayPal</span>
          </div>
          <span className="rounded-md border px-2 py-1 text-[10px] font-semibold tracking-wide">PAYPAL</span>
        </button>
      </div>

      {method === "card" && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Name on card" name="nameOnCard" placeholder="Enter name on card" value={f.nameOnCard} onChange={change} required />
          <Field label="Card number" name="cardNumber" placeholder="1234 5678 9012 3456" value={f.cardNumber} onChange={change} inputMode="numeric" required />
          <Field label="Expiration date" name="exp" placeholder="MM/YY" value={f.exp} onChange={change} inputMode="numeric" required />
          <Field label="CVV" name="cvv" placeholder="123" value={f.cvv} onChange={change} inputMode="numeric" required />
        </div>
      )}

      <button type="submit" className="mt-6 w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/30">
        Submit
      </button>
    </form>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input {...props} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20" />
    </div>
  );
}
