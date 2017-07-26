// 放大镜


$('.ca_area').hover(function() {
	$('.glass').show();
	$('.ci_magnifier').show();
	$(this).mousemove(function(e) {
		var disX = e.pageX - $('.ca_area').offset().left,
			disY = e.pageY - $('.ca_area').offset().top,
			subX = disX - $('.glass').outerWidth()/2,
			subY = disY - $('.glass').outerHeight()/2;
		if(subX < 0) {
			subX = 0;
		}
		if(subY < 0) {
			subY = 0;
		}
		if(subX > 174) {
			subX = 174;
		}
		if(subY > 174) {
			subY = 174;
		}
		$('.glass').css({
			left: subX,
			top: subY
		});
		var magImg = $('.ci_magnifier > img');
		magImg.css({
			left: -400/175*subX,
			top: -400/175*subY
		});
	});
},function() {
	$('.glass').hide();
	$('.ci_magnifier').hide();
});

$('.ca_img_list > img').hover(function() {
	$('.ca_img_list > img').removeClass('ca_active');
	$(this).addClass('ca_active');
	$('.cart_img').attr('src',$(this).attr('src'));
	$('.ci_magnifier img').attr('src',$(this).attr('src'));
});



// 商品数量加减
$('#cpd_btn_next').click(function() {
	var value = parseInt($(this).prev().val());
	value++;
	$(this).prev().val(value);
});
$('#cpd_btn_prev').click(function() {
	var value = parseInt($(this).next().val());
	value--;
	if(value<1) {
		value=1;
	}
	$(this).next().val(value);
});


// 商品详情和商品评价
