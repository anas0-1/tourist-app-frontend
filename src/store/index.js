// store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import role from './modules/role';

const store = createStore({
  modules: {
    auth,
    user,
    role,
  },
});

export default store;
