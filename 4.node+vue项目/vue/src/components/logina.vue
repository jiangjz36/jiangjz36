<template>
	<div class="containner">
	    <bgcavas></bgcavas>
	    <div class="login_wrap">
	      <img class="logo" src="../../static/assets/back_logo.png" alt="" />
	       <form>

	       <div class="oneinput_box">
	       <span class="icon"><i class="icon-user"></i></span>
	       <input ref='logIn_inp' type="text" placeholder="用户名" />
	       </div>
         <div class="oneinput_box">
         <span class="icon"><i class="icon-lock"></i></span>
         <input ref='userPwd_pwd' type="text" placeholder="密码123" />
         </div>
         <div class="oneinput_box">
         <span class="icon"><i class="icon-lock"></i></span>
         <input ref='validCode_vali' type="text" style="width:310px;" placeholder="请输入验证码" />
         <!-- <span style="width:83px;">放置验证码的地方</span> -->
         <vercavas ref='veriCodeId'></vercavas>

         </div>
	       </form>
         <button @click="findPwd"class="btn btn-info" type="button" >忘记密码</button>
         <button class=" btn btn-success" type="button" @click="login()">登录</button>
	    
	    
	    </div>
	</div>
</template>

<script>
	import bgcavas from './bgCanvas.vue'
  import vercavas from './verification.vue'//这个组件是验证码
	export default{
		name:'login',
		data(){
			return{
				msg:""
			}
		},
    mounted:function(){//只要页面开始加载就会执行的一些逻辑，需求，函数，都会放在这个mounted钩子函数里面
      //autofocus也可以获得焦点
       //就是input里面的账号和用户名获取焦点   通过ref来标记 通过refs来获取  通过两者配合使用，可以得到想要的属性
       this.$refs.logIn_inp.focus();

       var _this=this;
       console.log(this.$refs.logIn_inp);
       document.onkeypress=function(e){
          if(e.keyCode==13){
            _this.login()
            alert('你按了回车')

          }
       };
       //setAttribute设置某些属性的
       document.body.setAttribute('style','background:red;')

    },
    destroyed:function(){//销毁
      document.body.setAttribute('style','background:red;')

    },
    methods:{
      findPwd(){
         alert("此功能暂未开通")
      },
      login(){

        var _this=this;
           
        this.$reqs({
          //检验验证码输入正确
          method:'get',
          url:'http://127.0.0.1:8000'+this.$store.state.url.CHECKVERICODE+'&veri='+this.$refs.validCode_vali.value
          //
        }).then(function(response){
        	console.log(_this.$refs.logIn_inp.value)
              if(response.data.success){
                //放置前端输入的账号密码  储存起来发送给后台进行验证
             
                var loginId=_this.$refs.logIn_inp.value.trim(),//去除空格
                    userPwd=_this.$refs.userPwd_pwd.value.trim(),
                    validCode=_this.$refs.validCode_vali.value.trim()
                    if(loginId&userPwd&validCode){
                       _this.$reqs({
                        method:'post',
                        url:'http://127.0.0.1:8000'+_this.$store.state.url.ADMINLOGIN,
                        data:{
                          userName:loginId,
                          password:userPwd
                        }
                       }).then(function(res){
                          if(res.data.success){
                            alert('登录成功')

                          }else{
                          alert('登录失败')

                          }
                       })

                    }else{ 
                      alert('请填写完毕')
                    }
                alert('验证码正确')
              }else{
                alert('验证码不正确')
              }
        })
      }
    },
		components:{bgcavas,vercavas}
	}
</script>
  <style>
    *{
    	margin: 0px;
    	padding: 0px;
    }  
    .containner{
        background: #0d1953;
        overflow: hidden;
        width:100%;
        height:100%;
    }
    .containner img {
      border: none;
    }

    .containner bgcavas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .login_wrap {
      width: 560px;
      height: 320px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -180px;
      margin-left: -280px;
      z-index: 3;
      color: #fff;
    }

    .login_wrap .logo {
      margin-left: 140px;
      margin-bottom: 29px;
    }

    .login_wrap input {
      background: #0d1953;
      width: 413px;
      height: 34px;
      line-height: 34px;
      border: 1px solid #3c498a;
      margin-left: 0px;
      padding-left:5px;
      color: #fff;
    }

    input:focus {
      outline: none;
    }

    .oneinput_box {
      position:relative;
      margin-bottom: 25px;
      overflow: hidden;
      width: 457px;
      padding-left: 10px;
    }

    .oneinput_box * {
      float: left;
    }

    .oneinput_box span {
      background: #0d1953;
      border: 1px solid #3c498a;
      padding: 11px 9px;
      border-right: none 0;
      height: 12px;
      width: 10px;
      padding-left: 10px;
      overflow: hidden;

    }

    .oneinput_box .icon {
      top:0;
      left:10px;
      font-size: 10px;
      width: 9px;
      height: 12px;
    }
    .oneinput_box .icon-lock {
          top:0;
          left:10px;
          font-size: 10px;
          width: 9px;
          height: 12px;
          z-index:1000000000;
        }
    .erwei_code {
      width: 91px;
      height: 34px;
      float: right;
      cursor: pointer;
    }

    .btn {
      width: 113px;
      height: 34px;
      line-height: 34px;
      border: none;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }

    .btn-info {
      background: #3cadcf;
      float: left;
    }

    .btn-info:hover {
      background: #1f8fb0;
    }

    .btn-success {
      background: #5cb85c;
      float: right;
    }

    .btn-success:hover {
      background: #449d44;
    }

  </style>
*{
	margin: 0;
	padding: 0;
}
.containner{
	width: 100%;
	height: 100%;
	overflow: hidden;
	background:#0d1953;
}
.containner img{
	border: none;
}
.containner bgcavas{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
}
.login_wrap{
	width: 560px;
	height: 320px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -180px;
	margin-left: -280px;
	z-index:3;
	color: #fff;
}
.login_wrap .logo{

    margin-left: 140px;
}
.login_wrap input {
	background:#0d1953 ;
	width: 413px;
	height: 34px;
	line-height: 34px;
	border: 1px solid #3c498a;
	color: #fff;
	padding-left: 4px;
}
input:focus{
	outline: none;
}
.oneinput_box {
	position: relative;
	margin-bottom: 25px;
	overflow: hidden;
	width: 457px;
	height: 40px;
	padding-left:10px;
}
.oneinput_box span{
	background: #0d1953;
	border: 1px solid #3C498A;
	width: 10px;
	height: 10px;
	padding: 11px 9px;
	/*border-right:none;*/
	padding-left: 10px;
	overflow: hidden;
}
.oneinput_box .icon{
	top: 0;
	left: 10px;
	font-size:10px;
	width:9px;
	height: 12px;
}


</style>