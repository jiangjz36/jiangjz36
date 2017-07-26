$(function() {;
    $('.history_nav > a:last').removeAttr('href');
})

// 左侧商品分类的子类展开和关闭
var oLcSwitch = $('.lc_switch');
oLcSwitch.click(function() {
	var oLcP = $('.lc_p');
	if($(this).text() == '+') {
		$(this).text('-').parent().css('border-bottom-width','1px');
	}else {
		$(this).text('+').parent().css('border-bottom-width','2px');
	}
	$(this).parent().next().toggle();
});


// ajax显示商品列表
$.ajax({
	type: 'get',
	url: 'http://120.27.25.57/data/jd.json',
	async: true,
	success: function(data) {
        result = data.value.wareList.wareList;
        var oCartList = document.getElementById('l_cart_list');;

		for(var i=0;i<result.length;i++) {
            var oDiv = document.createElement('div');
            oDiv.className = 'l_cl_sec';
			var oContent = '<a href="#"><img class="l_cls_img" src="'+result[i].imageurl+'" alt=""></a>'+
                    	'<p class="l_cls_price">'+
                        '<span class="lcp_price">￥'+result[i].jdPrice+'</span>'+
                            '<i class="icon_l_divide"></i>'+
                            '<span class="lcp_unit_price">单价：￥'+result[i].jdPrice+'</span>'+
                        '</p>'+
                        '<a href="#" class="l_cls_name">'+
                            '<span class="lcn_name">'+result[i].wname+'</span>'+
                        '</a>'+
                        '<div class="l_cls_btn">'+
                            '<a href="#" class="l_cb_sales">销量 '+result[i].cid1+'</a>'+
                            '<a href="#" class="l_cb_assess">评价 '+result[i].cid2+'</a>'+
                        '</div>'+
                        '<div class="l_cls_btn1">'+
                            '<button href="#" class="lcb_add_shop_cart" onclick="fnAddShopCart(result['+i+'])">加入购物车</button>'+
                            '<a href="#" class="lcb_collection"><i class="icon_collection"></i>收藏</a>'+
                        '</div>';
            oDiv.innerHTML = oContent;
            oCartList.appendChild(oDiv);
		}
		// 收藏 按钮
		var oLcbCollection = $('.lcb_collection');
		oLcbCollection.click(fnLcbCollection);

		// 加入购物车按钮,弹出确认框
		var addShopCart = $('.lcb_add_shop_cart');
        addShopCart.click(fnShopPopupBox);


	}
});
// 商品筛选 按钮
fnFilterBtn();
function fnFilterBtn() {
	var aLFSec = $('.l_fc_sec');
	var filter = [];
	for(var i=0;i<aLFSec.length;i++) {
		filter.push(aLFSec.eq(i).find('a'));
	}
	filter[0].click(function() {
		filter[0].removeClass('l_fcs_active');
		$(this).addClass('l_fcs_active');
		return false;
	});
	filter[1].click(function() {
		filter[1].removeClass('l_fcs_active');
		$(this).addClass('l_fcs_active');
		return false;
	});
	filter[2].click(function() {
		filter[2].removeClass('l_fcs_active');
		$(this).addClass('l_fcs_active');
		return false;
	});
	filter[3].click(function() {
		filter[3].removeClass('l_fcs_active');
		$(this).addClass('l_fcs_active');
		return false;
	});
}
// 综合销量价格等排序
$('.ls_btn').click(function() {
	$('.ls_btn').removeClass('lsb_active');
	$(this).addClass('lsb_active');
});
// 收藏 按钮

function fnLcbCollection() {
	if($(this).attr('data-collection') != 'true'){
		$(this).attr('data-collection','true').find('.icon_collection').css('background-position','0px -42px');
		alert('收藏成功!');
	}else {
		alert('已收藏!');
	}
	return false;
};

// 加入购物车按钮,弹出确认框
function fnShopPopupBox() {
	var win = $(window);
	var addSuccWin = $('#add_success');
	$('#add_success').css({
		'display': 'block',
		'left': (win.width()-addSuccWin.outerWidth())/2,
		'top': (win.height()-addSuccWin.outerHeight())/2
	});
	win.on('scroll resize',function() {
		$('#add_success').css({
			'left': (win.width()-addSuccWin.outerWidth())/2,
			'top': (win.height()-addSuccWin.outerHeight())/2
		});
	});
};
// 点击加入购物车按钮，添加到购物车
// 添加的商品总数(计算重复的商品)
var allShopCount = 0;
// 添加的商品的数组
var shopCartArr = [];
function fnAddShopCart(data) {
    // 总数加1
    allShopCount++;
    // 商品种类（不计算每个商品的件数）
    var count = 0;
    for(var i=0;i<shopCartArr.length;i++) {
        if(data.wareId != shopCartArr[i].wareId) {
            count++;
        }else {
            data.buyCount++;
        }
    }
    if(count == shopCartArr.length) {
        // 初始化第一个商品的件数为1，并推入数组当中
        data.buyCount = 1;
        shopCartArr.push(data);
    }
    sessionStorage.setItem('buyMall',JSON.stringify(shopCartArr));
}
// 商品结算，跳转购物车页面
var oSettlementBtn = $('#as_settlement');
oSettlementBtn.click(function() {
    window.location = "cart.html";
});
// 关闭添加成功的弹窗
$('#as_close,#as_carry_on').click(function() {
	$('#add_success').css('display','none');
	$(window).off('scroll resize');
	return false;
});
