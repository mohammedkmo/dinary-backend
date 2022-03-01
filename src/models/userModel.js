const mongoose = require("../database/connection");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: mongoose.SchemaTypes.String,
  email: mongoose.SchemaTypes.String,
  password: mongoose.SchemaTypes.String,
});
exports.login = async (email, callback) => {
  mongoose
    .model("users", userSchema)
    .findOne({ email: email })
    .then((data) => {
      if (data != null) {
        return callback(data);
      } else {
        return callback(false);
      }
    });
};

exports.update = async (id, password, callback) => {
  mongoose
    .model("users", userSchema)
    .findOneAndUpdate({ _id: id, password: password })
    .then((res) => {
      return callback(res);
    });
};
