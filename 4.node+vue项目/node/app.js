var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// Morgan是一个node.js关于http请求的日志中间件
//每次http请求，express都会输出日志，并且格式一致。
var cookieParser = require('cookie-parser');
//这个插件通常当作中间件使用，app.use(cookieParser()), 这样就可以处理每一个请求的cookie。
var bodyParser = require('body-parser');
//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
var session    = require('express-session');
var index = require('./routes/index');
var handler = require('./routes/handler1');
var flash = require('connect-flash');
//flash 是 session 中一个用于存储信息的特殊区域。消息写入到 flash 中，在跳转目标页中显示该消息。
var url=require('url')
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.all('*', function(req, res, next) {
  var oriRefer;
  if(req.headers.referer){
    oriRefer= req.headers.referer.substring(0,req.headers.referer.indexOf("/",10));
  }
  var MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
  };
  var filePath;
  if(req.url==="/"){
    filePath =  "index.html";
  } else if(req.url==="/www/"){
    filePath =  "index.html";
  }else{
    filePath = "./" + url.parse(req.url).pathname;
  }
  var ext = path.extname(filePath);
  ext = ext?ext.slice(1) : 'unknown';
  var contentType = MIME_TYPE[ext] || "text/plain";
  res.header("Access-Control-Allow-Origin", oriRefer?oriRefer:"*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", contentType+";charset=utf-8");
  next();
});

app.use(session({
    secret: 'FCXUHT',
    name: 'FCXUHT',
    cookie: {maxAge: 800000000000},
    resave: false,//每次请求都重新设置session cookie
    saveUninitialized: true//每次请求都设置个session cookie
}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});


app.use('/', index);
app.use('/VueHandler', handler);

//特殊图片请求，不由express的静态服务管理
app.get('/DownLoadPicHandler',function(request,response){
  var arr = request.originalUrl.split("=");
  console.log(arr);
  var host="localhost";
  var port="27017";
  var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
  var db=new mongo.Db("administor",server,{safe:true});//创建数据库对象
  db.open(function (err,db) {//连接数据库
    if(err)
     console.log(err);
    else{
      db.collection('coverList', function (err,collection) {
        if (err){  response.end('{"err":"抱歉，上传图片失败"}');}
        else {
          collection.find({pathName:arr[arr.length-1]}).toArray(function (err, docs) {

            if (err||!docs[0]){

              console.log('234566');
              response.end('{"err":"抱歉，上传图片失败"}');
            }
            else {
              db.close();
              response.end(docs[0].contents.buffer);

            }

          });
        }

      });


    }
  });
  db.on("close", function (err,db) {//关闭数据库
    if(err) throw err;
    else console.log("成功关闭数据库.");
  });

});


app.use(express.static(path.join(__dirname, 'public')));
// module.exports = app;
app.listen(8000);
