const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
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

userSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model('user', userSchema);