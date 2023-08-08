const userRoute = require('express').Router();
const UserModel = require('../models/users');
const middleware = require('../utils/middleware');

userRoute.delete('/:id', middleware.isAdmin, async (req, res, next) => {

    try {

        await UserModel.findByIdAndDelete(req.params.id);
        return res.status(204).end();

    } catch(e) {
        next(e);
    }
});


userRoute.get('/',  middleware.isAdmin, async (req, res, next) => {

    try {
        const usersData = await UserModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

userRoute.get('/:id',middleware.isAuthorized, async (req, res, next) => {
    console.log('I am here 2...');
    try {
        const singleUser = await UserModel.findById(req.params.id);
        if (singleUser) {

            return res.status(200).json(singleUser);
        }
        return res.status(400).send({ error: 'Invalid User ID' });

    } catch(e) {
        next(e);
    }
});


userRoute.put('/:id', middleware.isAuthorized, async (req, res, next) => {

    try {
        const usersData = await UserModel.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true });
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

module.exports = userRoute;