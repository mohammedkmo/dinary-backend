const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const pricesRoute = require('./routes/priceRoute');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
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


app.listen(port);
