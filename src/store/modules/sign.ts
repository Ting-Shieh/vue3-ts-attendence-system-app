import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '../index'

export interface SignState {}
const state: SignState = {}
const mutations: MutationTree<SignState> = {}
const actions: ActionTree<SignState, State> = {}
const getters: GetterTree<SignState, State> = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}