//实现功能接口
var express = require('express'),
    router = express.Router(),
    handler = require('./dbhandler.js'),   // 对数据库操作的增删改查的方法
    formidable = require('formidable'),  // 上传模块
    crypto = require('crypto');  // 加密  对账号和密码进行加密
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var images = require("images"); // 上传图片
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;    
// 引入的模块，用来处理 得到的ID( )req.session.user.id) 和 mongo 里面的id的格式不一样的问题 

// 定义了一个函数，用户手机用户的登陆信息  的容器
function User(user) {
  this.id=user.id;    // 暂时不考虑
  this.name = user.name;
  this.password = user.password;
  this.veri = user.veri;
};
var flagInt = 0;
//迭代处理删除后的系统管理员各人员的tokenId
var recUpdate = function(req, res, collections,data){
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"userName":data[0].userName},
      {$set:
      {
        "tokenId":data[0].tokenId-1
      }
      }

    ];

    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){

      data.shift();
     if(data.length!=0){
        //console.log(data);
        recUpdate(req, res, collections,data);
      }else{
        res.end('{"success":"更新成功"}');
      }
    });
  }
}
//迭代处理课程列表删除后的ID
var recUpdateID = function(req, res, collections,data,fn){
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    // data = [{ID:4},{ID:5}]  --(-1)--->   [{ID:3},{ID:4}] -->  update  条件，内容
    var selectors = [
      {"_id":data[0]._id},
      {$set:
      {
        "ID":data[0].ID-1
      }
      }

    ];
    //console.log(fn);
    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){
      data.shift();
      if(dat.length==0){
        res.end('{"err":"抱歉，更新失败"}');
      }else if(data.length!=0){
        //console.log(data);
        recUpdateID(req, res, collections,data,fn);
      }else{

        if(fn){
          fn();
        }else{
          res.end('{"success":"更新成功"}');
        }

      }
    });
  }
}
//迭代删除目录绑定的视频
/*
*  dirID:目录_id
*  proID:课程_id
*  VstateName:课程名称
*  data  需要处理的视频数据集
* */
var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
  var dirIDProName = dirID+proID ;
  if(data.length===0){
    fn();
  }else{
            req.query.action='find';
            //查询与课程ID对应的目录条数看与该课程绑定的目录是否只剩一条否则不改变videoList的Vstate字段
            handler(req, res, "directoryList", {"CDid":proID},function(set){
              //console.log(set);
              //拆分Vstate去除其中的已删除课程名
              var targetArrVstate = data[0].Vstate.split(",");
              if(set.length===1){
                var indexNumberVstate = (function(arr,val) {
                  for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) return i;
                  }
                  return -1;
                })(targetArrVstate,VstateName);
                targetArrVstate.splice(indexNumberVstate,1);
              }
              //拆分Vmosaic去除其中的dirIDProName
              var targetArrVmosaic = data[0].Vmosaic.split(",");
              var indexNumberVmosaic = (function(arr,val) {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == val) return i;
                }
                return -1;
              })(targetArrVmosaic,dirIDProName);
              targetArrVmosaic.splice(indexNumberVmosaic,1);

              var selectors = [
                {"_id":data[0]._id},
                {$set:
                {
                  "Vstate":targetArrVstate.join(","),
                  "Vmosaic":targetArrVmosaic.join(",")
                }
                }

              ];
              //console.log(selectors);
              req.query.action='update';
              //更新视频列表对应数据的Vstate与Vmosaic字段
              handler(req, res, "videoList", selectors,function(da){
                data.shift();
                if(data.length==0){
                  fn();
                }else if(data.length!=0){
                  delDirVideo(req, res, dirID,proID,data,fn);

                }
              });
            });

  }
}
//迭代删除课程绑定的目录
/*
 proID 课程的_id
* */
var delProDir = function(req, res,proID,fn){
    req.query.action = 'find';
  //查询productList，获取对应ID的课程信息的_id和课程名
  handler(req, res, "productList",{_id:proID} ,function(das){
    //获取对应课程_id的目录集directoryList
    handler(req, res, "directoryList",{CDid:proID} ,function(da){
      if(da.length!==0){
        /*
         * /*
         *  dirID:目录_id
         *  proID:课程_id的拼合串
         *  VstateName:课程名称
         *  data  需要处理的视频数据集
         *
         var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
         * */
        //获取第一个目录相关的视频集
        handler(req, res, "videoList",{ Vmosaic: { $regex: '.*'+da[0]._id+das[0]._id+'.*' } } ,function(daa){
          delDirVideo(req, res, da[0]._id,das[0]._id,das[0].Cname,daa,function(){
            //删除该目录
            req.query.action = 'delete';
            handler(req, res, "directoryList",{_id:da[0]._id} ,function(dat){
              req.query.action = 'find';
              //再次验证看该课程下是否还有目录，如果有就迭代处理
              handler(req, res, "directoryList",{CDid:proID} ,function(data){
                if(data.length===0){
                  fn();
                }else{
                  delProDir(req, res,proID,fn);
                }
              });
            });
          });

        });

      }else{
        fn();
      }
    });

  });


}
//判断对象是否为空
var isNullObj=function(obj){
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      return false;
    }
  }
  return true;
}
//生成课程代码
var generateCode = function(){
  var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var numbers = ['0','1','2','3','4','5','6','7','8','9'];
  var str = "";
  for(var i=0;i<8;i++){
    if(i<4){
      str+= letters.splice(parseInt(Math.random()*(letters.length)),1);
    }else{
      str+= numbers.splice(parseInt(Math.random()*(numbers.length)),1);
    }
  }
  return str;
}

