// backened/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const seatRoutes = require('./routes/seatRoutes');

// INSERT #1: require payment controller (for webhook)
const paymentController = require('./controllers/paymentController');

dotenv.config();
const app = express();

// (optional) COOP/COEP
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// INSERT #2: Stripe webhook BEFORE json parser (raw body)
app.post(
  '/api/pay/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.checkoutWebhook
);

// parsers AFTER webhook
app.use(express.json());
app.use(cookieParser());

// static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB
connectDB();

// routes
app.use('/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/passengers', passengerRoutes);
app.use('/api/seats', seatRoutes);

// INSERT #3: payment API
app.use('/api/pay', require('./routes/paymentRoutes'));

// error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
