const express = require('express');
const ratingContoller = require('../controllers/ratingContoller');
const check = require('../middleware/is-auth');
const { body } = require('express-validator');
const Hotel = require('../models/hotel');
const router = express.Router();

router.post('/rate',
    check.isAuth,
    body('hotelName').custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value });
        if (!hotel) {
            throw new Error('There is no hotel with this name!');
        }
        return true;
    }),
    ratingContoller.rate);

module.exports = router;