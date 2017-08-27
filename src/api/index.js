/**
 * Created by Alander on 2017/8/13.
 */
import axios from 'axios'


export default {
  // 数据操作相关
  createType (data) {
    return () => axios.post('/api/createtype.do', data)
  },
  getTypeList () {
    console.log('gettypelist')
    return () => axios.post('/api/gettypelist.do')
  },
  delType (data) {
    return () => axios.post('/api/deltype.do', data)
  },
  createArticle (article) {
    return () => axios.post('/api/createArticle.do', article)
  },
  doLogin (user) {
    return () => axios.post('/api/login.do', user)
  },
  getArticleList () {
    return () => axios.post('/api/getArticles.do')
  },
  delArticle (articleId) {
    return () => axios.post('/api/delArticle.do', articleId)
  }
}
