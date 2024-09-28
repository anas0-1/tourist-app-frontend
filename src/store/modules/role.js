// In store/modules/role.js
import axios from '@/axios';

const state = {
  roles: [],
};

const mutations = {
  setRoles(state, roles) {
    state.roles = roles;
  },
  clearRoles(state) {
    state.roles = [];
  },
};

const actions = {
  async fetchUserRole({ commit }) {
    try {
      const response = await axios.get('/user-role');
      commit('setRoles', response.data.roles);
    } catch (error) {
      console.error('Failed to fetch user role', error);
      commit('clearRoles');
    }
  },
};

const getters = {
  userRoles: state => state.roles,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};