const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
const serverless = require('serverless-http');


const userRoute = require('./src/routes/userRoute');
const pricesRoute = require('./src/routes/priceRoute');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.json({
    msg: 'this is dinary API',
  });
});
app.use('/prices', pricesRoute);
app.use('/user', userRoute);


module.exports = app;
module.exports.handler = serverless(app);