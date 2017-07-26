window.addEventListener('load',aaa,false);

function aaa(){
    // 倒计时效果
    var date = new Date("7 1,2017 11:20:00");
    var target = date.getTime();
    console.log(target);
    setInterval(function(){
        var time = fnReturnCountdown(target);
        $(".ce_cd_day")[0].innerHTML = time[0];//天
        $(".ce_cd_hour")[0].innerHTML = time[1];//小时
        $(".ce_cd_minute")[0].innerHTML = time[2];//分钟
        $(".ce_cd_second")[0].innerHTML = time[3];//秒
    },1);

    // tab选项卡
    var aDbBtn = $('.ce_db_btn');
    var aDbContent = $('.ce_db_content');
    for(var i=0;i<aDbBtn.length;i++){
        aDbBtn[i].index = i;
        aDbBtn[i].onclick = function(event){
            preventDefault(event);
            for(var j=0;j<aDbBtn.length;j++){
                aDbBtn[j].className="ce_db_btn";
                aDbContent[j].style.display = "none";
            }
            this.className = "ce_db_btn ce_db_active";
            aDbContent[this.index].style.display = "block";
        }
    }

    // 放大镜
    // 触发放大镜效果的开关
    var marked_switch = false;

    $('.ce_head_img')[0].onmouseover = function(){
        marked_switch = true;
    }
    $('.ce_head_img')[0].onmousemove = function(event){
        if(marked_switch == false){
            return false;
        }
        $('.ce_head_marked')[0].style.display = "block";
        $('.ce_head_magnifier')[0].style.display = "block";
        var e = event || window.event;
        // 图片的宽高
        var markedWidth = $('.ce_head_marked')[0].clientWidth;
        var markedHeight = $('.ce_head_marked')[0].clientHeight;
        // 获取镜片的位置
        var subX = e.pageX - this.offsetLeft - markedWidth/2;
        var subY = e.pageY - this.offsetTop - markedHeight/2;
        // 限定镜片的位置
        subX = subX < 0 ? 0 : subX;
        subY = subY < 0 ? 0 : subY;
        subX = subX > this.clientWidth-markedWidth ? this.clientWidth-markedWidth : subX;
        subY = subY > this.clientHeight-markedHeight ? this.clientHeight-markedHeight : subY;
        // 设置镜片的位置
        $('.ce_head_marked')[0].style.left = subX + 'px';
        $('.ce_head_marked')[0].style.top = subY + 'px';
        // 设置放大镜图片的位置
        $('.ce_head_magnifier')[0].style.backgroundPosition = (-subX*4)+'px ' + (-subY*4)+'px';

    }
    $('.ce_head_img')[0].onmouseout = function(){
        marked_switch = false;
        $('.ce_head_marked')[0].style.display = "none";
        $('.ce_head_magnifier')[0].style.display = "none";
    }
};

var fnReturnCountdown = function(iTarget){
    var nowTime = new Date().getTime();
    var t = (iTarget - nowTime) / 1000;
    var d = Math.floor(t/3600/24);
    var h = Math.floor((t-d*24*60*60)/3600);
    var m = Math.floor((t-d*24*60*60-h*3600)/60);
    var s = (t%60);
    s = s.toFixed(1);
    var time = [d,h,m,s];
    return time;
};
