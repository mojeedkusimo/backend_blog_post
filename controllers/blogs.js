const blogRoute = require('express').Router();
const BlogModel = require('../models/blogs');
const UserModel = require('../models/users');
const middleware = require('../utils/middleware');


blogRoute.delete('/:id', middleware.isAuthorized, async (req, res, next) => {

    try {
        await BlogModel.findByIdAndDelete(req.params.id);
        return res.status(204).end();

    } catch(e) {
        next(e);
    }
});

blogRoute.get('/', async (req, res, next) => {

    try {
        const allBlogs = await BlogModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json(allBlogs);

    } catch(e) {
        next(e);
    }
});

blogRoute.get('/recent', async (req, res, next) => {

    try {
        const recentBlogs = await BlogModel.find({}).sort({ createdAt: -1 }).limit(10);
        return res.status(200).json(recentBlogs);

    } catch(e) {
        next(e);
    }
});

blogRoute.get('/:id', async (req, res, next) => {

    try {
        const singlBlogPost = await BlogModel.findById(req.params.id);
        if (singlBlogPost) {

            return res.status(200).json(singlBlogPost);
        }
        return res.status(400).send({ error: 'Invalid Post ID' });

    } catch(e) {
        next(e);
    }
});

blogRoute.post('/', async (req, res, next) => {

    try {
        const newBlog = new BlogModel(req.body);
        const savedBlog = await newBlog.save();
        await UserModel.findByIdAndUpdate(req.body.author, { $push: { blogPosts: savedBlog._id } });
        return res.status(201).json(savedBlog);

    } catch(e) {
        next(e);
    }
});

blogRoute.put('/:id', middleware.isAuthorized, async (req, res, next) => {

    try {
        const singlBlogPost = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        return res.status(200).json(singlBlogPost);

    } catch(e) {
        next(e);
    }
});

module.exports = blogRoute;