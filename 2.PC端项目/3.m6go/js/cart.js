
// 使用Ajax获取sessionStorage中的购物车商品
var result = JSON.parse(sessionStorage.getItem('buyMall'));
console.log(result);
var oBody = document.getElementById('ss_body');
for(var i=0;i<result.length;i++) {
    var oDiv = document.createElement('div');
    oDiv.className='sb_sec clear_float';
    oDiv.innerHTML = '<div class="ss_delivery">'+
                        '<input checked="checked" class="ss_select" type="checkbox">'+
                        '<img src="'+result[i].imageurl+'" alt="">'+
                        '<a href="#">'+result[i].wname+'</a>'+
                    '</div>'+
                    '<div class="ss_price">￥'+result[i].jdPrice+'</div>'+
                    '<div class="ss_count">'+
                        '<div class="ss_btn">'+
                            '<button class="ss_b_prev">-</button>'+
                            '<input class="ss_b_txt" type="text" value="'+result[i].buyCount+'">'+
                            '<button class="ss_b_next">+</button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="ss_total">￥'+(result[i].jdPrice*result[i].buyCount).toFixed(2)+'</div>'+
                    '<div class="ss_action"><a href="#">删除</a></div>';
    oBody.appendChild(oDiv);


}
// 商品数量
$('#tb_count').text(result.length);
// 商品总计
getAllTotal();
function getAllTotal() {
    var total = 0;
    for(var i=0;i<result.length;i++){
        total += result[i].buyCount * result[i].jdPrice;
    }
    $('#tb_total').text(total.toFixed(2));
}


// 全选按钮
var allSelected = $('.sh_delivery input,.settement_bar input');
// 商品的选择框
var shopSelected = $('.ss_delivery input');
// 商品的选择按钮
allSelected.click(function() {
    if($(this).attr('checked') != 'checked') {
        allSelected.attr('checked',true);
        shopSelected.attr('checked',true);
    }else {
        allSelected.attr('checked',false);
        shopSelected.attr('checked',false);
    }
});
shopSelected.click(function() {
    if($(this).attr('checked') == 'checked') {
        $(this).attr('checked',false);
    }else {
        $(this).attr('checked',true)
    }

    var count = 0;
    for(var i=0;i<shopSelected.length;i++) {
        if(shopSelected.eq(i).attr('checked') == 'checked') {
            count++;
        }
    }
    if(count < shopSelected.length) {
        allSelected.attr('checked',false);
    }else {
        allSelected.attr('checked',true);
    }
});


// 数量加1

$('.ss_b_next').click(function() {
    var index = $(this).parents('.sb_sec').index(),
        oTxt = $('.ss_b_txt').eq(index),
        count = parseInt(oTxt.val());
    
    // 商品数量加1
    count++;
    oTxt.val(count);

    
    // session中数量
    result[index].buyCount = count;
    sessionStorage.setItem('buyMall',JSON.stringify(result));
    // 商品价格相应改变
    var total = (result[index].jdPrice * result[index].buyCount).toFixed(2);
    $('.ss_total').eq(index).text('￥'+total);
    
    // 合计数
    getAllTotal();



    return false;
});
$('.ss_b_prev').click(function() {
    var oParent = $(this).parents('.sb_sec'),
        index = oParent.index(),
        oTxt = $('.ss_b_txt').eq(index),
        count = parseInt(oTxt.val());
    
    // 当商品数量小于1时，提示是否删除该商品
    if(count < 2) {
        count = 1;
       
        var r = confirm('你确定不购买该商品吗？');
        if(r) {
            oParent.remove();
            // session中删除该商品
            result.splice(index,1);
            sessionStorage.setItem('buyMall',JSON.stringify(result));
        }else {
            // reutrn false;
        }

    }else {
        // 商品数量减1
        count--;

        oTxt.val(count);

        // session中数量相应加1
        result[index].buyCount = count;
        sessionStorage.setItem('buyMall',JSON.stringify(result));
        // 商品价格相应改变
        var total = (result[index].jdPrice * count).toFixed(2);
        $('.ss_total').eq(index).text('￥'+total);
        
    }
    // 合计数
    getAllTotal();
    return false;
});

// 删除商品
var oDel = $('.ss_action a');
oDel.click(function() {
    var oParent = $(this).parents('.sb_sec'),
        index = oParent.index();
    var r = confirm('你确定不购买该商品吗？');
    if(r) {
        oParent.remove();
        // session中删除该商品
        result.splice(index,1);
        sessionStorage.setItem('buyMall',JSON.stringify(result));
    }

});
