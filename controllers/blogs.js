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
        const allBlogs = await BlogModel.find({}).sort({ updatedAt: -1 });
        return res.status(200).json(allBlogs);

    } catch(e) {
        next(e);
    }
});

blogRoute.get('/recent', async (req, res, next) => {

    try {
        const recentBlogs = await BlogModel.find({}).sort({ updatedAt: -1 }).limit(10);
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

        if (!req.user) {

             //anonymous post
            await UserModel.findByIdAndUpdate('64dee485510b4b1250650319', { $push: { blogPosts: savedBlog._id } });
            await BlogModel.findByIdAndUpdate(savedBlog._id,  {author: '64dee485510b4b1250650319' }, { new: true, runValidators: true }); 
        } else {
            
            // post by logged in user
            await UserModel.findByIdAndUpdate(req.user.id, { $push: { blogPosts: savedBlog._id } }); 
            await BlogModel.findByIdAndUpdate(savedBlog._id,  {author: req.user.id }, { new: true, runValidators: true }); 
        }

        return res.status(201).json(savedBlog);

    } catch(e) {
        next(e);
    }
});

blogRoute.put('/:id', async (req, res, next) => {

    try {
        const getBlogPost = await BlogModel.findById(req.params.id);

        if (getBlogPost.author.toString() === '64dee485510b4b1250650319') {
            const updateBlogPost = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

            return res.status(200).json(updateBlogPost);
        }

        return res.status(401).send({ error: 'You can only modify a post that is either yours or anonymous!' });

    } catch(e) {
        next(e);
    }
});

module.exports = blogRoute;