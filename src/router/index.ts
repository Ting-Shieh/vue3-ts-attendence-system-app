import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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

export default router
