import axios from '@/axios';

const state = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users.map(user => ({
      ...user,
      joinedDate: new Date(user.created_at).toLocaleDateString(),
      roles: user.roles || [] // Ensure roles is always an array
    }));
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_SELECTED_USER(state, user) {
    state.selectedUser = user;
  },
  REMOVE_USER(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  },
};

const actions = {
  async fetchUsers({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get('/users');
      commit('SET_USERS', response.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await axios.delete(`/users/${userId}`);
      commit('REMOVE_USER', userId);
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete user');
      console.error('Error deleting user:', error);
    }
  },
  async fetchUserDetails({ commit }, userId) {
    try {
      const response = await axios.get(`/users/${userId}`);
      commit('SET_SELECTED_USER', response.data);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch user details');
      console.error('Error fetching user details:', error);
    }
  },
};

const getters = {
  getUsers: state => state.users,
  isLoading: state => state.loading,
  getError: state => state.error,
  getSelectedUser: state => state.selectedUser,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};