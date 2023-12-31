const generalRoutes = require('express').Router();
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const config = require('../utils/config');
const jwt = require('jsonwebtoken');


generalRoutes.get('/api', (req, res) => {
    res.send({
        'DELETE/api/users/:id': 'deleteUser',
        'DELETE/api/posts/:id': 'deleteBlogPost',
        'GET/api/users': 'getAllUsers',
        'GET/api/users/:id': 'getSingleUser',
        'GET/api/posts': 'getAllBlogPosts',
        'GET/api/posts/:id': 'getSingleBlogPost',
        'POST/api/register': 'createUser',
        'POST/api/posts': 'createBlogPost',
        'POST/api/login': 'loginUsers',
        'PUT/api/users/:id': 'updateUser',
        'PUT/api/posts/:id': 'updateBogPost'
    });
});

generalRoutes.post('/api/login', async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {

            const isPassword = await bcrypt.compare(password, user.password);
            if (isPassword) {

                const token = jwt.sign({ id: user._id }, config.SECRETE, { expiresIn: 30*60 } );
                return res.status(200).json({ token });
            }
            return res.status(401).send({ error: 'Incorrect password!' });
        }
        return res.status(400).send({ error: 'User does not exist' });

    } catch(e) {
        next(e);
    }
});

generalRoutes.post('/api/register', async (req, res, next) => {

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

module.exports = generalRoutes;