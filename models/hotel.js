const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const hotelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    owner: {
        type: String
    },
    ratings: [{
        user: String,
        stars: Number
    }],
    freeRooms: {
        type: Number,
        required: true
    },
    rooms: [{
        roomNumber: Number,
        numberOfBeds: Number,
        isFree: Boolean
    }],
    imagePath: {
        type: String
    }

});

module.exports = mongoose.model('Hotel', hotelSchema);