const generalRoutes = require('express').Router();


generalRoutes.get('/', (req, res) => {
    res.send({
        'DELETE/api/user/:id': 'deleteUser',
        'GET/api/users': 'getAllUsers',
        'GET/api/user/:id': 'getSingleUser',
        'GET/api/blogs': 'getAllBlogs',
        'POST/api/user': 'createUser',
        'PUT/api/user/:id': 'updateUser'
    });
});

module.exports = generalRoutes;