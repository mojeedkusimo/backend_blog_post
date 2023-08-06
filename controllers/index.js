const generalRoutes = require('express').Router();


generalRoutes.get('/', (req, res) => {
    res.send({
        'DELETE/api/user/:id': 'deleteUser',
        'DELETE/api/post/:id': 'deleteBlogPost',
        'GET/api/users': 'getAllUsers',
        'GET/api/user/:id': 'getSingleUser',
        'GET/api/posts': 'getAllBlogPosts',
        'GET/api/post/:id': 'getSingleBlogPost',
        'POST/api/user': 'createUser',
        'POST/api/post': 'createBlogPost',
        'PUT/api/user/:id': 'updateUser',
        'PUT/api/post/:id': 'updateBogPost'
    });
});

module.exports = generalRoutes;