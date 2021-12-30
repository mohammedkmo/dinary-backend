const mongoose = require("../database/connection");

const Schema = mongoose.Schema;

const pricesSchema = new Schema({
  usd: mongoose.Types.Decimal128,
  eur: mongoose.Types.Decimal128,
  gold: mongoose.Types.Decimal128,
  irr: mongoose.Types.Decimal128,
  try: mongoose.Types.Decimal128,
  date: Date,
});

pricesSchema.set("toJSON", {
  getters: true,
  transform: (doc, ret) => {
    
    if (ret.usd) {
      ret.usd = parseFloat(ret.usd.toString())
    }
    if (ret.eur) {
      ret.eur = parseFloat(ret.eur.toString())
    }
    if (ret.gold) {
      ret.gold = parseFloat(ret.gold.toString())
    }
    if (ret.irr) {
      ret.irr = parseFloat(ret.irr.toString())
    }
    if (ret.try) {
      ret.try = parseFloat(ret.try.toString())
    }
    delete ret.__v;
    return ret;
  },
});

exports.get = (callback) => {
  mongoose
    .model("prices", pricesSchema)
    .find()
    .then((data) => {
      return callback(data);
    });
};

exports.post = async (data, callback) => {
  mongoose
    .model("prices", pricesSchema)
    .create(data)
    .then((res) => {
      return callback(res);
    });
};

exports.getLast = async (callback) => {
  mongoose
    .model("prices", pricesSchema)
    .findOne({}, {}, { sort: { 'date' : -1 }})
    .then((data) => {
      return callback(data);
    });
};
