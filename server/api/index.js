let db = require('../db')
let sql = ''
let mysql = require('mysql')
const uuidV1 = require('uuid/v1')

function checkUid (uid, cb) {
  sql = 'select * from article where articleId='+'"'+uid+'"'
  db.query(sql, (err, results, fields) => {
    if (err) {
      throw err
    }
    if (!results.length) {
      cb(false)
      return
    }
    cb(true)
  })
}
function _getUid (cb) {
  let uid = uuidV1().split('-')[0]
  checkUid(uid, res => {
    if (!res) {
      cb(uid)
    }
    else {
      _getUid(cb)
    }
  })
}
function _createArticle (article, cb) {
  sql = `insert into article values(${mysql.escape(article.title)}, ${mysql.escape(article.markedCnt)}, ${mysql.escape(article.createTime)}, ${mysql.escape(article.articleId)})`
  console.log(sql)
  let responseDate = {}
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.log("createArticleErr", err)
      responseDate = {
        code: 3,
        msg: '数据库报错！'
      }
      cb(responseDate)
    }
    else {
      if (results.affectedRows != 0) {
        insertTypes(article.articleId, article.selectedList, res => {
          if (res.code == 1) { // 插入成功
            responseDate = {
              code: 1,
              msg: '创建成功'
            }
            cb(responseDate)
          }
        })
      }
      else {
        responseDate = {
          code: 0,
          msg: '创建失败'
        }
        cb(responseDate)
      }
    }
  })
}
function insertTypes (articleId, types, cb) {
  // 增加column字段
  sql = 'desc relation'
  db.query(sql, (err, results, fields) => {
    if (err) {
      throw err
    }
    else {
      preInsert(results)
    }
  })
  let preInsert = allTypes => {
    let isFirst = true
    sql = 'alter table relation add '
    for (let i = 0; i < types.length; i++) {
      let typeName = types[i].name
      if (!checkType(typeName, allTypes)) { // 不存在该分类
        console.log('69, 数据库中不存在分类：', typeName)
        if (isFirst) {
          sql += typeName+' boolean default 0'
          isFirst = false
        }
        else {
          sql += ',add '+typeName + ' boolean default 0'
        }
      }
    }
    if (!isFirst) {
      db.query(sql, (err, results, fields) => {
        if (err) {
          throw err
        }
        else {
          if (results) {
            console.log(results)
            return insertItem()
          }
        }
      })
    }
    else {
      return insertItem()
    }
  }
  let checkType = (name, allTypes) => {
    let flag = false
    allTypes.forEach((item, index) => {
      if (item.Field == name) {
        flag = true
      }
    })
    return flag
  }
  // 插入数据
  let insertItem = () => {
    sql = 'insert into relation (articleId'
    let typeNum = types.length
    types.forEach(typeName => {
        sql += ', '+typeName.name
    })
    sql += ') values("'+articleId+'"'
    for (let i = 0; i < typeNum; i++) {
      sql += ', "1"'
    }
    sql += ')'
    db.query(sql, (err, results, fields) => {
      if (err) {
        console.log('130 error', err)
        let data = {
          code: 0,
          msg: '插入relation失败'
        }
        cb(data)
      }
      else {
        if (results) {
          let data = {
            code: 1,
            msg: '插入relation成功'
          }
          cb(data)
        }
      }
    })
  }
}
function insertIntoRelation (type, cb) {
  sql = 'alter table relation add '+type.typeName+' boolean default 0'
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.error(err)
      cb({
        code: 3,
        msg: '数据库异常'
      })
    }
    else {
      if (results) {
        cb({
          code: 1,
          msg: '插入成功'
        })
      }
    }
  })
}
function deleteFromRelation (name, cb) {
  sql = 'alter table relation drop '+name
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.error("deleteFromRelation", err)
      cb({
        code: 3,
        msg: '数据库异常'
      })
    }
    else {
      if (results) {
        cb({
          code: 1,
          msg: '删除成功'
        })
      }
    }
  })
}
function createGetRelationTypePromise (articleId, item) {
  let mySql = `select * from relation where articleId = "${articleId}"`
  return new Promise((resolve, reject) => {
      db.query(mySql, (err, results, fields) => {
        if (err) {
          reject(err)
        }
        else {
          item.types = results
          resolve(`${articleId}搜索完毕！ `)
        }
      })
    })
}
function createGetTypePromise (name, item) {
  let mySql = `select * from relation where ${name} = 1`
  return new Promise((resovle, reject) => {
    db.query(mySql, (err, results) => {
      if (err) {
        reject(err)
      }
      else {
        item.num = results.length
        resovle()
      }
    })
  })
}
function operateArticleList (articles, cb) {
  articles.forEach(item => {
    let type = item.types[0],
        types = []
    for (key in type) {
      if (type[key] == 1) {
        types.push(key)
      }
    }
    item.types = types
  })
  cb({
    code: 1,
    msg: '获取文章列表成功',
    articles: articles
  })
}
function operateDisplayArticles (cb, pageNum, limit, results) {
  let responseData = {}
  responseData.articleNum = results.length
  responseData.code = 1
  if (results.length) {
    responseData.articles = results.slice(limit * (pageNum - 1), limit * pageNum)
    let asyncProcess = []
    responseData.articles.forEach(item => {
      let articleId = item.articleId
      asyncProcess.push(createGetRelationTypePromise(articleId, item))
    })
    Promise.all(asyncProcess)
      .then (data => {
        operateArticleList(responseData.articles, data => {
          if (data.code == 1) {
            cb(responseData)
          }
        })
      })
  }
}
function delRelation (articleId, cb) {
  sql = `delete from relation where articleId = '${articleId}'`
  db.query(sql, (err, results, fields) =>{
    if (err) {
      console.error(err)
      cb({
        code: 2,
        msg: '数据库异常'
      })
    }
    else {
      if (results) {
        cb({
          code: 1,
          msg: '删除成功'
        })
      }
    }
  })
}
function getAllArticles (pageNum, limit, cb) {
  sql = 'select * from article order by createTime desc'
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err)
      cb({
        code: 2,
        msg: '数据库异常'
      })
    }
    else {
      operateDisplayArticles(cb, pageNum, limit, results)
    }
  })
}
function getArticlesByType (tagName, pageNum, limit, cb) {
  sql = `select article.title, article.markedCnt, article.createTime, article.articleId
         from article, relation
         where article.articleId = relation.articleId and relation.${tagName} = 1
         order by createTime desc`
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err)
      cb({
        code: 2,
        msg: '数据库异常'
      })
    }
    else {
      operateDisplayArticles(cb, pageNum, limit, results)
    }
  })
}

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
        console.log(err)
      }
      else {
        insertIntoRelation(type, cb)
      }
    })
  },
  getTypeList (cb) {
    sql = 'select * from type'
    db.query(sql, (err, results, fields) => {
      if (err) {
        throw err
      }
      let promisList = []
      results.forEach(item => {
        promisList.push(createGetTypePromise(item.name, item))
      })
      Promise.all(promisList)
        .then(data => {
          cb(results)
        })
        .catch(err => {
          console.error(err)
          cb({
            code: 0,
            msg: 获取失败
          })
        })
    })
  },
  delType (name, cb) {
    sql = 'delete from type where name="'+name+'"'
    db.query(sql, (err, results, fields) => {
      if (err) {
        cb({
          code: 3,
          msg: '数据库异常'
        })
      }
      else {
        deleteFromRelation(name, cb)
      }
    })
  },
  createArticle (article, cb) {
    _createArticle(article, cb)
  },
  getUid (cb) {
    _getUid(cb)
  },
  getArticleList (cb) {
    sql = 'select * from article'
    db.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err)
        cb({
          code: 2,
          msg: '数据库异常'
        })
      }
      else {
        let asyncProcess = []
        results.forEach(item => {
          let articleId = item.articleId,
              relationTypes
          asyncProcess.push(createGetRelationTypePromise(articleId, item))
        })
        Promise.all(asyncProcess)
          .then(data => {
            operateArticleList(results, cb)
          })
      }
    })
  },
  delArticle (articleId, cb) {
    sql = `delete from article where articleId = '${articleId}'`
    db.query(sql, (err, results, fields) =>{
      if (err) {
        console.error(err)
        cb({
          code: 2,
          msg: '数据库异常'
        })
      }
      else {
        if (results) {
          delRelation(articleId, cb)
        }
      }
    })
  },
  getArticleById (articleId, cb) {
    sql = `select * from article where articleId = '${articleId}'`
    db.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err)
        cb({
          code: 2,
          msg: '数据库异常'
        })
      }
      else {
        createGetRelationTypePromise(articleId, results[0])
          .then(data => {
            operateArticleList(results, cb)
          })
      }
    })
  },
  editArticle (oldOne, newOne, cb) {
    sql = `delete from article where articleId = '${oldOne.articleId}'`
    let delRelCb = data => {
      if (data.code == 1) {
        _createArticle(newOne, cb)
      }
      else {
        cb({
          code: 3,
          msg: '修改失败'
        })
      }
    }
    db.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err)
        cb({
          code: 2,
          msg: '数据库异常'
        })
      }
      else {
        delRelation(oldOne.articleId, delRelCb)
      }
    })
  },
  getDisplayArticles (tagName, pageNum, limit, cb) {
    if (tagName == 'all') {
      getAllArticles(pageNum, limit, cb)
    }
    else {
      console.log(tagName, pageNum, limit)
      getArticlesByType(tagName, pageNum, limit, cb)
    }
  }
}
