const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const userRoute = require('./routes/userRoute');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use('/user', userRoute);

app.listen(port);
