let db = require('../db')
let sql = ''
module.exports = {
  findType (type, cb) {
    sql = 'select * from type where name ="'+type.typeName+'"'
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      }
      cb(results)
    })
  },
  createType (type, cb) {
    sql = 'insert into type values("'+type.date+'","'+type.typeName+'")'
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      }
      cb(results)
    })
  },
  getTypeList (cb) {
    sql = 'select * from type'
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      }
      cb(results)
    })
  },
  delType (name, cb) {
    sql = 'delete from type where name="'+name+'"'
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      }
      else {
        cb(results)
      }
    })
  }
}