// 函数 设计+调用   ==


router.get('/aaaa', function (req, res) {
// localhost:3000/Vuehandler/aaaa
  // res.send('你正在使用的是 handler 路由');
  if(req.query.action === 'haha') {
    // req.query.action  获取到get方式的？后面
    // 实际上 获取到的是  action = haha
    res.send('这是 haha 的接口');
    // 服务器给你一个 响应  ‘这是haha 的接口
  }
});

// 前端要去请求的接口是什么  请求什么数据，发挥什么功能 --》  后台逻辑
// 接口： /VueHandler/AdminLoginAndRegHandler?action="verification"
router.get('/AdminLoginAndRegHandler', function (req, res) {
  // localhost:8000/VueHandler/AdminLoginAndRegHandler    进入到后台当前的函数里面
  if(req.query.action === 'verification') {
    // res.send('{"success": "验证码接口走通"}');
    // 生成随机数字
    var randomNum = function (min, max) {  //生成随机数字
      return Math.floor(Math.random()*(max-min) + min);
    }
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';// 从这个字符串里面随机挑选出多个字符，当验证码
    var returnStr = '';
    for(var i=0;i<4;i++) {
      var txt = str[randomNum(0, str.length)];
      returnStr += txt;
    }
    // 用户信息--》 验证码也属于用户信息   ，  所以
    var newUser = new User({  // 手机用户信息里面的验证码部分
      name: '',
      password: '',
      id: '',
      veri: returnStr
    });
    // 正常的用户信息都储存在 session 中
    // session  req.session  我的用户信息储存的地方
    // 验证码是登录信息的一部分， 所有要储存在 session 中
    req.session.user = newUser;   

    res.end('{"success": "true","data": "'+returnStr+'"}');

  } else if (req.query.action === 'checkVerification') {
    // 验证验证码
    if(req.session.user && req.query.veri === req.session.user.veri) {
      // 前端输入的验证码相等于后台生成的验证码
      res.send('{"success": "验证码正确"}');
    }else {
      res.end('{"err": "验证码错误"}');
    }
  }
  
});


// ****************************
// 注册信息 是很多的， 前端要发送到后台储存到数据库里面的信息也是很多的，
// 用户信息是保密的，  不能使用get,所以要使用post

