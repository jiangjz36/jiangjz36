// js选择器
if(!$){
    function $(str){
        var a = str.substr(0,1);
        var b = str.substr(1);
        if(a=="#"){
            return document.getElementById(b);
        }else if(a==".")
            return document.getElementsByClassName(b);
    }
}


// 阻止默认事件
function preventDefault(event){
    var e = event || window.event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
// 顶部下拉菜单
function dropDownMenu(){
    for(var i=0;i<3;i++){
        $('.i_drop')[i].index = i;
        $('.drop_content')[i].index = i;
        $('.i_drop')[i].onmouseover = function(){
            this.style.backgroundPosition = "0 -160px";
            $('.drop_content')[this.index].style.display = "block";
        };
        $('.i_drop')[i].onmouseout = function(){
            this.style.backgroundPosition = "5px 7px";
            $('.drop_content')[this.index].style.display = "none";
        };
    }
};
window.addEventListener('load',dropDownMenu,false);


window.onresize = function(){
    var resizeHeight = document.documentElement.clientHeight;
    $('.side_nav')[0].style.paddingTop = resizeHeight/3+"px";
};
