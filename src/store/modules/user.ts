import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '../index'
import http from '@/utils/http'
import { pa } from 'element-plus/es/locale'

export interface UserState {
  token: string
}
const state: UserState = {
  token: ''
}
const mutations: MutationTree<UserState> = {
  updateToken (state, payload) {
    state.token = payload
  }
}
const actions: ActionTree<UserState, State> = {
  login (context, payload) {
    return http.post('/users/login', payload)
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
