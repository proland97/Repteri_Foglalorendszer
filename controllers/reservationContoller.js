const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Hotel = require('../models/hotel');
const User = require('../models/user');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));
dotenv.config();

exports.reservation = async(req, res) => {

    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let hotel;
    let result;
    let user;

    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName })
    } catch (err) {
        return res.status(400).send(err)
    }

    hotel.freeRooms--;
    hotel.rooms.forEach(room => {
        if (room.roomNumber == req.body.roomNumber) {
            room.isFree = false;
        }
    });

    try {
        result = await hotel.save()
    } catch (err) {
        return res.status(400).send(err);
    }

    try {
        user = await User.findById(req.session.passport.user._id);
        const newReservation = { hotelName: req.body.hotelName, roomNumber: req.body.roomNumber }
        user.reservations.push(newReservation);
        result = await user.save();
    } catch (err) {
        return res.status(400).send(err);
    }

    res.status(200).send({ sucess: true, msg: 'Reservation successful!' });
    sendEmail(req.session.passport.user.email, req.body.hotelName, req.body.roomNumber);
}

exports.myReservation = async(req, res) => {

    let user;
    try {
        user = await User.findById(req.session.passport.user._id);
    } catch (err) {
        return res.status(400).send(err);
    }
    res.status(200).send(user.reservations);
}


sendEmail = async(email, hotelName, roomNumber) => {
    try {
        let result = await transporter.sendMail({
            to: email,
            from: `${process.env.EMAIL_ADRESS}`,
            subject: 'Reservation successful!',
            html: `<h4>Your reservation was successful!</h4>
                    <p>You have successfully reserved room in <b>${hotelName}</b>!</p>
                    <p>Room number is: <b>${roomNumber}</b>`
        });

    } catch (err) {
        console.log(err);
    }
}