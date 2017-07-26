function $(str) {
	var type = str.substr(0,1);
	var obj = str.substr(1);
	if(type === "#") {
		return document.getElementById(obj);	
	}else if(type === ".") {
		return document.getElementsByClassName(obj)[0];
	}else {
		return document.getElementsByTagName(str)[0];
	}
	
}

// // 头部的分类跳转
// $('icon_drop_more').onclick = function() {
// 	location.href="#"
// }

// header
window.onscroll = function(ev) {
	scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	if(scrollTop == 0) {
		$('#header').style.background = "transparent";
	}else if(scrollTop > 0){
		$('#header').style.background = "#FABC09";
	}
}
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
if(scrollTop == 0) {
	$('#header').style.background = "transparent";
}else if(scrollTop > 0){
	$('#header').style.background = "#FABC09";
}


// 倒计时
var timer = setInterval(function() {
	var dateTime = new Date();
	var nowTime = new Date("6 20,2017 13:00:00");
	var time = nowTime - dateTime;
	
	var day = parseInt(time/24/60/60/1000);
	var hour = parseInt(time/60/60/1000%24);
	var minute = parseInt(time/60/1000%60);
	var seconds = parseInt(time/1000%60);

	if(time < 0) {
		clearInterval(timer);
		$('#grabHour').innerHTML = "00";
		$('#grabMinute').innerHTML = "00";
		$('#grabsecond').innerHTML = "00";
	}else {
		$('#grabHour').innerHTML = addZero(hour);
		$('#grabMinute').innerHTML = addZero(minute);
		$('#grabsecond').innerHTML = addZero(seconds);
	}
});

function addZero(time) {
	if(time < 10){
		return "0" + time;
	}else{
		return time;
	}
}