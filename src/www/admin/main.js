// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// ------
import Vue from 'vue'
import VueRouter from 'vue-router'
import AppRoute from './router.js'
import App from './App'

// 使用vue的路由模块
Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: AppRoute         // 设置路由对象
})
