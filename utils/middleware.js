const logger = require('../utils/logger');

const unknownRoute = (req, res) => {
    return res.status(404).send({ error: 'Page not found' });
};

const errorHandler = (error, req, res) => {
    logger.error(error.message);

    return res.status(500).send({ error: error.message });
};


module.exports = {
    unknownRoute,
    errorHandler
};