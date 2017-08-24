/**
 * Created by Alander on 2017/8/24.
 */
export default {
  // 工具函数
  getCurrentTime () {
    let date = new Date()
    let dateStr = date.toLocaleDateString().replace(/\//g, '-')
    dateStr += ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    return dateStr
  }

}
