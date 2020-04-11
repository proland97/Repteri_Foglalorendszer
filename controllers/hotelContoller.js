const Hotel = require('../models/hotel');

exports.getHotels = async(req, res) => {

    let result;
    try {
        result = await Hotel.find();
    } catch (err) {
        res.send(err);
    }
    res.send(result);
}

exports.getHotel = async(req, res) => {
    let result;
    try {
        result = Hotel.findById(req.params.hotelId);
    } catch (err) {
        res.send(err);
    }
    res.send(result);
}

exports.addHotel = async(req, res) => {

    const hotel = new Hotel({
        name: req.body.name,
        owner: req.body.owner,
        ratings: [],
        freeRooms: req.body.freeRooms,
        rooms: req.body.rooms
    });

    let result;

    try {
        result = await hotel.save();
    } catch (err) {
        res.send(err);
    }
    res.send({ msg: 'Hotel created successfully!' })
}

exports.editHotel = async(req, res) => {

    let hotel;
    let result;

    try {
        hotel = await Hotel.findById(req.body.hotelId);

        hotel.name = req.body.name;
        hotel.owner = req.body.owner;
        hotel.ratings = req.body.raitings;
        hotel.freeRooms = req.body.freeRooms;
        hotel.rooms = req.body.rooms;

        result = await hotel.save();

    } catch (err) {
        res.send(err);
    }
    res.send({ msg: 'Hotel updated successfully' });
}

exports.deleteHotel = async(req, res) => {

    let hotel;
    let result;
    try {
        hotel = await Hotel.findById(req.body.hotelId);
        result = await hotel.delete();
    } catch (err) {
        console.log(err);
    }
    res.send({ msg: 'Hotel deleted successfully' });
}




//TODO
//update
//delete
//postman bekonfiguralni