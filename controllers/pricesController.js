const pricesModel = require('../models/pricesModel');

module.exports = {
  get: async (req, res) => {
    pricesModel.get((r) => {
      res.json({
        data: r,
      });
    });
  },

  post: async (req, res) => {
    const data = {
      usd: parseFloat(req.body.usd).toFixed(2),
      eur: parseFloat(req.body.eur).toFixed(2),
      gold: parseFloat(req.body.gold).toFixed(2),
      irr: parseFloat(req.body.irr).toFixed(2),
      try: parseFloat(req.body.try).toFixed(2),
      date: new Date(),
    };

    pricesModel.post(data, (r) => {
      if (r) {
        res.json({
          msg: 'prices added',
        });
      } else {
        res.statusCode = 400;
        res.json({
          msg: 'there was something wrong',
        });
      }
    });
  },
  getLast: async(req,res) =>{
    pricesModel.getLast((r)=>{
      res.json({
        data: r,
      })
    })
  }
};
