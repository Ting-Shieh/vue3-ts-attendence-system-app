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
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: 'sign',
        name: 'sign',
        meta: {
          menu: true,
          title: '在線打卡簽到',
          icon: 'calendar',
          auth: true
        },
        component: signCpt,
        async beforeEnter (to, from , next) {
          const usersInfos = (store.state as StateAll).users.infos
          const signsInfos = (store.state as StateAll).signs.infos
          const newsInfo = (store.state as StateAll).news.info
          // console.log(usersInfos)
          // console.log('signsInfos:',signsInfos)
          if (_.isEmpty(signsInfos)) {
            const res = await store.dispatch('signs/getTime', { userid: usersInfos._id })
            if (res.data.errcode === 0) {
              store.commit('signs/updateInfos', res.data.infos)
            }
          }
          if (_.isEmpty(newsInfo)) {
            const res = await store.dispatch('news/getRemind', { userid: usersInfos._id })
            if (res.data.errcode === 0) {
              store.commit('news/updateInfo', res.data.info)
            }
          }
          next()
        }
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
        component: checkCpt,
        beforeEnter (to, from , next) {
          const usersInfos = (store.state as StateAll).users.infos
          const checksCheckList = (store.state as StateAll).checks.checkList
          // console.log(usersInfos)
          // console.log('signsInfos:',signsInfos)
          if (_.isEmpty(checksCheckList)) {
            store
              .dispatch('checks/getApply', { approverid: usersInfos._id })
              .then((res) => {
                if (res.data.errcode === 0) {
                  store.commit('checks/updateCheckList', res.data.rets)
                }
              })
          }
          next()
        }
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
        component: applyCpt,
        beforeEnter (to, from , next) {
          const usersInfos = (store.state as StateAll).users.infos
          const checksApplyList = (store.state as StateAll).checks.applyList
          // console.log(usersInfos)
          // console.log('signsInfos:',signsInfos)
          if (_.isEmpty(checksApplyList)) {
            store
              .dispatch('checks/getApply', { applicantid: usersInfos._id })
              .then((res) => {
                // console.log(res.data)
                if (res.data.errcode === 0) {
                  store.commit('checks/updateApplyList', res.data.rets)
                }
              })
          }
          next()
        }
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
        component: exceptionCpt,
        async beforeEnter (to, from , next) {
          const usersInfos = (store.state as StateAll).users.infos
          const signsInfos = (store.state as StateAll).signs.infos
          const checksApplyList = (store.state as StateAll).checks.applyList
          const newsInfo = (store.state as StateAll).news.info

          // console.log(usersInfos)
          // console.log('signsInfos:',signsInfos)
          if (_.isEmpty(signsInfos)) {
            const res = await store.dispatch('signs/getTime', { userid: usersInfos._id })
            if (res.data.errcode === 0) {
              store.commit('signs/updateInfos', res.data.infos)
            } else {
              return;
            }
          }
          if (_.isEmpty(checksApplyList)) {
            const res = await store.dispatch('checks/getApply', { applicantid: usersInfos._id })
            if (res.data.errcode === 0) {
              store.commit('checks/updateApplyList', res.data.rets)
            } else {
              return;
            }
          }
          if (_.isEmpty(newsInfo)) {
            const res = await store.dispatch('news/getRemind', { userid: usersInfos._id })
            if (res.data.errcode === 0) {
              store.commit('news/updateInfo', res.data.info)
            }
          }
          next()
        }
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
