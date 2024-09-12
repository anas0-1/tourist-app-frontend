// store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import role from './modules/role';
import program from './modules/program';

const store = createStore({
  modules: {
    auth,
    user,
    role,
    program,
  },
});

export default store;