router.post('/AdminLoginAndRegHandler', function (req, res) {
  if(req.query.action === 'add') { // 添加功能
    // 注册接口
    req.query.action = 'show'; // 查询数据库 --》  人员列表--》 arr.length
    handler(req, res, 'Administor', null, function (arr) {
      // arr 查询到的数据的结果 （结果集）

      var md5 = crypto.createHash('md5');   // 设置加密的方式

      var userInfor = {}; // 收集所有要添加到数据库里面的数据  --->  为了加入集合做准备
      userInfor.tokenId = arr.length + 1;
      userInfor.createAt = new Date();    // 数据的创建时间
      userInfor.isdelete = /^fcgl/.test(req.body.trueName) ? false : true;  
        // 根据前端传过来的 trueName 字段 判断 储存false 还是 true；
      userInfor.phone = /^1\d{10}/.test(parseInt(req.body.phone)) ? req.body.phone : false;
      // 手机校验  开口是1， 后面十位数字
      userInfor.power = req.body.power;   // 人员的权限   系统管理人员 ||  课程管理人员
      userInfor.powerCode = req.body.power == '系统管理人员' ? 1 : 2;  
      userInfor.success = '成功';
      userInfor.upDateAt = new Date();
      userInfor.userName = req.body.userName == '' ? false : req.body.userName;
      userInfor.trueName = req.body.trueName == '' ? false : req.body.trueName;
      userInfor.password = md5.update(req.body.password).digest('base64');

      // 前端的字段
      /**
      userName: 'abc',
      password: '123456',
      trueName: '葫芦娃',
      phone: '12345678912',
      power: '系统管理人员'
      */


      // 至此 我要添加的人员信息的 字段 到现在已经 组织完成了

      req.query.action = 'add';  // 对数据库的 操作方式
      // 判断数据不为空
      if (userInfor.phone != 'false' && userInfor.userName != 'false' && userInfor.trueName != 'false') {
        handler(req, res, 'Administor', userInfor, function (data) {
          // data  -->  我的结果
          if (data.length == 0) {
            res.end('{"err": "失败"}');
          } else {
            res.end('{"success": "注册成功"}');
          }
        });
      }
    });
  } else if(req.query.action === 'login') {
    // 登录功能  加密前段发送过来的密码
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    handler(req, res, 'Administor', {userName: req.body.userName, password: password}, function (data) {
      if(data.length === 0) {
        res.end('{"err": "抱歉，用户名或密码无效"}');
      } else if (data.length != 0 && data[0].password === password) {
        // 缺少一部 --》 将登陆的信息储存到session中    flash?
        req.session.user.name = req.body.userName;
        req.session.user.password = req.body.password;
        req.session.user.id = data[0]._id;
        // console.log(req.session.user);

        
        res.end('{"success": "true", "content": "登陆成功"}');
      }
    })
  }
});
// 查询
router.get('/AdminHandler', function (req, res) {
  if(req.query.action === 'show') {  // 定义数据库的操作方式， 只要有一个 req.query.action 有了定义的操作方式就不需要再次定义了
    // 进入显示接口
    handler(req, res, 'Administor', null, function (arr) {  // arr 查询到的数据库的结果
      // 查询操作  （姓名查询， 分页控制）
      var selector = !req.query.searchText ? {
        // 搜索框是否为空
        tokenId:{$gt:arr.length-(parseInt(req.query.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.query.pageStart)*3-3)}
      } : { 
        // 搜索框有东西， 使用正则-》匹配 --》作为匹配的结果
        trueName: { $regex: '.*'+req.query.searchText+'.*', $options: 'i' } 
        // '.*'+内容+'.*'    匹配搜索框 中的内容，  内容为b  搜索含有字母b的结果集
      } ;
      console.log(selector);
      handler(req, res, 'Administor', selector, function (data) {// data 为查询到的结果集
        if (data.length == 0) {
          res.end('{"err": "抱歉找不到该人员"}');  // 会报错  ***must b a buffer or s
        } else {
          // 没有查询操作， 查询为null
          var obj = {
            data: {
              pageSize: 3,// 规定一页显示几条数据
              count: arr.length,  // 你如果不告诉他多少条数据，他只能自己数
              list: data   // 你请求的当前页的数据
            }
          }
          var str = JSON.stringify(obj);
          res.send(str);  // 把得到的数据显示在前端页面上
        }
      })
    })


// /VueHandler/AdminHandler?action=delete
  } else if (req.query.action === 'delete') {  // 再添加数据的时候用户名不能冲突
    // 删除接口，对数据库进行删除
    handler(req, res, 'Administor', {tokenId: parseInt(req.query.tokenId),isdelete: true}, function (data) {
      console.log(data);
      if(data.result.n == 0) {
        res.end('{"err": "删除失败"}');
      }else {
        // res.end('{"success": "删除成功"}');需要考虑 tokenId  大于我删除的 tokenId 的数据, 并让他依次减一
        // 使用find方法
        req.query.action = 'show';
        // 查询 tokenId > 当前删除的 tokenId 的所有数据
        handler(req, res, 'Administor', {tokenId: {$gt: parseInt(req.query.tokenId)}}, function (da) {
          // da: tokenId 大于当前 Id 的所有数据
          // 删除时的 data 是我查询到的删除的数据
          // 让 da 里面的数据 的 tokenId -1
          recUpdate(req, res, 'Administor', da);
        })
        res.end('{"success": "更新成功"}');
      }
    });
  } else if (req.query.action === 'quit') {  // 退出
    console.log(req.body.userName);
    console.log(req.session.user);
    if (req.session.user) {   // 确认服务器储存了登陆的用户  --》 确认你已经登陆了
      req.session.user = {};    // session 储存
    }
    res.end('{"success": "退出成功"}');
    
  }else if(req.query.action === 'lockuser') {  // 冻结和解冻 学员列表
    req.query.action = 'show';
    handler(req, res, 'studentList', {tokenId: parseInt(req.query.tokenId)}, function (dat) {
      
      // 解冻或冻结
      var isstate = dat[0].isstate ? false : true;
      req.query.action = 'update';

      var selector = [
        {tokenId: parseInt(req.query.tokenId)},
        {$set: {
          isstate: dat[0].isstate ? false : true
        }}
      ];
      handler(req, res, 'studentList', selector, function (data) {
        
        if(data) {

          res.end('{"success": "操作成功","isstate": "'+JSON.stringify(dat[0].isstate ? false : true)+'"}');
        }else {
          res.end('{"err": "抱歉,冻结失败"}');
        }
      });
    })
  }else {
    res.end('{"err": "没有这个路由"}');
  }
})
// var recUpdate = function(req, res, 'Administor',data[da]){ 
      // 如果 data=[{4}. {5}, {6}]
