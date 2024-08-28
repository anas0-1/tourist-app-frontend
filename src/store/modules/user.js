import axios from '@/axios'; // Import the custom Axios instance

const userModule = {
  namespaced: true,
  state: {
    user: null,
    roles: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      state.roles = [];
    },
    setRoles(state, roles) {
      state.roles = roles;
    }
  },
  actions: {
    async fetchUser({ commit, rootState }) {
      if (!rootState.auth.token) return;

      try {
        const response = await axios.get('/me', {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        commit('clearUser');
      }
    },
    async fetchUserRole({ commit, rootState }) {
      if (!rootState.auth.token) return;

      try {
        const response = await axios.get('/user-role', {
          headers: {
            Authorization: `Bearer ${rootState.auth.token}`,
          },
        });
        commit('setRoles', response.data.roles);
      } catch (error) {
        console.error('Failed to fetch user role', error);
      }
    }
  },
  getters: {
    userRole: state => state.roles,
  }
};

export default userModule;
