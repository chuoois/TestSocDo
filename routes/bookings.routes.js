const express = require('express');
const { createBooking } = require('../controller/bookings.controller');

const router = express.Router();

router.post('/', createBooking);

module.exports = router;