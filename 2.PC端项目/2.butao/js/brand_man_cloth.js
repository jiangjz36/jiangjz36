window.onload = function(){

    // 排序
    $(".pl_s_discount")[0].onclick = function(){
        fnChangeSort(this);
    }
    $(".pl_s_price")[0].onclick = function(){
        fnChangeSort(this);
    }


    // 翻页
    var aPage = $(".bmc_page_list")[0].children;
    for(var i=0;i<aPage.length;i++){
        aPage[i].onclick = function(){
            for(var j=0;j<aPage.length;j++){
                aPage[j].className = "";
            }
            this.className = "bmc_page_active";
        }
    }

    // AJAX
    // ajax
    var xhr = new XMLHttpRequest();
    var a = null;
    xhr.open('get',"http://hanz.vicp.io/data.json",true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200) {
            a = JSON.parse(xhr.responseText).data.resultValue.data;
            console.log(a);
            for(var i=0;i<a.length;i++){
                var cSec = document.createElement("div");
                cSec.className = "bmc_sec";
                str = a[i].chaoshiItemTitle;
                cSec.innerHTML = '<p><a href="#">'+str+'</a></p>'+
                                 '<div class="bmc_img_area"><a href="#"><img src="http:'+a[i].itemImg+'" alt=""></a></div>'+
                                 '<div class="bmc_price_area">'+
                                    '<span class="bmc_price"><sub>&yen;</sub>'+parseInt(a[i].itemMPrice)+'<span>'+a[i].itemMPrice.slice(-2)+'0</span>'+
                                    '</span><a class="bmc_btn" href="#"></a>'+
                                 '</div>'+
                                 '<span class="bmc_del_price">原价:<del>'+a[i].itemReservePrice+'</del></span>'+
                                 '<span class="bmc_discount">折扣：<i>'+Math.round((1-a[i].itemMPrice/a[i].itemReservePrice)*10)+'</i>折</span>';
                $(".bmc_container")[0].appendChild(cSec);
            }
        }
    }


}



// sort按钮
function fnChangeSort(obj){
    preventDefault(event);
    obj.className = obj.className + " pl_s_active";
    var oSpan = obj.children[0];
    if(oSpan.style.backgroundPosition == "0px -60px"){
        oSpan.style.backgroundPosition="0px -40px";
    }else{
        oSpan.style.backgroundPosition="0px -60px";
    }
}
