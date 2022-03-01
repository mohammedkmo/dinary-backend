const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();
const authUser = require('./src/middlewares/auth')
const pricesController = require('./src/controllers/pricesController')
const port = process.env.PORT || 3000;
const userController = require('./src/controllers/userController')



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

app.get('/prices',pricesController.get)
app.post('/prices/new',authUser,pricesController.post)
app.get('/prices/last',pricesController.getLast)
app.post('/user/login',userController.post)
app.post('/user/update',userController.patch)
app.get('/user/users',userController.get)


app.listen(port, (()=> console.log(`listening on port ${port}`)));