const express = require('express');
const ratingContoller = require('../controllers/ratingContoller');
const check = require('../middleware/is-auth');
const router = express.Router();


router.post('/rate', check.isAuth, ratingContoller.rate);

module.exports = router;