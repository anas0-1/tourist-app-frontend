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
    async registerUser() {
      if (this.password !== this.passwordConfirm) {
        this.errorMessage = 'Passwords do not match';
        return;
      }
    
      try {
        await this.register({ name: this.name, email: this.email, password: this.password, password_confirmation: this.passwordConfirm });
        this.$router.push('/login');
      } catch (error) {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
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
