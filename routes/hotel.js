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
    check.isAdmin,
    body('name')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value })
        if (hotel) {
            throw new Error('Hotel name must be uniqe!')
        }
        return true;
    }),
    hotelContoller.addHotel);

router.post('/edit-hotel', check.isAdmin, hotelContoller.editHotel);

router.post('/delete-hotel',
    check.isAdmin,
    body('hotelId')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findById(value);
        if (!hotel) {
            throw new Error('Hotel does not exist!')
        }
        return true;
    }),
    hotelContoller.deleteHotel);

router.post('/uploadhotelimage',
    check.isAdmin,
    upload.single('hotelImage'),
    body('hotelName')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value });
        if (!hotel) {
            throw new Error('Hotel does not exist!');
        }
        return true;
    }),
    hotelContoller.uploadHotelImage);

router.post('/uploadroomimage', check.isAdmin,
    upload.single('hotelImage'),
    body('hotelName')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value });
        if (!hotel) {
            throw new Error('Hotel does not exist!');
        }
        const rooms = hotel.rooms.filter(room => room.roomNumber == req.body.roomNumber);
        room = rooms[0];
        if (!room) {
            throw new Error('There is no room number is this hotel!');
        }
        return true;
    }),
    hotelContoller.uploadRoomImage)

router.post('/deletehotelimages',
    check.isAdmin,
    body('hotelName')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value });
        if (!hotel) {
            throw new Error('Hotel does not exist!');
        }
        return true;
    }),
    hotelContoller.deleteHotelImages);

router.post('/deleteroomimages',
    check.isAdmin,
    body('hotelName')
    .custom(async(value, { req }) => {
        const hotel = await Hotel.findOne({ name: value });
        if (!hotel) {
            throw new Error('Hotel does not exist!');
        }
        const rooms = hotel.rooms.filter(room => room.roomNumber == req.body.roomNumber);
        room = rooms[0];
        if (!room) {
            throw new Error('There is no room number is this hotel!');
        }
        return true;
    }),
    hotelContoller.deleteRoomImages);

module.exports = router;