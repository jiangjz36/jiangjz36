window.onload = function(){
    // 数量加减

    var aTr = $(".ct_tr");
    for(var i=0;i<aTr.length;i++){
        $(".ct_plus")[i].onmousedown = function(){
            var btnLess = this.parentNode.children[0];
            var btnCount = this.parentNode.children[1];

            // 当手动输入负值时，将值变为0
            if(btnCount.value < 1){
                btnCount.value = 0;
            }else{
                // 使得减号按钮可点击
                btnLess.disabled = "";
            }

            btnCount.value = parseInt(btnCount.value) + 1;
        }

        $(".ct_less")[i].onmousedown = function(){
            var btnPlus = this.parentNode.children[2];
            var btnCount = this.parentNode.children[1];

            // 当文本中的值小于等于1时，减号按钮不可操作
            if(parseInt(btnCount.value) <= 1){
                this.disabled = "disabled";
            }else{
                btnCount.value = parseInt(btnCount.value) - 1;
            }

        }
    }


    // 删除按钮事件
    for(var i=0;i<aTr.length;i++){
        $(".ct_tg_del")[i].onclick = function(event){
            // 阻止默认事件
            preventDefault(event);
            var conf = confirm("您确定要删除吗？");
            if(conf == true) {
                var oTbody = this.parentNode.parentNode.parentNode;
                var oTr = this.parentNode.parentNode;
                oTbody.removeChild(oTr);
            }

        }
    }
}
