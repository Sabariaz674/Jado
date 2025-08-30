// backened/routes/paymentRoutes.js
const router = require('express').Router();
const { createCheckoutSession } = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

// only logged-in users can create checkout session
router.post('/checkout-session', authMiddleware, createCheckoutSession);

module.exports = router;
