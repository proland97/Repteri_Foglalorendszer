const express = require('express');
const hotelContoller = require('../controllers/hotelContoller');
const check = require('../middleware/is-auth')
const router = express.Router();

router.get('/hotels', check.isAuth, hotelContoller.getHotels);

router.get('/hotel/:hotelId', check.isAuth, hotelContoller.getHotel);

router.get('/hotelbyname/:hotelName', check.isAuth, hotelContoller.getHotelbyName);

router.post('/add-hotel', check.isAdmin, hotelContoller.addHotel);

router.post('/edit-hotel', check.isAdmin, hotelContoller.editHotel);

router.post('/delete-hotel', check.isAdmin, hotelContoller.deleteHotel);

module.exports = router;