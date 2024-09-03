import axios from '@/axios';

const userModule = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUserData(state) {
      state.user = null;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await axios.get('/me');
        commit('setUser', response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        throw error;
      }
    },
    clearUserData({ commit }) {
      commit('clearUserData');
    },
  },
  getters: {
    user: state => state.user,
  },
};

export default userModule;
