window.onload = function(){
  function $(str){
    return document.getElementById(str);
  }

  // 下拉菜单
  // function menuDown(event,type){
  //   var e = event || window.event;
  //   e.target = e.target || e.srcElement;
  //   var target = e.target.nextElementSibling;
  //   if(target.nodeName != 'OL'){
  //     return false;
  //   }
  //   if(type == 1){
  //     console.log(target);
  //     target.style.display = "block";
  //     // 每个菜单项的鼠标事件
  //     target.onmouseover = function(){
  //       this.style.display = "block";
  //     };
  //     target.onmouseout = function(){
  //       this.style.display = "none";
  //     };
  //   }else {
  //     target.style.display = "none";
  //   }
  // }
  // $("nav").onmouseover = function(){
  //   menuDown(event,1);
  // };
  // $("nav").onmouseout = function(){
  //   menuDown(event,2);
  // };

  // 下拉菜单
  var aLi = $('nav').children;
  console.log(aLi);
  for(var i=0;i<aLi.length;i++){
    aLi[i].onmouseover = function(){
      this.childNodes[3].style.display = "block";
    };
    aLi[i].onmouseout = function(){
      this.childNodes[3].style.display = "none";
    };
  }






  // 获得banner_img中的所有图片的集合
  var aImg = $("banner_img").children;
  var imgIndex = 0;
  // 图片移动函数
  function move(){
    aImg[imgIndex].style.display = "none";
    imgIndex++;
    if(imgIndex == aImg.length){
      imgIndex = 0;
    }
    aImg[imgIndex].style.display = "block";
  }
  setInterval(move,2000);

};
