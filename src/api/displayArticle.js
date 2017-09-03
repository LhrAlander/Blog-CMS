/**
 * Created by Alander on 2017/9/3.
 */
import axios from 'axios'

export default {
  getDisplayArticles (data) {
    return axios.post('/api/getDisplayArticles.do', data)
  }
}
