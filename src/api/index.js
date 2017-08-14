/**
 * Created by Alander on 2017/8/13.
 */
import axios from 'axios'


export default {
  createType (data) {
    return () => axios.post('/api/createtype.do', data)
  },
  getTypeList () {
    console.log('gettypelist')
    return () => axios.post('/api/gettypelist.do')
  },
  delType (data) {
    return () => axios.post('/api/deltype.do', data)
  }
}
