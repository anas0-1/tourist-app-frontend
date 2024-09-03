import axios from '@/axios';

const authModule = {
  namespaced: true,
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
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/login', credentials);
        const token = response.data.token;
        commit('setToken', token);
        return response.data;
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
    },
    async register({ commit }, credentials) {
      try {
        const response = await axios.post('/register', credentials);
        const token = response.data.token;
        commit('setToken', token);
        return response.data;
      } catch (error) {
        console.error('Registration failed', error.response.data);
        throw error.response.data;
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/logout'); // Ensure backend is called if necessary
      } catch (error) {
        console.error('Logout failed', error);
      }
      commit('clearToken');
      // Clear user data
      this.dispatch('user/clearUserData');
      window.location.href = '/login'; // Redirect after logout
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
};

export default authModule;
