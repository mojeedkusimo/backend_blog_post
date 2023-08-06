const blogRoute = require('express').Router();
const BlogModel = require('../models/blogs');


blogRoute.delete('/post/:id', async (req, res, next) => {

    try {
        await BlogModel.findByIdAndDelete(req.params.id);
        return res.status(204).end();

    } catch(e) {
        next(e);
    }
});

blogRoute.get('/posts', async (req, res, next) => {

    try {
        const allBlogs = await BlogModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json(allBlogs);

    } catch(e) {
        next(e);
    }
});

blogRoute.get('/post/:id', async (req, res, next) => {

    try {
        const singlBlogPost = await BlogModel.findById(req.params.id);
        return res.status(200).json(singlBlogPost);

    } catch(e) {
        next(e);
    }
});

blogRoute.post('/post', async (req, res, next) => {

    try {
        const newBlog = new BlogModel(req.body);
        const savedBlog = await newBlog.save();
        return res.status(200).json(savedBlog);

    } catch(e) {
        next(e);
    }
});

blogRoute.put('/post/:id', async (req, res, next) => {

    try {
        const singlBlogPost = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        return res.status(200).json(singlBlogPost);

    } catch(e) {
        next(e);
    }
});

module.exports = blogRoute;