//   if(data.length===0){
      // 我删除了末尾的数据，后面没有数据
//     res.end('{"success":"删除成功"}');
//   }else{
        // 看似是修改了一条数据
//     var selectors = [
//       {"userName":data[0].userName},
          // data[0] 第一组数据
//       {$set:  //也可以使用 $inc
//       {
//         "tokenId":data[0].tokenId-1
            // 修改 tokenId -1
//       }
//       }

//     ];

//     req.query.action = 'update';  //确定了数据库的操作方式
//     handler(req, res, collections, selectors,function(dat){
          // 走到这里的时候， 已经修改完成了一条
          // 然后将 data(待修改的结果集) ， 用shift删除已经修改的第一个结果  data = [{5}, {6}]
//       data.shift();
//      if(data.length!=0){
//         //console.log(data);
//         recUpdate(req, res, collections,data);   // 重新调用自身，直到清空所有的待修改的结果集
//       }else{
//         res.end('{"success":"更新成功"}');   
          // 如果 待修改的结果集为空  data=[] 是 成功
//       }
//     });
//   }
// }


// // 登陆
// router.post('/AdminLoginAndRegHandler', function (req, res) {
//   if(req.query.action === 'login') {
//     // 登录功能  加密前段发送过来的密码
//     var md5 = crypto.createHash('md5');
//     var password = md5.update(req.body.password).digest('base64');
//     handler(req, res, 'Administor', {userName: req.body.userName, password: password}, function (data) {
//       if(data.length === 0) {
//         res.end('{"err": "抱歉，用户名或密码无效"}');
//       } else if (data.length != 0 && data[0].password === password) {
//         // 缺少一部 --》 将登陆的信息储存到session中    flash?
//         res.end('{"success": "true"}');
//         // 跳转到某一个页面
//       }
//     })
//   }
// })

