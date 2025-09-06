const express = require("express");
const router = express.Router();
const {
   getSalesStats
} = require("../admincontrollers/ticketgraphController");




router.get("/sales-stats", getSalesStats);



module.exports = router;
