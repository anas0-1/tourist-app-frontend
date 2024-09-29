import instance from '@/axios'; 
import axios from '@/axios';

const state = {
  programs: [],
  currentProgram: null,
  activities: [],
  loading: false,
  error: null
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
      const response = await instance.post('/programs', program);
      commit('addProgram', response.data.program);
    } catch (error) {
      console.error('Error adding program:', error);
    }
  },
  
  async updateProgram({ commit }, { id, updatedData }) {
    try {
      const response = await instance.put(`/programs/${id}`, updatedData);
      commit('updateProgram', response.data.program);
    } catch (error) {
      console.error('Error updating program:', error);
    }
  },
  
  async deleteProgram({ commit }, id) {
    try {
      await instance.delete(`/programs/${id}`);
      commit('deleteProgram', id);
    } catch (error) {
      console.error('Error deleting program:', error);
    }
  },
  async fetchAllPrograms({ commit }) {
    try {
      const response = await instance.get('/programs');
      commit('setPrograms', response.data);
    } catch (error) {
      console.error('Error fetching all programs:', error);
    }
  },
  async rateProgram({ commit }, { programId, rating }) {
    try {
      const response = await axios.post(`/programs/${programId}/rate`, { rating });
      commit('UPDATE_PROGRAM_RATING', { 
        programId, 
        averageRating: response.data.average_rating 
      });
    } catch (error) {
      console.error('Error rating program:', error);
      throw error;
    }
  }
};

const url = 'http://localhost:8000/storage';

const mutations = {
  setPrograms: (state, programs) => {
    state.programs = programs.map(program => ({
      ...program,
      images: program.media && program.media.length > 0 
                ? program.media.map(mediaItem => `${url}${mediaItem.url}`) 
                : ['../assets/Snow.png']
    }));
  },
  setCurrentProgram: (state, program) => {
    const mediaUrls = program.media && program.media.length > 0 
      ? program.media.map(mediaItem => `${url}/${mediaItem.url}`) 
      : ['../assets/Snow.png'];

    console.log('Media URLs:', mediaUrls); // Console log to check media URLs

    state.currentProgram = {
      ...program,
      images: mediaUrls,
    };
  },
  setActivities: (state, activities) => {
    state.activities = activities;
  },
  addProgram: (state, program) => {
    state.programs.push({
      ...program,
      images: program.media && program.media.length > 0 
                ? program.media.map(mediaItem => `${url}${mediaItem.url}`) 
                : ['../assets/Snow.png']
    });
  },
  updateProgram: (state, updatedProgram) => {
    const index = state.programs.findIndex(program => program.id === updatedProgram.id);
    if (index !== -1) {
      state.programs.splice(index, 1, {
        ...updatedProgram,
        images: updatedProgram.media && updatedProgram.media.length > 0 
                  ? updatedProgram.media.map(mediaItem => `${url}${mediaItem.url}`) 
                  : ['../assets/Snow.png']
      });
    }
  },
  deleteProgram: (state, id) => {
    state.programs = state.programs.filter(program => program.id !== id);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  UPDATE_PROGRAM_RATING(state, { programId, averageRating }) {
    const program = state.programs.find(p => p.id === programId);
    if (program) {
      program.averageRating = averageRating;
    }
    if (state.currentProgram && state.currentProgram.id === programId) {
      state.currentProgram.averageRating = averageRating;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
