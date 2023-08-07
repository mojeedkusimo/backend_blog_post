const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');
const config = require('./config');

const isLoggedIn = (req, res, next) => {

    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer ')) {
        const rawToken = authorization.replace('Bearer ', '');
        const decodedToken = jwt.verify(rawToken, config.SECRETE);

        if (!decodedToken.id) {
            return res.status(401).send({ error: 'Invalid token!' });
        }
        req.token = decodedToken;
        return next();
    }

    return res.status(401).send({ error: 'You are not logged in!' });
};

const unknownRoute = (req, res) => {
    return res.status(404).send({ error: 'Page not found' });
};

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    switch (error.name) {
    case 'ValidationError':
        return res.status(400).send({ error: error.message });
    case 'JsonWebTokenError':
        return res.status(401).send({ error: error.message });
    case 'TokenExpiredError':
        return res.status(401).send({ error: 'token expired' });
    default:
        return res.status(500).send({ error: error.message });
    }

};


module.exports = {
    unknownRoute,
    errorHandler,
    isLoggedIn
};