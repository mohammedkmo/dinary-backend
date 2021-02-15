const mysql = require('mysql')


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '11223344',
    database: 'dinary'
})


module.exports = conn