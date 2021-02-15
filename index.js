const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const pricesRoute = require('./routes/priceRoute');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'this is dinary API',
  });
});
app.use('/prices', pricesRoute);
app.use('/user', userRoute);

app.listen(port);
