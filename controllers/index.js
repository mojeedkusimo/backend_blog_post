const generalRoutes = require('express').Router();


generalRoutes.get('/', (req, res) => {
    res.send({
        'DELETE/api/users/:id': 'deleteUser',
        'DELETE/api/posts/:id': 'deleteBlogPost',
        'GET/api/users': 'getAllUsers',
        'GET/api/users/:id': 'getSingleUser',
        'GET/api/posts': 'getAllBlogPosts',
        'GET/api/posts/:id': 'getSingleBlogPost',
        'POST/api/users': 'createUser',
        'POST/api/posts': 'createBlogPost',
        'PUT/api/users/:id': 'updateUser',
        'PUT/api/posts/:id': 'updateBogPost'
    });
});

module.exports = generalRoutes;