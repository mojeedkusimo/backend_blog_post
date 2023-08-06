const userRoute = require('express').Router();
const UserModel = require('../models/users');


userRoute.get('/users', async (req, res, next) => {

    try {
        const usersData = await UserModel.find({});
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

module.exports = userRoute;