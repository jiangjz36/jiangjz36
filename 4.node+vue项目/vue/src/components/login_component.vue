<template>
	<div class="containner">
		<!-- 引入的  bgcavas  -->
	    <bgcavas></bgcavas>
	    <div class="login_wrap">
	      <img class="logo" src="../../static/assets/back_logo.png" alt="" />
	       <form>
	       	<!-- 包裹着 图标和 输入框 -->
	       <div class="oneinput_box">
	       <span class="icon"><i class="icon-user"></i></span>
	       <input ref='loginId_inp' type="text" placeholder="用户名" />	       
	       </div>
	       <div class="oneinput_box">
	       <span class="icon"><i class="icon-lock"></i></span>
	       <input ref='userPwd_pwd' type="text" placeholder="密码" />	       
	       </div>
	       <div class="oneinput_box">
	       <span class="icon"><i class="icon-lock"></i></span>
	       <input ref='validCode_vali' type="text" style="width: 310px;" placeholder="请输入验证码" />	       
	        <!--<span style="width:83px;">放置验证码的地方</span>-->
	        <vercavas ref='veriCodeId'></vercavas>
	       </div>
	       </form>
	       <button class="btn btn-info" @click='findPwd()' type="button">忘记密码</button>
	       <button type="button" class="btn btn-success" @click='login()'>登录</button>
	    
	    
	    </div>
	</div>
</template>

<script>
	// 组件要使用 引入 之后 注册
	import bgcavas from './bgCanvas.vue'
	import vercavas from'./verification.vue'  //验证码
	export default{
		name:'login',
		data(){
			return{
				msg:""
			}
		},
		mounted:function(){  // 页面加载 就会去执行的函数，逻辑，需求
			// autofocus
			// 就使 input 用户名  获取焦点   ref='' --> 标记   $refs 获取
			//  ref  $refs 配合使用  ==》 想要的 里面的属性
			this.$refs.loginId_inp.focus();
			var _this=this;
			document.onkeypress=function(e){
				if(e.keyCode==13){
				_this.login()	
				}
			};
			// setAttribute 设置 属性的
			document.body.setAttribute('style','background:red;')
		},
		destroyed:function(){ //销毁 
			document.body.setAttribute('style','background:;')
			
		},
		methods:{
			findPwd(){
				alert('此功能暂未开通')
			},
			login(){
				var _this=this;
				this.$reqs({  
					// 检查验证码输入正确
					method:'get',
					url:this.$store.state.url.BASEURL+this.$store.state.url.CHECKVERICODE+
		       '&veri='+this.$refs.validCode_vali.value
					 //  http://127.0.0.1:8000       /VueHandler/AdminLoginAndRegHandler?action="checkVerification&veri=我在验证码input框输入的值				
				}).then(function(response){
					if(response.data.success){
						// 放置的才是 前端输入的账号 密码 ==》 储存--》 发送给后台
					var loginId=_this.$refs.loginId_inp.value.trim(),	//.trim()去除空白
						userPwd=_this.$refs.userPwd_pwd.value.trim(),
						validCode=_this.$refs.validCode_vali.value.trim()
						console.log(userPwd)
						if(loginId&&userPwd&&validCode){
							_this.$reqs({
								method:'post',
								url:_this.$store.state.url.BASEURL+_this.$store.state.url.ADMINLOGIN,
								data:{
									userName:loginId,
									password:userPwd
								}
								
							}).then(function(res){
								if(res.data.success){
									// alert('登陆成功')
									window.location.href="/"
									// 如果登陆成功我会跳转 哪一个页面
								}else{
									alert('账号或密码不正确')
								}	
							})
							
						}else{
							alert('请填写完毕')
						}
						
					}else{
						// console.log(_this.$refs.veriCodeId);
						// 取得 验证码组件里面 所有属性和方法
						_this.$refs.veriCodeId.changVer();
						alert('验证码输入不正确')
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