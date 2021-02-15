const conn = require('../database/connection');

exports.login = async (email, callback) => {
  const q = 'SELECT * FROM users WHERE email=?';


  await conn.query(q,email ,(err, result, fields) => {
    if (err) throw err;


    if (result.length >= 1) {
      return callback(result);
    } else {
      return callback(false);
    }
  });
};


exports.update = async (id,password,callback)=>{

  const q='UPDATE users set password=? WHERE id=?'

  conn.query(q,[password,id],(err,result,fields)=>{
    if(err)throw err

    return callback(result)

  })


}