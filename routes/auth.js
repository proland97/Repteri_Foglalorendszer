const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const User = require('../models/user');
const router = express.Router();


//Registration route with input validation
router.post('/registration',
    body('username')
    .notEmpty()
    .withMessage('Username is required!'),
    body('email')
    .notEmpty()
    .withMessage('Email is required!'),
    body('password')
    .notEmpty()
    .withMessage('Password is required!'),
    body('username')
    .custom(async(value, { req }) => {
        const user = await User.findOne({ username: value });
        if (user) {
            throw new Error('The username already exists. Please use a different username')
        }
        return true;
    }),
    body('email')
    .isEmail()
    .withMessage('Email is invalid!'),
    body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters!'),
    body('confirmedpassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!')
        }
        return true;
    }),
    authController.registration
);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;