// /VueHandler/AdminHandler?action=update
router.post('/AdminHandler', function (req, res) {
  if(req.query.action === 'update') {// 更新，修改 
    var selector = [  // 
      {"tokenId": parseInt(req.body.tokenId)},  // 根据谁去修改
      {$set: // 修改的内容 完全是由前端传入的
        {
          "userName": req.body.userName,  // 用户名
          "trueName": req.body.trueName,  // 真实名字
          "phone": req.body.phone,  // 电话
          "power": req.body.power,  // 权限
          "upDateAt": new Date()    // 更新日期
        }
      }
    ];
    // selector = [{条件},{$set: {设置的数据内容，有前端传过来的}}]
    handler(req, res, 'Administor', selector, function (data) {
      // handler 自己封装的操作数据库的模块
      // update 的数据  selsctor -->  [{条件} , {如何修改}]
      if (data.length == 0) {
        res.end('{"err": "抱歉， 修改失败"}');
      }else {
        res.end('{"success": "更新成功"}');  
      }
      // 返回前端页面
    })
  }else if(req.query.action === 'returnuserinfo') {  // 返回登录的用户信息
    // /VueHandler/AdminHandler?action=returnuserinfo
    console.log(req.session);
    // res.end('{"success": "登陆成功，返回用户信息"}');
    req.query.action = 'find';
    // var sessionUserName = req.session.user.name;  
    // var sessionPassword = req.session.user.password;
    var sessionId = new ObjectID(req.session.user.id);  // 获取到 mongo 中的 _id

    handler(req, res, 'Administor', {"_id": sessionId}, function (data) {
      if (data.length == 0) {
        res.end('{"err": "抱歉，系统故障"}');
      } else {
        var str = JSON.stringify(data[0]);
        res.end(str);
      }
    })

  }else if(req.query.action === 'updatepass') { // 更改密码
    // /VueHandler/AdminHandler?action=updatepass
    // 对原来的密码进行加密
    var md5 = crypto.createHash('md5');
    var passwordMd5 = md5.update(req.body.userPwd).digest('base64');
    console.log(req.session.user.password);
    // 判断输入的密码和登陆的密码是否一致
    if(req.session.user.password != req.body.userPwd) {
      res.end('{"err": "密码错误，一边玩去儿"}');
    }else {
      // 加密新密码
      var md5 = crypto.createHash('md5'); // ???????为什么复制这行
      var newPwd = md5.update(req.body.newPwd).digest('base64');
      // 修改数据库里面的密码
      var selector = [
        {"userName": req.session.user.name}, // 根据我当前登录的账号， 修改对应的数据库里面的信息
        {$set: {
          'password': newPwd,
          'upDateAt': new Date()
        }}
      ]
      handler(req, res, 'Administor', selector, function (data) {
        if (data.length == 0) {
          res.end('{"err": "密码更新失败"}');
        } else {
          res.end('{"success": "密码更新成功"}');
        }
      })
    }

  }else if(req.query.action === 'adduser') {  // 添加学员信息
    // tokenId --> arr.length+1
    req.query.action = 'find';  // 定义 数据库操作方式 查询
    handler(req, res, 'studentList', null, function (arr) {
      // 组织好学员信息
      //////////////////////////////////////////////////////////////////////////
      // _id createAt  email isstate phone success tokenId upDateAt  userName //
      //////////////////////////////////////////////////////////////////////////
      console.log(arr);
      var userInfors = {};
      userInfors.tokenId = arr.length+1;
      userInfors.createAt = new Date();
      userInfors.userName = req.body.userName === '' ? 'false' : req.body.userName;
      userInfors.userPwd = '123456';
      userInfors.isstate = false;
      userInfors.upDateAt = new Date();
      userInfors.success = '成功';
      userInfors.phone = /^1\d{10}$/.test(parseInt(req.body.addphone)) ? req.body.addphone : 'false';
      userInfors.email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(req.body.addemail)?req.body.addemail:"数据格式不对";

      // 将数据储存到 数据库的集合里面
      req.query.action = 'add';
      // 校验 phone userName email
      if(userInfors.phone != 'false' && userInfors.userName != 'false' && userInfors.email != '数据格式不对') {
        handler(req, res, 'studentList', userInfors, function (data) {
          if(data.length === 0) {
            res.end('{"err": "学员添加失败"}');
          }else {
            res.end('{"success": "学员添加成功"}');
          }
        });
      }else {
        res.end('{"err": "抱歉，格式有误"}');
      }
      
    });

  } 
})

