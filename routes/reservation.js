const express = require('express');
const reservationContoller = require('../controllers/reservationContoller');
const check = require('../middleware/is-auth');
const { body } = require('express-validator');
const Hotel = require('../models/hotel');
const router = express.Router();

router.post('/reservation',
    body('hotelName').custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value });
        if (!hotel) {
            throw new Error('There is no hotel with this name!');
        }
        if (hotel.freeRooms == 0) {
            throw new Error('No free rooms in this Hotel!');
        }
        const rooms = hotel.rooms.filter(room => room.roomNumber == req.body.roomNumber);
        room = rooms[0];
        if (!room) {
            throw new Error('There is no room number is this hotel!');
        }
        if (!room.isFree) {
            throw new Error('This room is not free!');
        }
        return true;
    }), check.isAuth, reservationContoller.reservation);

router.get('/myreservation', check.isAuth, reservationContoller.myReservation);

module.exports = router;

//TODO
//Object destructuring