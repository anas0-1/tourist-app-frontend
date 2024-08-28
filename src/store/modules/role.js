import axios from 'axios';

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
  async fetchUserRole({ commit, rootState }) {
    if (!rootState.auth.token) return;

    try {
      const response = await axios.get('http://localhost:8000/api/user-role', {
        headers: {
          Authorization: `Bearer ${rootState.auth.token}`,
        },
      });
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
