const userRoute = require('express').Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

userRoute.delete('/:id', async (req, res, next) => {

    try {
        await UserModel.findByIdAndDelete(req.params.id);
        return res.status(204).end();

    } catch(e) {
        next(e);
    }
});


userRoute.get('/', async (req, res, next) => {

    try {
        const usersData = await UserModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

userRoute.get('/:id', async (req, res, next) => {

    try {
        const singleUser = await UserModel.findById(req.params.id);
        return res.status(200).json(singleUser);

    } catch(e) {
        next(e);
    }
});

userRoute.post('/', async (req, res, next) => {

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new UserModel({ ...req.body, password: hashedPassword });
        const savedData = await newUser.save();
        return res.status(201).json(savedData);

    } catch(e) {
        next(e);
    }
});

userRoute.post('/login', async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {

            const isPassword = await bcrypt.compare(password, user.password);
            if (isPassword) {

                const token = jwt.sign({ id: user._id }, config.SECRETE );
                return res.status(200).json({ token });
            }
            return res.status(401).send({ error: 'Incorrect password!' });
        }
        return res.status(400).send({ error: 'User does not exist' });

    } catch(e) {
        next(e);
    }
});

userRoute.put('/:id', async (req, res, next) => {

    try {
        const usersData = await UserModel.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true });
        return res.status(200).json(usersData);

    } catch(e) {
        next(e);
    }
});

module.exports = userRoute;