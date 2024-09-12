import instance from '@/axios';
import axios from 'axios';

const state = {
  programs: []
};

const getters = {
  allPrograms: (state) => state.programs,
  getProgramById: (state) => (id) => state.programs.find(program => program.id === id),
};

const actions = {
  async fetchPrograms({ commit }) {
    try {
      const response = await instance.get('/programs');
      console.log('from fetchPrograms : ',response.data);
      
      commit('setPrograms', response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  },
  async addProgram({ commit }, program) {
    try {
      const response = await axios.post('/api/programs', program);
      commit('addProgram', response.data.program);
    } catch (error) {
      console.error('Error adding program:', error);
    }
  },
  async updateProgram({ commit }, { id, updatedData }) {
    try {
      const response = await axios.put(`/api/programs/${id}`, updatedData);
      commit('updateProgram', response.data);
    } catch (error) {
      console.error('Error updating program:', error);
    }
  },
  async deleteProgram({ commit }, id) {
    try {
      await axios.delete(`/api/programs/${id}`);
      commit('deleteProgram', id);
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  }
};

const mutations = {
  setPrograms: (state, programs) => (state.programs = programs),
  addProgram: (state, program) => state.programs.push(program),
  updateProgram: (state, updatedProgram) => {
    const index = state.programs.findIndex(program => program.id === updatedProgram.id);
    if (index !== -1) {
      state.programs.splice(index, 1, updatedProgram);
    }
  },
  deleteProgram: (state, id) => {
    state.programs = state.programs.filter(program => program.id !== id);
  }
};

export default {
  namespaced: true,  // Ensure this is set to true
  state,
  getters,
  actions,
  mutations
};
