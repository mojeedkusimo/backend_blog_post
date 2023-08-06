const userRoute = require('express').Router();


userRoute.get('/users/all', async (req, res, next) => {

    try {
        return res.status(200).json({});

    } catch(e) {
        next(e);
    }
});

module.exports = userRoute;