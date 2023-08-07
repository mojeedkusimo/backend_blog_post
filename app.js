const express = require('express');
const app = express();
const generalRoutes = require('./controllers/');
const userRoutes = require('./controllers/users');
const blogRoutes = require('./controllers/blogs');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

logger.info('Trying to connect to MongoDB, please wait...');

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch((e) => logger.error('Error connecting to MongoDB:', e.message));

app.use(cors());
app.use(express.json());
app.use(generalRoutes);
app.use(middleware.isLoggedIn);
app.use('/api/users', userRoutes);
app.use('/api/posts', blogRoutes);

app.use(middleware.unknownRoute);
app.use(middleware.errorHandler);
module.exports = app;