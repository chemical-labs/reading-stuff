const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const file = require('express-fileupload')

require('dotenv').config();

const routeAuth = require('./routes/auth')
const routeBook = require('./routes/books')

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(file())
app.use(express.static('public'))
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }))

app.use('/auth', routeAuth)
app.use('/book', routeBook)

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
