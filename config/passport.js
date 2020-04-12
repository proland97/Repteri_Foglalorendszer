const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('local', new localStrategy((username, password, done) => {
    User.findOne({ username: username }, function(err, user) {
        if (err) return done('There was an error while retrieving the user');
        if (user) {
            user.comparePasswords(password, function(error, isMatch) {
                if (error || !isMatch) return done({ msg: 'Wrong password' });
                return done(null, user);
            })
        } else {
            return done({ msg: 'There is no registered user with that username' });
        }
    })
}));

passport.serializeUser((user, done) => {
    if (!user) return done("Error - we have no user", undefined);
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    if (!user) return done("Error - no user object to deserialize", undefined);
    return done(null, user);
});