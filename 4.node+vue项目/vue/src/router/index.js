import Vue from 'vue'
import Router from 'vue-router'
//  组件
import Hello from '@/components/Hello'
// 登录
import login from '@/components/login_component'
import head from '@/components/head'
import fcheader from '@/components/fcheader'
import home from '@/components/second'
// import login1 from '@/components/logina'

Vue.use(Router)

export default new Router({
	mode:'history',  // 历史记录的模式
	base:__dirname+'/', //设置基础路径
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/login',  
      component: login
    },{
      path: '/head',
      component: head
    },{
      path: '/fcheader',
      component: fcheader
    },{
      path: '/home',
      component: home
    }
  ]
})
