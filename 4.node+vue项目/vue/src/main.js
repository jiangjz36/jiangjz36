
import Vue from 'vue'
import Vuex from 'vuex'
// cnpm install vuex --save || --save-dev
// cnpm install axios --save || --save-dev
//  路由
import router from './router'
// 引入 数据仓库 store.js   ：vuex
import store from './vuex/store.js';
Vue.prototype.$store=store;
// 引入加密模块
import crypto from 'crypto';
Vue.prototype.$crypto=crypto;

// Vue   vue-resource   下载
import VueResource from 'vue-resource'
//  cnpm insatll vue-resource --save || --save-dev
import axios from 'axios';
// 允许跨域请求携带 cookie
axios.defaults.withCredentials=true;
//将 axios 赋值给 Vue    $reqs，方便在子组件里面使用    $reqs
Vue.prototype.$reqs = axios
//开启debug模式
Vue.config.debug= true

Vue.use(Vuex);
Vue.use(VueResource);
// cnpm install vue-resouce --save-dev


new Vue({
  el: '#app',
  router,
  store
})
