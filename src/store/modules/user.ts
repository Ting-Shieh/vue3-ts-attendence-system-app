import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '../index'
import http from '@/utils/http'

interface Infos {
  [index: string]: unknown
}
export interface UserState {
  token: string,
  infos: Infos
}
const state: UserState = {
  token: '',
  infos: {}
}
const mutations: MutationTree<UserState> = {
  updateToken (state, payload) {
    state.token = payload
  },
  updateInfos (state, payload) {
    state.infos = payload
  },
  clearToken (state) {
    state.token = ''
  }

}
const actions: ActionTree<UserState, State> = {
  login (context, payload) {
    return http.post('/users/login', payload)
  },
  getUserInfos() {
    return http.get('/users/infos')
  }
}
const getters: GetterTree<UserState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
