const generalRoutes = require('express').Router();


generalRoutes.get('/', (req, res) => {
    res.send({
        'GET/api/users': 'getAllUsers',
        'GET/api/blogs': 'getAllBlogs'
    });
});

module.exports = generalRoutes;