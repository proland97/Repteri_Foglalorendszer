const Hotel = require('../models/hotel');

exports.rate = async(req, res) => {

    let hotel;
    let result;
    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName });

        const newRating = { user: req.session.passport.user.username, stars: req.body.stars }
        hotel.ratings.push(newRating);

        result = await hotel.save();


    } catch (err) {
        res.send(err);
    }

    res.send({ msg: 'Rating successfull!' });
}