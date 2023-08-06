const express = require('express');
const app = express();
const generalRoutes = require('./controllers/');
const userRoutes = require('./controllers/users');


app.use('/api', userRoutes);
app.use(generalRoutes);
module.exports = app;