// /VueHandler/UpLoadVideoHandler 上传视频
router.post('/UpLoadVideoHandler', function (req, res) {
  // formidable  上传模块
  console.log('hahaha');
  // 创建上传表单
  var from = new formidable.IncomingForm();  // 创建一个上传表单
  from.encoding = 'utf-8';  // 编码
  from .uploadDir = 'temporary/video/'   // 上传的路径
  from.keepExtensions = true;// 保留文件的扩展名
  from.maxFieldsSize = 100*1024*1024;// 上传的大小限制
  from.maxFields = 1000;  //文件数量
  from.parse(req, function (err, fields, files) {
    console.log(fields);
    console.log('--------我是分割线--------');
    console.log(files);  // 文件信息, 包含了文件路径
    console.log('--------我是分割线--------');
    if(!err) {
      var obj = {
        cacheName: files[Object.getOwnPropertyNames(files)[0]].path,
        success: '成功'
      }
      var str = JSON.stringify(obj);
      res.end(str);
    }else {
      var obj = {
        err: '你上传的视频不健康'
      }
      var str = JSON.stringify(obj);
      res.end(str);
    } 
  });
});

// /VueHandler/VideoHandler?action=add  添加视频信息
router.post('/VideoHandler', function (req, res) {
  if(req.query.action === 'add') {
    req.query.action = 'find';
    handler(req, res, 'videoList', null, function (arr) {
      var videos = {}
      videos.Vname = req.body.Vname;  //视频的名字
      videos.Vtime = req.body.Vtime;  //视频的时长
      videos.Vurl = req.body.Vurl;  //视频地址, 前端上传视频的路径
      videos.ID = arr.length + 1;  //相当于 tokenId
      videos.Vstate = '';   // 课程被绑定
      videos.createAt = new Date();  //创建日期
      videos.upDateAt = new Date();  //修改日期
      videos.isFinish = false;  // 等二次开发再说
      videos.isViewed = false;  // 等二次开发再说
      // 当按照数据结构 收集完信息
      if(videos.Vname && videos.Vtime && videos.Vurl) {
        req.query.action = 'add';
        handler(req, res, 'videoList', videos, function (data) {
          if(data.length === 0) {
            res.end('{"err": "抱歉，添加失败"}');
          }else {
            console.log(data);
            var obj = {
              ID: parseInt(data.ops[0].ID),
              Vurl: data.ops[0].Vurl,
              success: '成功'
            };
            var str = JSON.stringify(obj);
            res.end(str);
          }
        });
      }

    })
  }else if(req.query.action === 'update') {
    // /VueHandler/VideoHandler?action=update // 视频修改
    req.query.action = 'find';
    handler(req, res, 'videoList', {ID: parseInt(req.body.ID)}, function (data) {
      if (data.length === 0) {
        res.end('{"err": "抱歉，没有视频"}');
      } else {
        // data 是查询到的 已经上传的视频，如果修改了上传的路径，--》 相当于 删除之前上传的视频，在上传另外一个视频
        if(data[0].Vurl != req.body.Vurl) {
          // 判断我的文件路径被更新了
          fs.unlink(data[0].Vurl, function (err) {
            // 用 fs 模块删除文件   
            //   第一个参数-->文件的路径
            //   第二个参数-->回调函数
            if(err) return console.log(err);
          });
        }
        var selector = [
          {ID: parseInt(req.body.ID)},
          {$set: {
            Vname: req.body.Vname,
            Vtime: req.body.Vtime,
            Vurl: req.body.Vurl,
            upDateAt: new Date()
          }}
        ]
        req.query.action = 'update';
        handler(req, res, 'videoList', selector, function (da) {
          if(da.length === 0) {
            res.end('{"err": "抱歉，更新失败"}');
          }else {
            res.end('{"success": "更新成功！！！"}');
          }
        });

      }
    });
  }else if(req.query.action=='showlist'){  // 显示 + 查询
    // 使用的操作是 find 方法
    /*
    * searchText: GLOBAL.searchbox.down("#name").getValue(),
     pageStart: pageStart ? pageStart : 1
    * */
    var selector={}; // 防止查询条件的容器
    //如有模糊查询条件则以其为筛选器
    if(req.body.searchText){  // 代表 搜索框里输入的内容
      selector.Vname={$regex:'.*'+req.body.searchText+'.*'};
    }
    //查询videoList列表获得总数据条数
    handler(req, res, "videoList", null,function(arr){
      if(isNullObj(selector)){ // 如果 之前的 selector 里面没有收集到前端发送内容
        selector={ID:{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}};
        // 建议  --》  代数
      }
      //根据筛选器查询videoList获得结果集
      handler(req, res, "videoList",selector ,function(data){
        if(data.length==0){
          res.end('{"err":"系统中还没有视频"}');
        }else{
          var obj = {
            data:{
              pageSize:3,
              count:arr.length,
              list:data,
              pageStart:req.body.pageStart
            },
            success:"成功"
          }
          var str = JSON.stringify(obj);
          res.end(str);
        }
      });
    });
  }
});


