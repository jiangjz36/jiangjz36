// 轮播图
$(function() {
    var aCarImg = $('#carousel').find('img');
    var aCarA = $('#sub_carousel').find('a');
    var arrColor = ['FEE6ED','FFEBED','FB7023','DAF0BF','D0FCF0'];
    var index = -1;
    aCarImg.eq(0).show();
    function move() {
        index++;
        if(index == 5) {
            index = 0;
        }
        $('.banner').css('background','#'+arrColor[index]);


        aCarImg.eq(index-1).hide().css({
            'width': '850.5px',
            'height': '504px',
            'margin-top': '-20.25px',
            'margin-left': '-12px'
        }).parent().next().children().eq(index-1).stop().animate({
            bottom: 0
        });
        aCarImg.eq(index).show().animate({
            'width': 810,
            'height': 480,
            'margin-top': 0,
            'margin-left': 0
        },2500,'linear').parent().next().children().eq(index).stop().animate({
            bottom: 10
        });
    }
    setInterval(move,3000);
})


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
setInterval(function() {
    var aa = getCountdown('5 20,2017 00:00:00');
    $("#hour_1").html(aa[1]);
    $("#hour_2").html(aa[2]);
    $("#minute_1").html(aa[3]);
    $("#minute_2").html(aa[4]);
    $("#second_1").html(aa[5]);
    $("#second_2").html(aa[6]);
    $("#millisecond").html(aa[7]);
},1);



// s1 轮播
var s1_index = 0;
var s1_pb = $('.s1_pb');
$('#s1_btn_next').click(s1BtnNext);
$('#s1_btn_prev').click(s1BtnPrev);
$('#bi_next').click(s1BtnNext);
$('#bi_prev').click(s1BtnPrev);
function s1BtnNext() {
    s1_pb.hide();
    s1_index++;
    if(s1_index == 8) {
        s1_index = 0;
    }
    s1_pb.eq(s1_index).show();
    $('#bi_ix').text(s1_index+1);
}
function s1BtnPrev() {
    s1_pb.hide();
    s1_index--;
    if(s1_index == -1) {
        s1_index = 7;
    }
    s1_pb.eq(s1_index).show();
    $('#bi_ix').text(s1_index+1);
}



// 天天特卖文字特效
var s3B = $('#s3_h2').find('b');
setInterval(function() {
    s3B.eq(0).stop().animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(50).animate({
        bottom: '   8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(100).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(150).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(200).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(250).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(300).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(350).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(400).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(450).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(500).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(550).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(600).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(650).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    }).next().stop().delay(700).animate({
        bottom: '8px'
    },200,function() {
        $(this).animate({
            bottom: '0'
        },100);
    })
},1800);


// 小倒计时
setInterval(function() {
    var t1 = getCountdown('5 20,2017 00:00:00');
    $('#s3_time_1').html(t1[0]+'天'+t1[1]+t1[2]+'小时'+t1[3]+t1[4]+'分'+t1[5]+t1[6]+'秒');
    var t2 = getCountdown('5 25,2017 00:00:00');
    $('#s3_time_2').html(t2[0]+'天'+t2[1]+t2[2]+'小时'+t2[3]+t2[4]+'分'+t2[5]+t2[6]+'秒');
    var t3 = getCountdown('5 26,2017 00:00:00');
    $('#s3_time_3').html(t3[0]+'天'+t3[1]+t3[2]+'小时'+t3[3]+t3[4]+'分'+t3[5]+t3[6]+'秒');
    var t4 = getCountdown('5 20,2017 00:00:00');
    $('#s3_time_4').html(t4[0]+'天'+t4[1]+t4[2]+'小时'+t4[3]+t4[4]+'分'+t4[5]+t4[6]+'秒');
    var t5 = getCountdown('5 22,2017 00:00:00');
    $('#s3_time_5').html(t5[0]+'天'+t5[1]+t5[2]+'小时'+t5[3]+t5[4]+'分'+t5[5]+t5[6]+'秒');
    var t6 = getCountdown('5 21,2017 00:00:00');
    $('#s3_time_6').html(t6[0]+'天'+t6[1]+t6[2]+'小时'+t6[3]+t6[4]+'分'+t6[5]+t6[6]+'秒');
    var t7 = getCountdown('5 24,2017 00:00:00');
    $('#s3_time_7').html(t7[0]+'天'+t7[1]+t7[2]+'小时'+t7[3]+t7[4]+'分'+t7[5]+t7[6]+'秒');
    var t8 = getCountdown('5 22,2017 00:00:00');
    $('#s3_time_8').html(t8[0]+'天'+t8[1]+t8[2]+'小时'+t8[3]+t8[4]+'分'+t8[5]+t8[6]+'秒');
    var t9 = getCountdown('5 21,2017 00:00:00');
    $('#s3_time_9').html(t9[0]+'天'+t9[1]+t9[2]+'小时'+t9[3]+t9[4]+'分'+t9[5]+t9[6]+'秒');
    var t10 = getCountdown('5 20,2017 00:00:00');
    $('#s3_time_10').html(t10[0]+'天'+t10[1]+t10[2]+'小时'+t10[3]+t10[4]+'分'+t10[5]+t10[6]+'秒');
    var t11 = getCountdown('5 22,2017 00:00:00');
    $('#s3_time_11').html(t11[0]+'天'+t11[1]+t11[2]+'小时'+t11[3]+t11[4]+'分'+t11[5]+t11[6]+'秒');
    var t12 = getCountdown('5 20,2017 00:00:00');
    $('#s3_time_12').html(t12[0]+'天'+t12[1]+t12[2]+'小时'+t12[3]+t12[4]+'分'+t12[5]+t12[6]+'秒');
},100);


