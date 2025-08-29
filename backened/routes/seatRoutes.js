const express = require('express');
const { listByFlight, reserve, getOne, release } = require('../controllers/seatController');
const router = express.Router();
router.get('/:flightId', listByFlight);
router.get('/:flightId/:seatId', getOne);
router.post('/reserve', reserve);
router.post('/release', release);
module.exports = router;
