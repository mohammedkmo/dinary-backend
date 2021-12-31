const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
const serverless = require('serverless-http');
const authUser = require('./middlewares/auth')
const router = express.Router();



app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', (req, res) => {
  res.json({
    msg: 'this is dinary API',
  });
});

router.get('/prices',require('./controllers/pricesController').get)
router.post('/prices/new',authUser,require('./controllers/pricesController').post)
router.get('/prices/last',require('./controllers/pricesController').getLast)



app.use('/.netlify/functions/server', router);  // path must route to lambda


module.exports.handler = serverless(app);