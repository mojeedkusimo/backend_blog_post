const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
},
{ timestamps: true }
);

blogSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});


module.exports = mongoose.model('blog', blogSchema);