<template>
	<div class="container">
		<bgcanvas></bgcanvas>
		<div class="login_wrap">
			<img class="logo" src="../../static/assets/back_logo.png" height="41" width="270" alt="">
			<form action="#">
				<div class="oneinput_box">
					<span class="icon"><i class="icon-user"></i></span>
					<input ref="loginId_inp" type="text" placeholder="用户名">
				</div>
				<div class="oneinput_box">
					<span class="icon"><i class="icon-lock"></i></span>
					<input ref="userPwd_pwd" type="text" placeholder="密码">
				</div>
				<div class="oneinput_box">
					<span class="icon"><i class="icon-lock"></i></span>
					<input ref="validCode_vali" style="width: 310px;" type="text" placeholder="请输入验证码">
					<vercanvas ref="veriCodeId"></vercanvas>
				</div>
				<button type="button" class="btn btn-info" @click="findPwd">忘记密码</button>
				<button type="button" class="btn btn-success" @click="login">登陆</button>
			</form>
		</div>
	</div>
</template>
<script>
import bgcanvas from './bgCanvas'
import vercanvas from './verification'  // 验证码
export default {
	// name: 'login',
	data() {
		return {

		}
	},
	methods: {
		findPwd() {
			alert('此功能暂未开通');
		},
		login() {
			var _this = this;
			this.$reqs({
				// 检验验证码 输入是否正确
				method: 'get',
				url: this.$store.state.url.BASEURL+this.$store.state.url.CHECKVERICODE+'&veri='+this.$refs.validCode_vali.value
			}).then(function(response) {
				console.log(response.data);
				if(response.data.success) {
					var loginId = _this.$refs.loginId_inp.value.trim();
					var userPwd = _this.$refs.userPwd_pwd.value.trim();
					var validCode = _this.$refs.validCode_vali.value.trim();

					if(loginId && userPwd && validCode) {
						_this.$reqs({
							method: 'post',
							url: _this.$store.state.url.BASEURL + _this.$store.state.url.ADMINLOGIN,
							data: {
								userName: loginId,
								password: userPwd
							}
						}).then(function(res) {
							if(res.data.success) {
								alert('登录成功');
							}else {
								alert('登录不成功');
							}
							
						})
					}else {
						alert('请填写完毕');
					}
				}else {
					alert('验证码输入不正确');
				}
			})
		}
	},
	mounted() {  // 页面加载 就会执行 的一些逻辑、函数
		// 使 input 用户名 获取焦点
		this.$refs.loginId_inp.focus();
		var _this = this;
		document.onkeypress = function(e) {
			if(e.keyCode === 13) {
				_this.login();
			}
		}
		// 设置 属性
		document.body.setAttribute('style', 'background: red;');
	},
	destroyed: function() { // 销毁
		document.body.setAttribute('style', 'background: ;');
	},
	components: {bgcanvas, vercanvas}
}
</script>
<style>
	*{
		margin: 0px;
		padding: 0px;
	} 
	.container{
		background: #0d1953;
		overflow: hidden;
		width:100%;
		height:100%;
	}
	.container img {
		border: none;
	}

	.container bgcanvas {
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