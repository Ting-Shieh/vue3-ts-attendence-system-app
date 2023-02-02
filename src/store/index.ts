import {
  createStore,
  useStore as baseUseStore // 對store進行重寫
} from 'vuex'
import type { Store } from 'vuex'
import type { InjectionKey } from 'vue'
import users from './modules/user'
import news from './modules/news'
import sign from './modules/sign'
import checks from './modules/checks'
import type { UserState } from './modules/user'
import type { NewsState } from './modules/news'
import type { SignState } from './modules/sign'
import type { ChecksState } from './modules/checks'
import VuexPersistence  from 'vuex-persist'

export interface State {}
export interface StateAll extends State {
  users: UserState,
  news: NewsState,
  sign: SignState,
  checks: ChecksState
}

// 重要
export const key: InjectionKey<Store<StateAll>> = Symbol()
export function useStore () {
  return baseUseStore(key)
}
// 要註冊插件
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  // 指定數據持久化到本地
  reducer: (state) => ({
    users: { token: (state as StateAll).users.token }
  })
})
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    news,
    sign,
    checks
  },
  plugins: [vuexLocal.plugin]
})
