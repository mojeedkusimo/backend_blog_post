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

    if (error.name === 'ValidationError') {
        return  res.status(400).send({ error: error.message });
    } else if (error.name ===  'JsonWebTokenError') {
        return res.status(401).json({ error: error.message });
    }else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'token expired'
        });
    }

    return res.status(500).send({ error: error.message });

};


module.exports = {
    unknownRoute,
    errorHandler,
    isLoggedIn
};