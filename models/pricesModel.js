const conn = require('../database/connection');

exports.get = async (callback) => {
  const q = 'SELECT * FROM prices';

  conn.query(q, (err, result, fields) => {
    if (err) throw err;

    return callback(result);
  });
};

exports.post = async (data, callback) => {
  const q =
    'INSERT INTO prices (usd,eur,gold,irr,try,date) VALUES (?,?,?,?,?,?)';

  conn.query(
    q,
    [data.usd, data.eur, data.gold, data.irr, data.try, data.date],
    (err, result, fields) => {
      if (err) throw err;

      return callback(result);
    }
  );
};
