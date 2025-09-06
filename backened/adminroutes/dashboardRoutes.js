const express = require("express");
const { getDashboardStats } = require("../admincontrollers/dashboardController");
const router = express.Router();

router.get("/stats", getDashboardStats);

module.exports = router;
