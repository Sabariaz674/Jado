
import api from "./api";

export const createStripeCheckoutSession = async (body) => {
  try {
    const res = await api.post("/api/payment/create-checkout-session", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.error("Stripe session error:", err?.response?.data || err);
    throw new Error(
      err?.response?.data?.error || err.message || "Payment initiation failed"
    );
  }
};
