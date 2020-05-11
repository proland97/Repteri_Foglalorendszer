const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const cors = require('cors');
require('./config/passport');

const errorController = require('./controllers/errorController');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotel');
const ratingRoutes = require('./routes/rating');
const reservationRoutes = require('./routes/reservation');


dotenv.config();
const app = express();
const sessionStore = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@repterifoglalorendszerdb-9vj3r.mongodb.net/ForlalorendszerDB`,
    collection: 'sessions',
    expires: new Date(Date.now() + 3600000),
    cookie: { expires: new Date(Date.now() + 3600000) }
})

app.use(cors()); //allow access from anywhere
/*
let whitelist = ['http://example1.com', 'http://example2.com']
let corsOptions = {
        origin: function(origin, callback) {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
app.use(cors(corsOptions));
app.options('*', cors()) // include before other routes
*/
/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", '*');
    //console.log('mindig');
    next();
});
*/
app.use('/images', express.static('images'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'daskfjbjher87239iofsdnkjbf32ru89usdfjadfgsosandfh2kjajsdflsfgfh6y56r',
    resave: false,
    saveUninitialized: false,
    expires: new Date(Date.now() + 3600000),
    store: sessionStore,
    cookie: { expires: new Date(Date.now() + 3600000) }
}));
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/hotel', hotelRoutes);
app.use('/ratings', ratingRoutes);
app.use('/reservations', reservationRoutes);
app.use('/', authRoutes);
app.use(errorController.get404);
//ROUTES

mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@repterifoglalorendszerdb-9vj3r.mongodb.net/ForlalorendszerDB?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useCreateIndex: true
        })
    .then(result => {
        console.log('MongoDB connected')
        app.listen(process.env.APP_PORT);
        console.log(`Server started on port: ${process.env.APP_PORT}`)
    })
    .catch(err => {
        console.log(err);
        console.log('sikertelen');

    });