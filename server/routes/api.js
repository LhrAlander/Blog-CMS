/**
 * Created by Alander on 2017/8/7.
 */
let express = require('express')
let router = express.Router()
let db = require('../db')
let crypto = require('../util/crypto')
let settins = require('../settings')
let jwt = require('jwt-simple')
let api = require('../api')


router.post('/reg.do', (req, res, next) => {
  let user = req.body.user
  console.log(16, user)
  let mySql = 'select * from user where userId="' + user.userId + '"'
  console.log(mySql)
  db.query(mySql, (err, results, fields) => {
    if (err) {
      console.log(err)
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
  let user = req.body
  console.log(user)
  let message = ''
  let sql = 'select * from user where userId="'+user.userId+'"'
  db.query(sql, (err, results, fields) => {
    if (err) {
      message = '服务器发生错误！'
      console.log('登录异常', err)
    }
    else {
      if (results.length && crypto.getSha1(user.password) === results[0].password) {
        message = '登录成功!'
        let expires = Date.now()
        expires += 7*24*60*60*1000
        let token = jwt.encode({
          userId: user.userId,
          exp: expires
        }, settins.tokenSecret)
        delete user.password
        res.send({
          code: 1,
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
      code: -1,
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
      api.createType(type, data => {
        console.log('88 ', data)
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
    res.send(data)
  })
})

router.post('/deltype.do', (req, res, next) => {
  let type = req.body
  api.delType(type.name, data => {
    console.log(113, data)
    res.send(data)
  })
})

router.post('/createArticle.do', (req, res, next) => {
  let article = req.body
  let createCb = data => {
    res.send(data)
  }
  let uidCb = uid => {
    article.articleId = uid
    api.createArticle(article, createCb)
  }
  api.getUid(uidCb)
})
router.post('/getArticles.do', (req, res, next) => {
  let getArticlesCb = data => {
    res.send(data)
  }
  api.getArticleList(getArticlesCb)
})
router.post('/delArticle.do', (req, res, next) => {
  let articleId = req.body.articleId
  let delArticleCb = data => {
    res.send(data)
  }
  api.delArticle(articleId, delArticleCb)
})
router.post('/getArticleById.do', (req, res, next) => {
  let articleId = req.body.articleId
  let getArticleByIdCb = data => {
   res.send(data)
  }
  api.getArticleById(articleId, getArticleByIdCb)
})
router.post('/editArticle.do', (req, res, next) => {
  let oldOne = req.body.oldOne
  let newOne = req.body.newOne
  let editCb = data => {
    if (data.code == 1) {
      data.msg = '修改成功'
    }
    res.send(data)
  }
  api.editArticle(oldOne, newOne, editCb)
})
router.post('/getDisplayArticles.do', (req, res, next) => {
  let tagName = req.body.tag,
      pageNum = req.body.page,
      limit = req.body.limit
  let getDisplayArticlesCb = data => {
    res.send(data)
  }
  api.getDisplayArticles(tagName, pageNum, limit, getDisplayArticlesCb)
})
router.post('/getAllTypes.do', (req, res, next) => {

})

module.exports = router
