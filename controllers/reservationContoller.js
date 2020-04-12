const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Hotel = require('../models/hotel');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));
dotenv.config();

exports.reservation = async(req, res) => {

    let hotel;
    let result;

    try {
        hotel = await Hotel.findOne({ name: req.body.hotelName })
    } catch (err) {
        return res.status(400).send(err)
    }

    if (!hotel) {
        return res.status(400).send({ msg: 'There is no hotel with this name!' })
    }

    if (hotel.freeRooms == 0) {
        return res.status(400).send({ msg: 'No free rooms in this Hotel!' })
    }

    const room = hotel.rooms.filter(room => room.roomNumber == req.body.roomNumber);

    if (room.length === 0) {
        return res.status(400).send({ msg: 'There is no room number is this hotel!' })
    }

    if (!room[0].isFree) {
        return res.status(400).send({ msg: 'This room is not free!' })
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
        return res.send(err);
    }

    res.send({ msg: 'Reservation successful!' });
    sendEmail(req.session.passport.user.email, req.body.hotelName, req.body.roomNumber);
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