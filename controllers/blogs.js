const blogRoute = require('express').Router();
const BlogModel = require('../models/blogs');


blogRoute.get('/blogs', async (req, res, next) => {

    try {
        const allBlogs = await BlogModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json(allBlogs);

    } catch(e) {
        next(e);
    }
});

module.exports = blogRoute;