import Vue from 'vue';
import Vuex from 'vuex'
// 告诉 vue “使用” vuex
Vue.use(Vuex);
const state = {
    // 应用启动时，count 置为0  公司服务器地址118.244.212.82:3000
    //http://111.204.101.90:1111
    url:{
        BASEURL:'http://127.0.0.1:8000',//服务器IP和端口
        ADMINLOGIN:'/VueHandler/AdminLoginAndRegHandler?action=login',//管理员登录接口
        RETURNADMIN:'/VueHandler/AdminHandler?action=returnuserinfo',//返回当前登录管理员信息接口
        GETVERICOD:'/VueHandler/AdminLoginAndRegHandler?action=verification',//获取验证码字符接口
        CHECKVERICODE:'/VueHandler/AdminLoginAndRegHandler?action=checkVerification',//校验验证码接口
        ADMINLOGIN:'/VueHandler/AdminLoginAndRegHandler?action=login',//管理员登录接口
        UPDATEPASSWORD:'/VueHandler/AdminHandler?action=updatepass',//安全中心更改密码接口
        EXITSYS:'/VueHandler/AdminHandler?action=quit',//退出系统接口
        GETPOWERS:'/VueHandler/CourseHandler?action=getpower' ,//获取权限
        GETADMINLIST:'/VueHandler/AdminHandler?action=show',//获取管理员列表数据段
        ADDADMINSTOR:'/VueHandler/AdminLoginAndRegHandler?action=add',//添加管理员接口
        UPDATAADMINSTOR:'/VueHandler/AdminHandler?action=update',//更改管理员信息
        DELETEADMINSTOR:'/VueHandler/AdminHandler?action=delete',//删除管理员
    },
    updateElement:{
        safeAlertContent:{}
    }
}

const mutations = {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    //为AlertValue添加新的监控对象
    AlertValueAdd:function(state,atr,value){
        state.AlertValue[atr]=value;
    },
    //改变safeAlertValue的值
    safeAlertChangeValue:function (state,atr,value) {
            state.AlertValue[safeAlertValue][atr]=value;
    },
    change:function(state,value){
        console.log(value);
        state.AlertValue.defaultStr=value;
    }
}
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
})