// s3 图片放大
var s3Img = $('.s3_ps_img');
s3Img.hover(function() {
    $(this).find('img').animate({
        // 290,230
        width: '304.5px',
        height: '241.5px',
        left: '-7.25px',
        top: '-5.75px'
    },600);
},function() {
    $(this).find('img').animate({
        // 290,230
        width: '290px',
        height: '230px',
        left: '0px',
        top: '0px'
    },600);
});

// s4 轮播
var s4_index = 0;
var s4_pb = $('.s4_pb');
$('#s4_btn_next').click(s4BtnNext);
$('#s4_btn_prev').click(s4BtnPrev);
$('#b4_next').click(s4BtnNext);
$('#b4_prev').click(s4BtnPrev);
function s4BtnNext() {
    s4_pb.hide();
    s4_index++;
    if(s4_index == 10) {
        s4_index = 0;
    }
    s4_pb.eq(s4_index).show();
    $('#b4_ix').text(s4_index+1);
}
function s4BtnPrev() {
    s4_pb.hide();
    s4_index--;
    if(s4_index == -1) {
        s4_index = 9;
    }
    s4_pb.eq(s4_index).show();
    $('#b4_ix').text(s4_index+1);
}


// 楼层的轮播
var fBtnNext = $('.f_btn_next');
var fBtnPrev = $('.f_btn_prev');
var fTimer = null;
var fIndex = 1;
fBtnNext.click(function() {
    fBtnNextMove($('.f_carousel').find('ul'));
});
fBtnPrev.click(function() {
    fBtnPrevMove($('.f_carousel').find('ul'));
});
function fBtnNextMove(oUl) {
    clearInterval(timer);
    fIndex++;
    if(fIndex > 2){
        fIndex = 1;
        oUl.css('left','0');
    }
    oUl.stop().animate({
        left: -90*fIndex+'px'
    });
}
function fBtnPrevMove(oUl) {
    clearInterval(timer);
    fIndex--;
    if(fIndex < 0){
        fIndex = 1;
        oUl.css('left','-180px');
    }
    oUl.stop().animate({
        left: -90*fIndex+'px'
    });
}
clearInterval(fTimer);
fTimer = setInterval(function() {
    fBtnNextMove($('.f_carousel').find('ul'));
},2000);




// 楼层导航
$(window).scroll(function() {
    var scrTop = $(this).scrollTop();
    console.log(scrTop);
    if(scrTop > 3000) {
        $('#floor_nav').show().css('top',$(window).height()/3);
    }else {
        $('#floor_nav').hide();
    }
});

$('#floor_nav > a').click(function() {
    click_scroll($('.floor').eq($(this).index()));
    return false;
});
function click_scroll(obj){
    $('body,html').animate({
        scrollTop:obj.offset().top
    },800);
}


