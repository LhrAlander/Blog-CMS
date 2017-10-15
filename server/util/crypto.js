/**
 * Created by Alander on 2017/8/7.
 */

var crypto = require('crypto')

exports.getSha1 = function(str) {
  var sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  sha1.update(str);
  var res = sha1.digest("hex");  //加密后的值d
  return res;
}



