const userRoute = require('express').Router();
const UserModel = require('../models/users');
const logger = require('../utils/logger');

userRoute.delete('/user/:id', async (req, res, next) => {

    try {
        await UserModel.findByIdAndDelete({_id:req.params.id});
        return res.status(204).end();

    } catch(e) {
        next(e);
    }
});


userRoute.get('/users', async (req, res, next) => {

    try {
        const usersData = await UserModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

userRoute.get('/user/:id', async (req, res, next) => {

    try {
        const usersData = await UserModel.findById({_id:req.params.id});
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

userRoute.post('/user', async (req, res, next) => {

    try {
        const newUser = new UserModel(req.body);
        const savedData = await newUser.save();
        return res.status(200).json(savedData);

    } catch(e) {
        next(e);
    }
});

userRoute.put('/user/:id', async (req, res, next) => {

    try {
        const usersData = await UserModel.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true});
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

module.exports = userRoute;