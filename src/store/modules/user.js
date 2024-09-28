import axios from '@/axios';

const userModule = {
  namespaced: true,
  state: {
    user: null,
    successMessage: '',
    errorMessage: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUserData(state) {
      state.user = null;
    },
    setSuccessMessage(state, message) {
      state.successMessage = message;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    clearMessages(state) {
      state.successMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await axios.get('/me');
        commit('setUser', response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
        commit('setErrorMessage', 'Failed to fetch user data');
      }
    },
    
    async updateUser({ commit }, userData) {
      try {
        const response = await axios.put(`/users/${userData.id}`, userData);
        commit('setUser', response.data);
        commit('setSuccessMessage', 'Profile updated successfully!');
      } catch (error) {
        console.error('Failed to update user', error);
        commit('setErrorMessage', 'Failed to update profile');
      }
    },

    async deleteUser({ commit }, userId) {
      try {
        await axios.delete(`/users/${userId}`);
        commit('clearUserData');
        commit('setSuccessMessage', 'Account deleted successfully!');
      } catch (error) {
        console.error('Failed to delete user', error);
        commit('setErrorMessage', 'Failed to delete account');
      }
    },

    clearUserData({ commit }) {
      commit('clearUserData');
    },
    
    clearMessages({ commit }) {
      commit('clearMessages');
    },
  },
  getters: {
    user: state => state.user,
    successMessage: state => state.successMessage,
    errorMessage: state => state.errorMessage,
  },
};

export default userModule;
