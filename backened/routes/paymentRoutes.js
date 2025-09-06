const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  handleStripeWebhook,
  getBookingBySessionId,
 
} = require("../controllers/paymentController");


router.post("/create-checkout-session", createCheckoutSession);
router.get("/booking-detail", getBookingBySessionId);
router.post("/webhook", handleStripeWebhook);



module.exports = router;
