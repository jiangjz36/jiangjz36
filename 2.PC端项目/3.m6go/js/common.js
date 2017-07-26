// 头部可以关闭的广告
$('#head_top_banner span').click(function() {
    $(this).parent().hide();
});
// 我的麦乐购
$('#nt_ub_my').hover(function() {
    $(this).css({
        background: '#FFF',
        borderColor: '#CCC'
    }).find('ul').delay(200).slideDown(100);
},function() {
    $(this).find('ul').stop().delay(200).slideUp(100,'swing',function() {
        $('#nt_ub_my').css({
            background: 'transparent',
            borderColor: 'transparent'
        })
    });
});
// 手机麦乐购
$('#bt_ub_phone').hover(function() {
    $(this).css({
        background: '#FFF',
        borderColor: '#CCC'
    }).find('#phone_sub').stop().slideDown(200);
},function() {
    $(this).find('#phone_sub').stop().slideUp(200,function() {
        $('#bt_ub_phone').css({
            background: 'transparent',
            borderColor: 'transparent'
        });
    });
})


// 搜索框
$('#lb_text').focus(function() {
    $(this).val('');
});
$('#lb_text').blur(function() {
    $(this).val('发现全球好品牌~~');
});


// menu二级菜单
var aMenu = $("#nb_menu").find('.menu');
aMenu.hover(menuShow,menuHide);
function menuShow() {
    $(this).css('background','#A90000').find('i').stop().animate({marginLeft:'10px'},200).parent().next().show().animate({left:'180px',opacity:'0.9'},200);
}
function menuHide() {
    $(this).css('background','#CB3E25').find('i').stop().animate({marginLeft:'0px'},200).parent().next().hide().animate({left:'170px',opacity:'0.6'},200);
}
//二级菜单展开和关闭
$('.icon_down').hide();
if(nbMenuSwitch){
    var oUl = $('#nb_menu > ul');
    $('.icon_down').show();
    oUl.css('display','none');
    $('#nb_menu').hover(function(e) {
        if(e.target.tagName == 'DIV') {
            oUl.stop().slideDown();
            $('.icon_down').css('background-position','0 0');
        }
    },function(e) {
        if(e.target.tagName == 'DIV') {
            oUl.stop().slideUp();
            $('.icon_down').css('background-position','0 -10px');
        }
    });
}



// nav 菜单栏
var aNav = $('#nb_nav').find('span');
// var navLeft = [10,62,146,230,298,382,466,550];
$('#nb_underline').css({
    'width':aNav.eq(0).width(),
    'left':aNav.eq(0).find('a').offset().left-$('#nb_nav').offset().left
});
aNav.hover(function() {
    $('#nb_underline').stop().animate({
        width: $(this).width(),
        left: $(this).find('a').offset().left-$('#nb_nav').offset().left
    },400);
},function() {
    $('#nb_underline').stop().animate({
        width: aNav.eq(0).width(),
        left: aNav.eq(0).find('a').offset().left-$('#nb_nav').offset().left
    },400);
});
    // 文字动态
    setInterval(function() {
        var aB = $('#nb_nav').find('b');
        aB.stop();
        aB.eq(0).animate(
            {
                'bottom':'30px'
            },function() {
                aB.eq(0).css('bottom','-30px').animate({
                    'bottom':'0px'
                });
            }
        ).next().delay(200).animate(
            {
                'bottom':'30px'
            },function() {
                aB.eq(1).css('bottom','-30px').animate({
                    'bottom':'0px'
                });
            }
        ).next().delay(400).animate(
            {
                'bottom':'30px'
            },function() {
                aB.eq(2).css('bottom','-30px').animate({
                    'bottom':'0px'
                });
            }
        );
    },1300);

// 侧边栏用户点击
$('#icon_s_user').click(sidebarMove);
// 侧边栏购物车点击
$('#s_cart').click(sidebarMove);
$('.s_bl').click(function() {
    $('.s_bl').removeClass('s_active');;
    $('.s_bl:eq('+($(this).index()-1)+')').addClass('s_active');;
    $('.s_bl_content').fadeOut(500);
    $('.s_bl_content:eq('+($(this).index()-1)+')').fadeIn(500);
    if($(this).hasClass('s_active') && !$('#sidebar').hasClass('s_show')){
        $(".s_bl").removeClass('s_active');
    }
});
// 侧边栏客户经理和客服
$('#s_customer').hover(function() {
    $(this).find('.s_c_sub').stop().animate({'left': '-210px'});
},function() {
    $(this).find('.s_c_sub').stop().animate({'left': '35px'});
});
// 侧边栏我的收藏
$('#s_collection').hover(function() {
    $(this).find('.s_co_sub').stop().animate({'left': '-80px'});
},function() {
    $(this).find('.s_co_sub').stop().animate({'left': '35px'});
});
// 侧边栏浏览历史
$('#s_history').hover(function() {
    $(this).find('.s_h_sub').stop().animate({'left': '-80px'});
},function() {
    $(this).find('.s_h_sub').stop().animate({'left': '35px'});
});
// 二维码
$('#s_qr').hover(function() {
    $(this).find('.s_q_sub').stop().animate({'left': '-240px'});
},function() {
    $(this).find('.s_q_sub').stop().animate({'left': '35px'});
});
// 反馈
$('#s_feedback').hover(function() {
    $(this).find('.s_f_sub').stop().animate({'left': '-80px'});
},function() {
    $(this).find('.s_f_sub').stop().animate({'left': '35px'});
});
// 侧边栏
function sidebarMove() {
    if($('#sidebar').css('right') == '-280px'){
        $('#sidebar').animate({'right':0}).addClass('s_show');
    }else {
        if($(this).hasClass('s_active')){
            $('#sidebar').animate({'right':'-280px'}).removeClass('s_show');
        }
    }
}

// 验证码
$('#sbu_verify_txt').html(getVerify());
$('#sbu_verify_txt').click(function() {
    $('#sbu_verify_txt').html(getVerify());
});
$('#sbu_change').click(function() {
    $('#sbu_verify_txt').html(getVerify());
    return false;
});

/**
 * 生成验证码
 * @return string 验证码
 */
function getVerify() {
    var verify = '';
    for(var i=0;i<4;i++){
        var a = Math.floor(9*Math.random()+49);
        verify+='<i style="color:'+getRandomColor()+'">'+String.fromCharCode(a)+'</i>';
    }
    return verify;
}
/**
 * 生成随机颜色
 * @return string rgb颜色
 */
function getRandomColor() {
    return 'rgb('+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+')';
}
