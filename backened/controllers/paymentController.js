
const Stripe = require("stripe");
const Booking = require("../models/Payment");
const user = require("../models/User");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
exports.createCheckoutSession = async (req, res) => {
  try {
    const { passenger, flights, totalPaid, user } = req.body;
    if (!passenger || !passenger.email) {
      return res
        .status(400)
        .json({ error: "Passenger with a valid email is required." });
    }
    if (!Array.isArray(flights) || flights.length === 0) {
      return res.status(400).json({ error: "At least one flight is required." });
    }
    if (!Number.isFinite(totalPaid) || totalPaid <= 0) {
      return res
        .status(400)
        .json({ error: "totalPaid must be a positive number." });
    }

    const FRONTEND_URL = process.env.FRONTEND_URL;

   
    const baseLineItems = flights.map((flight, idx) => {
      const priceNum = Number(flight.price);
      if (!Number.isFinite(priceNum) || priceNum <= 0) {
        throw new Error(`flights[${idx}].price must be a positive number`);
      }

      const descriptionParts = [
        flight.departureTime ? `Depart: ${flight.departureTime}` : null,
        flight.arrivalTime ? `Arrive: ${flight.arrivalTime}` : null,
        flight.meal ? `Meal: ${flight.meal}` : null,
        flight.baggage ? `Baggage: ${flight.baggage}` : null,
        flight.flighttype ? `flightType: ${flight.flighttype}` : null
      ].filter(Boolean);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${flight.airline || "Airline"} - ${flight.flightCode || "Flight"}`,
            description: descriptionParts.join(" | "),
          },
          unit_amount: Math.round(priceNum * 100),
        },
        quantity: 1,
      };
    });



    const subtotal = flights.reduce((s, f) => s + (Number(f.price) || 0), 0);
    const upgradeFee = passenger.classType === "business" ? 150 : 0;
    const tax = Math.round(subtotal * 0.24); 

    const extraLineItems = [];
    if (tax > 0) {
      extraLineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Tax (24%)" },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }
    if (upgradeFee > 0) {
      extraLineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Business Class Upgrade" },
          unit_amount: Math.round(upgradeFee * 100),
        },
        quantity: 1,
      });
    }

    const line_items = [...baseLineItems, ...extraLineItems];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: passenger.email,
      line_items,
      success_url: `${FRONTEND_URL}/bookingdetail?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cancel`,

      metadata: {
        user: user || "",
        passenger: JSON.stringify(passenger),
        flights: JSON.stringify(flights),
        totalPaid: String(totalPaid),
        subtotal: String(subtotal),
        tax: String(tax),
        upgradeFee: String(upgradeFee),
        seatId: passenger.seatId || "",
        classType: passenger.classType || "",
        passengerName: `${passenger.firstName || ""} ${passenger.lastName || ""}`.trim(),
        passengerEmail: passenger.email || "",
      },
    });

    return res.status(200).json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe session create error:", err);
    const message =
      err?.raw?.message || err?.message || "Stripe session creation failed";
    return res.status(400).json({ error: message });
  }
};


exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      const passenger = JSON.parse(session.metadata.passenger || "{}");
      const flights = JSON.parse(session.metadata.flights || "[]");
      const user = session.metadata.user || null;

      // prefer client-provided totalPaid; fall back to recomputing from metadata
      let totalPaid = parseFloat(session.metadata.totalPaid || "0");
      if (!Number.isFinite(totalPaid) || totalPaid <= 0) {
        const subtotal = parseFloat(session.metadata.subtotal || "0") || 0;
        const tax = parseFloat(session.metadata.tax || "0") || 0;
        const upgradeFee = parseFloat(session.metadata.upgradeFee || "0") || 0;
        totalPaid = subtotal + tax + upgradeFee;
      }

      await Booking.create({
        passenger,
        flights,
        user,
        totalPaid,
        stripeSessionId: session.id,
        status: "Confirmed",
      });

      console.log("✅ Booking saved to DB. Session:", session.id);
    } catch (error) {
      console.error("❌ Failed to save booking:", error);
    }
  }

  return res.status(200).json({ received: true });
};


exports.getBookingBySessionId = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "session_id is required" });
    }
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== "paid") {
      return res
        .status(400)
        .json({ error: "Invalid or unpaid Stripe session" });
    }
    const booking = await Booking.findOne({ stripeSessionId: session_id });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    
    res.json({ booking });
  } catch (err) {
    console.error("Error fetching booking:", err);
    res.status(500).json({ error: "Failed to fetch booking session" });
  }
};

