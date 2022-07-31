import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // 懒加载
    component: () => import('@/views/login')
    // component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('@/views/profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