router.get('/VideoHandler', function (req, res) {
  if(req.query.action === 'delete') {  // 视频的删除
    req.query.action='find';  // 定义了数据库的操作方式是查询
    //根据ID查询当前视频document获得当前视频的Vurl字段
    handler(req, res, "videoList",{ID:parseInt(req.query.ID)} ,function(data){
      // 前端 传过来的 ID
      if(data.length==0){
        res.end('{"err":"抱歉，系统中查不到该视频"}');
      }else{
          //删除系统中该视频文件（视频的文件被储存在服务器里面  二进制文件）
          fs.unlink(data[0].Vurl, function (err) {
            // 查询是为了 删除文件 提供路径
            if (err) return console.log(err);
          });
        // 文件删除了，接下来删除数据库里对应的数据
        req.query.action='delete';
        //删除数据库中与该视频对应的数据
        handler(req, res, "videoList",{ID:parseInt(req.query.ID)},function(data){
          if(data.result.n==0){
            res.end('{"err":"删除失败"}');
          }else{
            // 数据库里的数据已经被删除了
            req.query.action = 'find';
            //迭代处理其余视频文件的操作手柄-ID均减1
            handler(req, res, 'videoList', {ID: {$gt: parseIng(req.query.ID)}}, function (da) {
              recUpdateID
            });
            res.end('{"success":"删除成功"}');
          }
        });

      }
    });
  }
})

// 获取权限
// /VueHandler/CourseHandler?action=getpower
router.get('/CourseHandler', function (req, res) {
  // 登陆之后，  给别人开权限
  if(req.query.action === 'getpower') {  // 使用 fand --》 查询数据库的权限列表
    handler(req, res, 'powers', null, function (data) {
      if(data.length === 0) {
        var obj = {
          err: '获取权限错误',
          data: data
        }
        var str = JSON.stringify(obj);
        res.end(str);
      }else {
        var obj = {
          success: '成功',
          data: data
        }
        var str = JSON.stringify(obj);
        res.end(str);
      }
    });

  }else if(req.query.action === 'getcategory') {  // 课程权限查询
    // /VueHandler/CourseHandler?action=getcategory   
    handler(req, res, 'catalogList', null, function (data) {
      if(data.length === 0) {
        res.end('{"err": "恭喜！ 获取课程权限失败"}');
      }else {
        var obj = {
          data: data,
          success: '权限成功'
        }
        var str = JSON.stringify(obj);
        res.end(str);
      }
    });
  }
});



module.exports = router;