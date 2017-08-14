/**
 * Created by Alander on 2017/8/7.
 */
let express = require('express')
let router = express.Router()
let _db = require('../db')
let db = _db.connection
let crypto = require('../util/crypto')
let settins = require('../settings')
let jwt = require('jwt-simple')
let api = require('../api')

router.post('/reg.do', (req, res, next) => {
  let user = req.body.user
  let mySql = 'select * from user where userId="' + user.userId + '"'
  console.log(mySql)
  db.query(mySql, (err, results, fields) => {
    if (err) {
      throw err;
    }
    else {
      if (!results.length) {
        let pwd = crypto.getSha1(user.password)
        mySql = 'insert into user values("' + user.userId + '", "' + pwd + '")'
        console.log(mySql)
        db.query(mySql, (err, results, fields) => {
          if (err) {
            console.log(err)
          }
          else {
            if(results.affectedRows) {
              let data = {
                user: user,
                message: '注册成功！'
              }
              res.send(data)
            }
          }
        })
      }
    }
  })
})
router.post('/login.do', (req, res, next) => {
  let user = req.body.user
  let message = ''
  let sql = 'select * from user where userId="'+user.userId+'"'
  db.query(sql, (err, results, fields) => {
    if (err) {
      message = '服务器发生错误！'
    }
    else {
      console.log(crypto.getSha1(user.password), results[0].password)
      if (results.length && crypto.getSha1(user.password) === results[0].password) {
        message = '登录成功!'
        let expires = Date.now()
        expires += 7*24*60*60*1000
        let token = jwt.encode({
          userId: user.userId,
          exp: expires
        }, settins.tokenSecret)
        delete user.password
        res.json({
          token: token,
          expires: expires,
          user: user
        })
        return
      }
      else {
        message = '用户名或密码错误！'
      }
    }

    let data = {
      message: message
    }
    res.send(data)
  })
})
router.post('/createtype.do', (req, res, next) => {
  let type = req.body
  api.findType(type, (data) => {
    console.log(data)
    if (!data.length) {
      api.createType(type, (data) => {
        res.json({
          code: 1,
          message: "创建分类成功"
        })
      })
    }
    else {
      res.json({
        code: 0,
        message: "该分类已存在"
      })
    }
  })
})
router.post('/gettypelist.do', (req, res, next) => {
  api.getTypeList(data => {
    console.log(data)
    res.send(data)
  })
})

router.post('/deltype.do', (req, res, next) => {
  let type = req.body
  api.delType(type.name, data => {
    if (data.affectedRows) {
      res.send({
        code: 1,
        message: '删除分类成功'
      })
    }
    else {
      res.send({
        code: 0,
        message: '删除分类失败'
      })
    }
  })
})

module.exports = router
