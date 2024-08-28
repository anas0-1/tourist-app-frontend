import axios from '@/axios'; // Import the custom Axios instance

const authModule = {
  namespaced: true, // Important for modularizing Vuex
  state: {
    token: localStorage.getItem('access_token') || '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('access_token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('access_token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login', credentials);
        const token = response.data.token;
        commit('setToken', token);
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/logout');
        commit('clearToken');
      } catch (error) {
        console.error('Logout failed', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
  }
};

export default authModule;
