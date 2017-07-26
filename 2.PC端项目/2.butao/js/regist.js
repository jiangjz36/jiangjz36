window.onload = function(){
    // 表单验证
    // ---------
    // 验证邮箱
    var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var emailErrTxt = ["请输入邮箱","您输入的邮箱有误"];
    // 验证用户名
    var userReg = /^[A-Za-z0-9_\-\u4e00-\u9fa5]{4,16}$/;
    var userErrTxt = ["请输入手机号码","用户名为4-16个字符"];
    // 验证密码
    var passwordReg = /^[A-Za-z0-9_-]{6,20}$/;
    var passwordErrTxt = ["请先输入密码","密码长度为6个以上"];

    $('#rt_email').onblur = function(){
        formReg(this,emailReg,emailErrTxt);
    };
    $('#rt_user_name').onblur = function(){
        formReg(this,userReg,userErrTxt);
    };
    $('#rt_password1').onblur = function(){
        formReg(this,passwordReg,passwordErrTxt);
    };
    $('#rt_password2').onblur = function(){
        var oErrorTxt = this.parentNode.getElementsByClassName('rt_error')[0];
        var oIcon = this.parentNode.getElementsByClassName('rt_icon')[0];
        if($('#rt_password1').value != $('#rt_password2').value){
            oErrorTxt.innerHTML = "请确认两次密码是否相同";
            oIcon.style.display = "block";
            oIcon.style.backgroundPosition = "0 -230px";
            return false;
        }
        formReg(this,passwordReg,passwordErrTxt);

    };

    // 按钮跳转
    $('.rt_login')[0].onclick = function(){
        window.location = "login.html";
    };




    /**
     * 表单验证方法
     * @param  {obj} obj 事件对象
     * @param  {RegExt对象} reg 验证表单是否正确
     */
    function formReg(obj,reg,errTxt){
        var oVal = obj.value;
        var oErrorTxt = obj.parentNode.getElementsByClassName('rt_error')[0];
        var oIcon = obj.parentNode.getElementsByClassName('rt_icon')[0];

        oIcon.style.display = "block";
        if(obj.value.length === 0){
            oErrorTxt.innerHTML = errTxt[0];
            return false;
        }
        if(reg.test(oVal)){
            oIcon.style.backgroundPosition = "0 -190px";
            oErrorTxt.innerHTML = "";
        }else{
            oErrorTxt.innerHTML = errTxt[1];
        }
    }
};
