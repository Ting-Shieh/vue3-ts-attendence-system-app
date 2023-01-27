import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '../index'
import http from '@/utils/http'

export interface UserState {}
const state: UserState = {}
const mutations: MutationTree<UserState> = {}
const actions: ActionTree<UserState, State> = {
  login () {
    return http.post('/users/login', {
        "email": "huangrong@imooc.com",
        "pass": "huangrong"
      })
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
