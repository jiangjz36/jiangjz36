window.onload = function(){
  var aClass = document.getElementsByClassName("classify_list")[0].getElementsByTagName("li");
  var aSlideLi = document.getElementsByClassName("m-slide")[0].getElementsByTagName("li");
  var aSlideNav = document.getElementsByClassName("m-slide")[0].getElementsByTagName("span");


  for(var i=0;i<aClass.length-1;i++){ //应用在全部商品分类中的
    var oClass = document.getElementById("classify");
    var oMask = document.getElementById("n-mask");
    var aLi = oClass.getElementsByTagName("li");
    aClass[i].index = i;
    aClass[i].onmouseover = function(){
      oMask.style.top = 40+ 71*this.index + "px";

      for(var i=0;i<aLi.length;i++){
        aLi[i].style.display = "none";
      }
      aLi[this.index].style.display = "block";

      classBlink();
    }
    aClass[i].onmouseout = oClass.onmouseover = oClass.onmouseout = oMask.onmouseover = oMask.onmouseout = function()
    {
      classBlink();
    }
  }

  // /*轮播图*/
  var slideIndex = 0;
  var slideTimer = null;
  for(var i=0;i<aSlideNav.length;i++){
    aSlideNav[i].index = i;
    aSlideNav[i].onmouseover = function(){
      clearInterval(slideTimer);
      for(var i=0;i<aSlideLi.length;i++){
        aSlideLi[i].style.opacity = "0";
        aSlideNav[i].className = "";
      }
      slideIndex = this.index;
      var iElement = aSlideLi[this.index];
      startOpacity(iElement,0,100);
      aSlideNav[this.index].className="active";
      slideMove();
    }
  }
  slideMove();


  function classBlink(){ //商品分类列表
    var oClass = document.getElementById("classify");

    if(oClass.className == "classify_hide"){
      oClass.className = "classify_show";
    }else{
      oClass.className = "classify_hide";
    }
  }

  var timer = null; //初始化定时器
  /**
   * 更改元素对象透明度
   * @param  {[object]} iElement [元素对象,一般为this]
   * @param  {[number]} iOpacity [初始透明度,0~100]
   * @param  {[number]} iTarget  [目标透明度,0~100]
   */
  function startOpacity(iElement, iOpacity, iTarget){
    clearInterval(timer);
    var speed = 0;

    timer = setInterval(function(){
      if(iOpacity == iTarget){
        clearInterval(timer);
      }else{
        if(iOpacity < iTarget){
          speed = (iTarget - iOpacity) / 15;
        }else{
          speed = (iTarget - iOpacity) / 15;
        }
        iOpacity += speed;
        iElement.style.opacity = iOpacity/100;
      }
    }, 30);
  }

    /*轮播图*/
  function slideMove(){

    slideTimer = setInterval(function(){
      slideIndex++;
      for(var i=0;i<aSlideLi.length;i++){
        aSlideLi[i].index = i;
        aSlideLi[i].style.opacity = "0";
        aSlideNav[i].className = "";
      }
      if(slideIndex == aSlideLi.length){
        slideIndex = 0;
        iElement = aSlideLi[0];
      }else{
        iElement = aSlideLi[slideIndex];
      }
      startOpacity(iElement, 0, 100);
      aSlideNav[iElement.index].className = "active";
    }, 3000);
  }
}
