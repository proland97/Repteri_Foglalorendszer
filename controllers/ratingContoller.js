const Hotel = require('../models/hotel');
const { validationResult } = require('express-validator');


exports.rate = async(req, res) => {

    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ errorMessages: errorMassageArray });
    }

    let hotel;
    let result;
    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName });

        const newRating = { user: req.session.passport.user.username, stars: req.body.stars }
        hotel.ratings.push(newRating);

        result = await hotel.save();


    } catch (err) {
        return res.status(400).send(err)
    }

    res.send({ msg: 'Rating successfull!' });
}