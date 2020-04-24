const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const dotenv = require('dotenv');
const passport = require('passport');
const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));
dotenv.config();


exports.registration = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errorMassageArray = errors.array().map((errorObj) => errorObj.msg);
        return res.status(422).send({ sucess: false, errorMessages: errorMassageArray });
    }

    let role
    if (req.body.role) {
        role = req.body.role;
    } else {
        role = 'user'
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: role,
        reservations: []
    })

    try {
        await user.save();
        res.status(200).send({ sucess: true, msg: 'Registration was successful!' });
        await sendEmail(req.body.email);

    } catch (err) {
        return res.status(400).send(err);
    }
};

exports.login = (req, res) => {

    if (req.isAuthenticated()) {
        return res.status(400).send({ sucess: false, msg: "Already logged in" })
    }

    if (req.body.username && req.body.password) {
        passport.authenticate('local', (error, user) => {
            if (error) {
                return res.status(403).send(error);
            } else {
                req.logIn(user, (error) => {
                    if (error) return res.status(500).send(error);
                    return res.status(200).send({ sucess: true, msg: "Login successful" });
                });
            }
        })(req, res);
    } else {
        res.status(400).send({ sucess: false, msg: "Missing username or password" });
    }
};


exports.logout = (req, res) => {

    if (req.isAuthenticated()) {
        req.logout();
        res.status(200).send({ sucess: true, msg: "Logout successful" });
    } else {
        res.status(403).send({ sucess: false, msg: "Log in, before you log out" })
    }
};


sendEmail = async(email) => {
    try {
        let result = await transporter.sendMail({
            to: email,
            from: `${process.env.EMAIL_ADRESS}`,
            subject: 'Registration successful!',
            html: `<h4>Successfully registered with the email: ${email}</h4>`
        });

    } catch (err) {
        console.log(err);
    }
}