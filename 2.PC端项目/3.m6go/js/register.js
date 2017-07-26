$(function() {
    // alert(String.fromCharCode(57));
    // 49  57

    $('#verify_img').html(getVerify());
    $('#verify_img').click(function() {
        $('#verify_img').html(getVerify());
    });
    $('#verify_btn').click(function() {
        $('#verify_img').html(getVerify());
        return false;
    });


    // 注册用户验证
    $('.user_name').on({
        'keydown': function(ev) {
            // 当输入的数字是在中文状态下无法判断
            // console.log(ev.keyCode);
            // if((ev.keyCode<48 || ev.keyCode>57 && ev.keyCode<96 || ev.keyCode>105) && ev.keyCode!=8){
            //     $(this).keyup(function() {
            //         $(this).val('');
            //         $(this).off('keyup');
            //     });
            // }
            // 可以有效判断，但会有延迟
            if(isNaN($(this).val())){
                $(this).keyup(function() {
                    $(this).val('');
                    $(this).off('keyup');
                });
            }
        },
        'blur': function() {
            // 以对象的形式输入参数
            verifyForm({
                'obj': $(this),
                'err_txt': $('.err_un'),
                'reg':  /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/,
                'right': '可以使用',
                'err': '您输入的手机号码格式错误，请重新输入',
                'empty': '请输入手机号码'
            });
        }
    });
    // 注册密码验证
    $('.user_pass').on({
        'blur': function() {
            verifyForm({
                'obj': $(this),
                'err_txt': $('.err_up'),
                'reg':  /^\w{6,20}$/,
                'right': '',
                'err': '密码长度必须为6-20个字符',
                'empty': '请输入密码'
            });
        }
    });
    // 注册再次密码验证
    $('.user_pass_r').on({
        'blur': function() {
            verifyForm({
                'obj': $(this),
                'err_txt': $('.err_up_r'),
                'reg':  /^\w{6,20}$/,
                'right': '',
                'err': '两次输入的密码不一致，请重新输入',
                'empty': '请再次输入密码',
                'type': 'pass_r'
            });
        }
    });
    // 注册验证码验证
    $('.user_verify').on({
        'blur': function() {
            verifyForm({
                'obj': $(this),
                'err_txt': $('.err_rv'),
                'reg':  /^\d{4}$/,
                'right': '',
                'err': '验证码有误，请重新输入',
                'empty': '请输入验证码',
                'type': 'verify'
            });
        }
    });
    // 注册短信校验码验证
    $('.user_sms').on({
        'blur': function() {
            verifyForm({
                'obj': $(this),
                'err_txt': $('.err_sms'),
                'reg':  /^\d{4}$/,
                'right': '',
                'err': '您输入的短信校验码有误，请重新输入',
                'empty': '',
                'type': 'sms'
            });
        }
    });
    // 条款验证
    $('.terms > input').change(function() {
        console.log($('.terms > input').attr('checked'));
        if($('.terms > input').attr('checked') == 'checked') {
            $('.terms > input').removeAttr('checked');
            $('.user_submit').attr('disabled','true').css('background','#CCC');

        }else {
            $('.terms > input').attr('checked','true');
            $('.user_submit').removeAttr('disabled').css('background','#E83917');
        }
    });


    // 登录验证码验证
    $('.user_verify').on({
        'blur': function() {
            verifyForm({
                'obj': $(this),
                'err_txt': $('.err_lv'),
                'reg':  /^\d{4}$/,
                'right': '',
                'err': '验证码有误，请重新输入',
                'empty': '请输入验证码',
                'type': 'verify'
            });
        }
    });

})
/**
 * 生成验证码
 * @return string 验证码
 */
function getVerify() {
    var verify = '';
    for(var i=0;i<4;i++){
        var a = Math.floor(9*Math.random()+49);
        verify+='<i style="color:'+getRandomColor()+'">'+String.fromCharCode(a)+'</i>';
    }
    return verify;
}
/**
 * 生成随机颜色
 * @return string rgb颜色
 */
function getRandomColor() {
    return 'rgb('+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+','+Math.floor(255*Math.random())+')';
}

/**
 * 表单验证
 * @param  {object} para [其中包括事件对象/正则表达式/正确时的提示/错误时的提示/为空时的提示]
 */
function verifyForm(para) {
    var val = para.obj.val();
    var oErr = para.err_txt;
    if(val.length > 0) {
        if(para.reg.test(val)) {
            // 再次输入密码
            if(para.type == 'pass_r' && $('.user_pass').val().length>0){
                if($('.user_pass').val() == $('.user_pass_r').val()){
                    oErr.text(para.right);
                    return false;
                }else {
                    oErr.text(para.err);
                    return false;
                }
            }
            // 验证码
            if(para.type == 'verify'){
                console.log($('#verify_img').text());
                if(val == $('#verify_img').text()){
                    oErr.text(para.right);
                    return false;
                }else {
                    oErr.text(para.err);
                    return false;
                }
            }
            oErr.text(para.right);
            oErr.css('color','#009900');
        }else {
            oErr.text(para.err);
            oErr.css('color','#FF6B52');
        }

    }else {
        oErr.text(para.empty);
        oErr.css('color','#FF6B52');
    }
}


// 提交表单
$('.user_submit').click(function() {
    var txt1 = $('.user_name').val();
    var txt2 = $('.user_pass').val();
    var xhr = new XMLHttpRequest();
    xhr.open('POST','http://192.168.1.17:300','true');
    // HTTP协议的头文件
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var result = 'name='+txt1+'&content'+txt2;
    xhr.send(result);
});
