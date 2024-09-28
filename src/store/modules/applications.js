import axios from '@/axios';

const state = {
  applications: [],
  loading: false,
  error: null
};

const mutations = {
  SET_APPLICATIONS(state, applications) {
    state.applications = applications;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  REMOVE_APPLICATION(state, applicationId) {
    state.applications = state.applications.filter(app => app.id !== applicationId);
  }
};

const actions = {
  async fetchApplications({ commit }, programId) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get(`/programs/${programId}/applications`);
      commit('SET_APPLICATIONS', response.data);
      commit('SET_ERROR', null);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch applications');
      console.error('Error fetching applications:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async deleteApplication({ commit }, { programId, applicationId }) {
    commit('SET_LOADING', true);
    try {
      await axios.delete(`/programs/${programId}/applications/${applicationId}`);
      commit('REMOVE_APPLICATION', applicationId);
      commit('SET_ERROR', null);
    } catch (error) {
      commit('SET_ERROR', 'Failed to delete application');
      console.error('Error deleting application:', error);
    } finally {
      commit('SET_LOADING', false);
    }
  }
};

const getters = {
  getApplications: state => state.applications,
  isLoading: state => state.loading,
  getError: state => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};