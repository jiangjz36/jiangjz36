


window.onload = function(){
    $('.ixc_02')[0].onclick = function(){
        click_scroll($('.ix_one')[0]);
    }
    $('.ixc_03')[0].onclick = function(){
        click_scroll($('.ix_two')[0]);
    }
    $('.ixc_04')[0].onclick = function(){
        click_scroll($('.ix_three')[0]);
    }
    $('.ixc_05')[0].onclick = function(){
        click_scroll($('.ix_four')[0]);
    }
    $('.ixc_06')[0].onclick = function(){
        click_scroll($('.ix_five')[0]);
    }
    $('.ixc_07')[0].onclick = function(){
        click_scroll($('.ix_sex')[0]);
    }
    $('.ixc_08')[0].onclick = function(){
        click_scroll($('.header')[0]);
    }


}
function click_scroll(obj){
    $('body,html').animate({
        scrollTop:obj.offsetTop
    },1000);
}
