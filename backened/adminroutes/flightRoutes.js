// routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { getFlightById,getFlights,createFlight,updateFlight,deleteFlight,searchFlights} = require('../admincontrollers/flightController');
router.get('/search', searchFlights);    
router.get('/', getFlights);             
router.get('/:id', getFlightById); // This uses the new getFlightById method
router.post('/createFlight', upload.single('logo'), createFlight); 
router.put('/:id', upload.single('logo'), updateFlight);           
router.delete('/:id', deleteFlight);                               
module.exports = router;
