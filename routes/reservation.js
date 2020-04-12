const express = require('express');
const reservationContoller = require('../controllers/reservationContoller');
const check = require('../middleware/is-auth');
const router = express.Router();

router.post('/reservation', check.isAuth, reservationContoller.reservation);

module.exports = router;