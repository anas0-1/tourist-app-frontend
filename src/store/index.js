// store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import role from './modules/role';
import program from './modules/program';
import programD from './modules/programD'; 
import applications from './modules/applications';

const store = createStore({
  modules: {
    auth,
    user,
    role,
    program,
    programD,
    applications
  },
});

export default store;
