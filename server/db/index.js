/**
 * Created by Alander on 2017/8/7.
 */
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my_blog'
})

connection.connect()

module.exports = connection
