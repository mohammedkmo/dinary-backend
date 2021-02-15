const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  get: (req, res) => {
    res.json({
      user: 'users',
    });
  },
  post: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || email == '' || password == null || password == '') {
      res.json({ msg: 'please write your email and password' });
    } else {
      await userModel.login(email, (r) => {
        if (r == false) {
          res.json({ msg: 'your email or password are wrong' });
        } else {
          r.map((data) => {
            bcrypt.compare(password, data.password, function (err, result) {
              if (result) {
                const token = jwt.sign({ _id: data.id }, process.env.TOKENKEY);

                res.header({
                  'x-auth-token': token,
                });
                res.json({
                  msg: 'Hello ' + data.name,
                  auth: token,
                });
              } else {
                res.statusCode = 400;
                res.json({
                  msg: 'your email or password are wrong',
                });
              }
            });
          });
        }
      });
    }
  },
  patch: async (req, res) => {
    const password = req.body.password;
    const rePassword = req.body.repassword;
    const headerToken = req.header('x-auth-token');
    const decoded = jwt.verify(headerToken, process.env.TOKENKEY);
    const id = decoded._id;

    if (password == rePassword) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        userModel.update(id, hash, (r) => {
          if (r) {
            res.json({ msg: 'password updated' });
          }
        });
      });
    } else {
      res.statusCode = 400;
      res.json({
        msg: 'password must be same',
      });
    }
  },
};
