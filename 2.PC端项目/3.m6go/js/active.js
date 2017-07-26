// ajax显示商品列表
$.ajax({
	type: 'get',
	url: 'http://120.27.25.57/data/jd.json',
	async: true,
	success: function(data) {
        result = data.value.wareList.wareList;
        var oCartList = document.getElementsByClassName('selling')[0];
		for(var i=0;i<result.length;i++) {
            var oDiv = document.createElement('div');
            oDiv.className = 'sel_sec';
			var oContent = '<div class="sel_sec_img">'+
                                '<img src="'+result[i].imageurl+'" alt="">'+
                            '</div>'+
                            '<p>'+result[i].wname+'<span><b>6.7</b>折起</span></p>'+
                            '<span class="countdown"><i class="icon_time"></i>剩余2天22小时09分47秒</span>';
            oDiv.innerHTML = oContent;
            oCartList.appendChild(oDiv);
		}
        
	}
});


// 倒计时
function getCountdown(countdown) {
    var nowTime = new Date();
        targetTime = new Date(countdown),
        timer = targetTime - nowTime,
        day = parseInt(timer/24/60/60/1000);
        h = parseInt(timer/60/60/1000%24),
        m = parseInt(timer/60/1000%60),
        s = parseInt(timer/1000%60),
        ms = parseInt(timer%1000/100);
    var h1=h2=m1=m2=s1=s2=0;
        if(timer < 1) {
            ms = 0;
            arr = [day,h1,h2,m1,m2,s1,s2,ms];
            return arr;
        }
        if(h < 10) {
            h1 = 0;
            h2 = h;
        }else {
            h1 = parseInt(h/10);
            h2 = h%10;
        }
        if(m < 10) {
            m1 = 0;
            m2 = m;
        }else {
            m1 = parseInt(m/10);
            m2 = m%10;
        }
        if(s < 10) {
            s1 = 0;
            s2 = s;
        }else {
            s1 = parseInt(s/10);
            s2 = s%10;
        }
        arr = [day,h1,h2,m1,m2,s1,s2,ms];
    return arr;
}


setInterval(function(){
    var t1 = getCountdown('5 20,2017 00:00:00');
    $('.countdown').html('<i class="icon_time"></i>剩余'+t1[0]+'天'+t1[1]+t1[2]+'小时'+t1[3]+t1[4]+'分'+t1[5]+t1[6]+'秒');
},1000);


    