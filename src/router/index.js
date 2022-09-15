import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 直接配置组件首屏加载速度慢，可以配置懒加载 用到的时候再加载页面 可以提高运行速度
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      },
      // 懒加载的chunk默认的名字是模块的路径
      // /*webpackChunkName:"新名字"*/
      {
        path: '/QA',
        component: () => import(/* webpackChunkName:'base' */ '@/views/QA')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:'base' */ '@/views/video')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
