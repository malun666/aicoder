import VueRouter from 'vue-router'
import UserInfo from './components/UserInfo.vue'
import Index from './components/Index.vue'

export default new VueRouter({
  routes: [
    {
      path: '/userinfo/:userId',
      name: 'UserInfo',
      component: UserInfo
    }, {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})
