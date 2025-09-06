const express = require("express");
const router = express.Router();
const {
  getAllBookings,
} = require("../admincontrollers/allbookingController");



router.get("/all", getAllBookings);



module.exports = router;
