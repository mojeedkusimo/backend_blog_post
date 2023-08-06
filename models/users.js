const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('user', userSchema);