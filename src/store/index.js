import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('access_token') || '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        commit('setUser', response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    userRole: state => state.user?.role || '',
  },
});

export default store;
