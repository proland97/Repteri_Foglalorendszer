const express = require('express');
const hotelContoller = require('../controllers/hotelContoller');
const check = require('../middleware/is-auth');
const upload = require('../middleware/upload');
const { body } = require('express-validator');
const Hotel = require('../models/hotel');
const router = express.Router();

router.get('/hotels', check.isAuth, hotelContoller.getHotels);

router.get('/hotel/:hotelId', check.isAuth, hotelContoller.getHotel);

router.get('/hotelbyname/:hotelName', check.isAuth, hotelContoller.getHotelbyName);

router.post('/add-hotel',
    body('name')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value })
        if (hotel) {
            throw new Error('Hotel name must be uniqe!')
        }
        return true;
    }),
    check.isAdmin, hotelContoller.addHotel);

router.post('/edit-hotel', check.isAdmin, hotelContoller.editHotel);

router.post('/delete-hotel',
    body('hotelId')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findById(value);
        if (!hotel) {
            throw new Error('Hotel does not exist!')
        }
        return true;
    }),
    check.isAdmin, hotelContoller.deleteHotel);

router.post('/upload', check.isAdmin, upload.single('hotelImage'), hotelContoller.uploadFile);

module.exports = router;