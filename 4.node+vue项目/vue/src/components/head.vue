<template>
	<div>
		<div class="header_wrap">
			<div class="logo_wrap"><a><img src="../../static/assets/back_logo.png" height="41" width="270" alt=""></a></div>
			<ul class="header_nav">
				<li><a><i class="icon icon-globe"></i>卓新志趣</a></li>
				<li><a><i class="icon icon-comment"></i>在线客服</a></li>
				<li><a><i class="icon icon-book"></i>常见问题</a></li>
				<li><a><i class="icon icon-lock"></i>安全中心</a></li>
				<li><a><i class="icon icon-signout"></i>退出</a></li>
				<li><img style="float: right;" src="../../static/assets/touxiang.jpg" height="50" width="50" alt=""><span class="name">小明</span></li>
			</ul>
		</div>
		<div class="nav_wrap" style="background: green;">
			<ul class="main_nav">
				<li ref="userParentBox" @mouseenter="userListShow();changeUserClassNow();"><a><i class="icon icon-user"></i>用户管理</a></li>
				<li ref="curseParentBox"><a><i class="icon icon-user"></i>课程管理</a></li>
			</ul>
			<div class="nav_content_wrap">
				<div class="nav_moveout"></div>
				<div ref="listId" class="nav_content">
					<!-- 鼠标移过去的浮窗 -->
					<div ref="userListId" class="one_nav_content_wrap">
						<ul class="one_nav_content">
							<li><a><i class="icon icon-user"></i>系统人员</a></li>
							<li><a><i class="icon icon-user"></i>学员管理</a></li>
						</ul>
					</div>
					<div ref="courseListId" class="one_nav_content_wrap">
						<ul class="one_nav_content">
							<li><a><i class="icon icon-user"></i>课程</a></li>
							<li><a><i class="icon icon-user"></i>课程</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'fcheader',
	data() {
		return {
			userClassNow: '',
			curseClassNow: ''
		}
	},
	mounted: function() {
		// 调整导航栏的覆盖层高度
		this.$refs.listId.style.height = window.innerHeight - 100 + 'px';
	},
	methods: {
		userListShow: function() {
			this.$refs.courseListId.style = 'display: none;'
			this.$refs.userListId.style = 'display: block;'
		},
		// changeUserClassNow: function() {
		// 	var ev = ev || window.event;
		// 	// if(!this.isMouseLeaveOrEnter(ev, this.$refs.userParentBox))
		// }
	}
}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	ul {
		list-style: none;
	}
    .header_wrap{
    	height:50px;
    	background:#222222;
    	font-size:12px;
    }
    .logo_wrap{
    	margin:4px 0 0 18px;
    	float:left;
    }
    .header_nav{
    	float:right;
    	color:#9d9d9d;
    }
    .header_nav li{
    	float:left;
    	line-height:50px;
    	padding:0 15px;
    }
    .header_nav li a:hover{
    	color:#fff;
    	cursor:pointer;
    }
     .header_nav li a{
            color:#9D9D9D;
            position:relative;
      }
    .header_nav li a .icon{
        top:0;
        border:none;
        left:-20px;
     }
    .header_nav i, .header_nav .name{
    	margin-right:6px;
    }

    .nav_wrap{
    	height:50px;
    	background:url(../../static/assets/images/white_opacity_bg.png);
    }
    /*导航*/
    .main_nav{
    	width:1100px;
    	margin:0 auto;
    	color:#fff;
    	line-height:50px;
    	height:50px;
    	font-size:14px;
    }
    .main_nav li{
    	float:left;
    	padding:0 30px;
    	position:relative;
    	cursor:pointer;
    }
    .main_nav i{
    	margin-right:8px;
    }
    .main_nav li a{
         color:#fff;
         position:relative;
    }
    .main_nav li a .icon{
         top:0;
         border:none;
         left:-20px;
    }
    .main_nav li a::before, .main_nav li a::after{
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        opacity: 0;
        border: 2px solid #fff;
        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.1s;
        -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.05, 1.29);
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.05, 1.29);
    }
    .main_nav li a::before{
        top:-14px;
        left:-50px;
        border-width: 2px 0 0 2px;
        -webkit-transform: translate3d(23px, 10px, 0);
        transform: translate3d(23px, 10px, 0);
    }

    .main_nav li a::after {
        right:-28px;
         bottom:-16px;
        border-width: 0 2px 2px 0;
        -webkit-transform: translate3d(-23px, -10px, 0);
        transform: translate3d(-23px, -10px, 0);
    }

    .main_nav .now a::after{
        opacity: 1;
    	opacity: 0\0;/* IE8 或 IE9*/
        -webkit-transform: translate3d(-15px, -5px, 0);
        transform: translate3d(-15px, -5px, 0);
    }
    .icon_add{

         font-family: FontAwesome;
          font-weight: normal;
          font-style: normal;
          text-decoration: inherit;
          display: inline;
          position:absolute;
          top:2px;
          left:0;
          width: auto;
          height: 12px !important;
          border-left:4px solid ;
          line-height: normal;
          vertical-align: baseline;
          background-image: none !important;
          background-position: 0% 0%;
          background-repeat: repeat;
    }
    .icon_plus_add:before{
        content: " ";
        position:absolute;
         width: 12px;
          border-top:4px solid;
          left:-8px;
          top:4px !important;
    }
    .main_nav .now{
    	_background-color:#263066;/*only for IE6*/
    	+background-color:#263066;/*only for IE7*/
    	background-color:#263066\0;/* IE8 或 IE9*/
    }
    .main_nav .now a::before{
        opacity: 1;
    	opacity: 0\0;/* IE8 或 IE9*/
        -webkit-transform: translate3d(15px, 5px, 0);
        transform: translate3d(15px, 5px, 0);
    }
    .nav_content_wrap{
    	position:relative;
    	height:0;
    	background:url(../../static/assets/images/black_opacity_bg.png);
    	z-index:999;

    }
  .nav_content_wrap_now{
        opacity: 1;
        position:relative;
        min-height:400px;
        background:url(../../static/assets/images/black_opacity_bg.png);
        z-index:999;

    }
    .nav_moveout{
    	position:absolute;
    	top:0;
    	left:0;
    	width:100%;
    	height:150px;
        display:none;
    }
    .nav_content{
        height:50px! important;
    }

    .one_nav_content_wrap{
        opacity:1;
    	margin:0 auto;
    	background:#fff;
    	position:absolute;
    	top:0;
    	left:0;
    	width:100%;
    	display:none;
    }
    .one_nav_content_wrap li a{
             position:relative;
             padding-left:20px;
     }
    .one_nav_content_wrap li{
                   color:#000;
    }
    .one_nav_content_wrap li:hover{
                  color:#fff;
    }
    .one_nav_content_wrap li a .icon{
             top:0;
             border:none;
             left:-15px;
    }
    .now.one_nav_content_wrap{
    	border-bottom:1px solid #fff;
    }
    .one_nav_content{
    	overflow:hidden;
    	padding:44px 0 36px 0;
    	width:1140px;
    	margin:0 auto;
    }
    .one_nav_content li{
    	float:left;
    	width:167px;
    	height:40px;
    	line-height:40px;
    	padding:0 40px;
    	position:relative;
    	cursor:pointer;
    	border:1px solid #ededed;
    	color:#69696d;
    	margin:0 34px 20px 0;
    	font-size:14px;
    }
    .one_nav_content i{
    	margin-right:8px;
    	color:#4c5c9c;
    }
    .one_nav_content li:hover{
    	background:#4c5c9c;
    	transition: all 0.5s ease 0s;
    }
    .one_nav_content li:hover, .one_nav_content li:hover i{
    	color:#fff;
    	transition: all 0.5s ease 0s;
    }

</style>