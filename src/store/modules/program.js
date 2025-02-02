import axios from 'axios';
import instance from '@/axios'; 

const state = {
  programs: [],
  currentProgram: null,
  activities: [],
};

const getters = {
  allPrograms: (state) => state.programs,
  getProgramById: (state) => (id) => state.programs.find(program => program.id === id),
  currentProgram: (state) => state.currentProgram,
  programActivities: (state) => state.activities,
};

const actions = {
  async fetchPrograms({ commit }) {
    try {
      const response = await instance.get('/programs');
      commit('setPrograms', response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  },
  
  async fetchProgramById({ commit }, id) {
    try {
      const response = await instance.get(`/programs/${id}`);
      commit('setCurrentProgram', response.data);
    } catch (error) {
      console.error('Error fetching program by ID:', error);
    }
  },
  
  async fetchActivitiesByProgramId({ commit }, id) {
    try {
      const response = await instance.get(`/programs/${id}/activities`);
      commit('setActivities', response.data);
    } catch (error) {
      console.error('Error fetching activities by program ID:', error);
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
      commit('updateProgram', response.data.program);
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

const url = 'http://localhost:8000/storage/';

const mutations = {
  setPrograms: (state, programs) => {
    state.programs = programs.map(program => ({
      ...program,
      firstImage: program.media && program.media.length > 0 ? `${url}/${program.media[0].url}` : '../assets/Snow.png'
    }));
  },
  setCurrentProgram: (state, program) => {
    state.currentProgram = {
      ...program,
      firstImage: program.media && program.media.length > 0 ? `${url}/${program.media[0].url}` : '../assets/Snow.png'
    };
  },
  setActivities: (state, activities) => state.activities = activities,
  addProgram: (state, program) => state.programs.push({
    ...program,
    firstImage: program.media && program.media.length > 0 ? `${url}/${program.media[0].url}` : '../assets/Snow.png'
  }),
  updateProgram: (state, updatedProgram) => {
    const index = state.programs.findIndex(program => program.id === updatedProgram.id);
    if (index !== -1) {
      state.programs.splice(index, 1, {
        ...updatedProgram,
        firstImage: updatedProgram.media && updatedProgram.media.length > 0 ? `${url}/${updatedProgram.media[0].url}` : '../assets/Snow.png'
      });
    }
  },
  deleteProgram: (state, id) => {
    state.programs = state.programs.filter(program => program.id !== id);
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
