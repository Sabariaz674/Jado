// backened/controllers/paymentController.js
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Flight = require('../models/Flight');

const toMinor = (a) => Math.round(Number(a) * 100);

exports.createCheckoutSession = async (req, res) => {
  try {
    const { flightId, quantity = 1 } = req.body;

    if (!req.user?.id) return res.status(401).json({ message: 'Login required' });

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: (process.env.CURRENCY || 'usd').toLowerCase(),
            unit_amount: toMinor(flight.price),
            product_data: {
              name: `${flight.airline} ${flight.flightCode} (${flight.lax} → ${flight.laf})`,
            },
          },
          quantity,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      customer_email: req.user.email,
      metadata: { flightId: String(flight._id), userId: String(req.user.id) },
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error('createCheckoutSession error:', err);
    return res.status(500).json({ message: 'Could not start checkout' });
  }
};

exports.checkoutWebhook = (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = Stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // TODO: yahan DB me booking/payment record create/update karein
    console.log('✅ paid session:', session.id, 'flight:', session.metadata?.flightId);
  }
  return res.json({ received: true });
};
