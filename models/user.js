const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    reservations: [{
        hotelName: String,
        roomNumber: Number
    }]

});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
        } catch (err) {
            return next(err);
        }
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password, next) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        return next(error, isMatch);
    })
}


module.exports = mongoose.model('User', userSchema);