import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import _ from 'lodash'
import store from '@/store' // 此處無法使用useStore
import type { StateAll } from '@/store'

const homeCpt = () => import(/* webpackChunkName: "home" */'@/views/Home/Home.vue')
const loginCpt = () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')
const checkCpt = () => import(/* webpackChunkName: "check" */ '@/views/Check/Check.vue')
const applyCpt = () => import(/* webpackChunkName: "apply" */ '@/views/Apply/Apply.vue')
const signCpt = () => import(/* webpackChunkName: "sign" */ '@/views/Sign/Sign.vue')
const exceptionCpt = () => import(/* webpackChunkName: "exception" */ '@/views/Exception/Exception.vue')

declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean,
    title?: string,
    icon?: string,
    auth?: boolean
  }
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: homeCpt,
    redirect: '/sign',
    meta: {
      menu: false,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: '/sign',
        name: 'sign',
        meta: {
          menu: true,
          title: '在線打卡簽到',
          icon: 'calendar',
          auth: true
        },
        component: signCpt
      },
      {
        path: 'check',
        name: 'check',
        meta: {
          menu: true,
          title: '我的考勤審批',
          icon: 'finished',
          auth: true
        },
        component: checkCpt
      },
      {
        path: 'apply',
        name: 'apply',
        meta: {
          menu: true,
          title: '添加考勤審批',
          icon: 'document-add',
          auth: true
        },
        component: applyCpt
      },
      {
        path: 'exception',
        name: 'exception',
        meta: {
          menu: true,
          title: '異常考勤查詢',
          icon: 'warning',
          auth: true
        },
        component: exceptionCpt
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: loginCpt
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局守衛
router.beforeEach((to, from , next) => {
  const token = (store.state as StateAll).users.token
  const infos = (store.state as StateAll).users.infos

  if (to.meta.auth && _.isEmpty(infos)) {
    if (token) {
      // 校驗token合法
      store.dispatch('users/getUserInfos').then((res)=>{
        if (res.data.errcode === 0) {
          store.commit('users/updateInfos', res.data.infos)
          next()
        }
      })
    } else {
      next('/login')
    }
  } else {
    if (token && to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
