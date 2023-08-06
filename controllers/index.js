const generalRoutes = require('express').Router();


generalRoutes.get('/', (req, res) => {
    res.send({
        '/api/users/all': 'getAllUsers'
    });
});

module.exports = generalRoutes;