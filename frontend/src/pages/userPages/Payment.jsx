// frontend/src/pages/userPages/Payment.jsx
import { useSelector } from "react-redux";
import PaymentForm from "../../components/paymentInfo/PaymentForm";

export default function Payment() {
  const passengerData = useSelector((s) => s.passengers?.data);
  const flightId = passengerData?.flightId;

  async function startCheckout() {
    if (!flightId) {
      alert("Missing flight selection. Please select a flight again.");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pay/checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // send JWT cookie
          body: JSON.stringify({ flightId, quantity: 1 }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.message || "Unable to start payment");
        return;
      }
      window.location.href = data.url; // Stripe Checkout
    } catch (e) {
      console.error(e);
      alert("Network error. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <PaymentForm onSubmit={startCheckout} />
    </div>
  );
}
