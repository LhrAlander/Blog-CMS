const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'AlanderLt@163.com',
    pass: 'hairui123' //  授权码，不是qq密码或者独立密码
    // user: '1147816814@qq.com',
    // pass: 'cfbizrlpqutnifgg' //  授权码，不是qq密码或者独立密码
  }
});

// setup email data with unicode symbols
let mailOptions = {
  from: '是你的男朋友啦 <AlanderLt@163.com>', // sender address
  to: '466707620@qq.com', // list of receivers
  subject: '请批今天份的奏折哟', // Subject line
};


module.exports.sendMail = article => {
  console.log('send article', article)
  if (article.selectedList.some(l => l.name === '姜晓红与林海瑞')) {
    mailOptions.html = mailOptions.text = `就在${article.createTime}，林林林海瑞上奏了关于 ${article.title} 的言论，内容点点点这里：http://alanderLight.club/#/articleDetail/${article.articleId}`
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}