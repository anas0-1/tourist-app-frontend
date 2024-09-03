import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'; 

import LoginPage from '@/views/loginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import RequestResetLinkPage from '@/views/RequestResetLink.vue';
import ResetPasswordPage from '@/views/ResetPassword.vue';
import HomePage from '@/views/HomePage.vue';
import Dashboard from '@/views/PageDashboard.vue';

import ProgramForm from '@/components/ProgramForm.vue';
import ProgramList from '@/components/ProgramList.vue';
import ProgramDetails from '@/components/ProgramDetails.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.token) {
        // If the user is authenticated, redirect to the dashboard or homepage
        next('/dashboard');
      } else {
        next(); // If not authenticated, proceed to the login page
      }
    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      if (store.state.auth.token) {
        // If the user is authenticated, redirect to the dashboard or homepage
        next('/dashboard');
      } else {
        next(); // If not authenticated, proceed to the login page
      }
    }
  },
  {
    path: '/password/reset',
    name: 'RequestResetLink',
    component: RequestResetLinkPage,
  },
  {
    path: '/reset-password',
    name: 'ResetPasswordPage',
    component: ResetPasswordPage,
    props: route => ({ token: route.query.token }),
  },
  {
    path: '/dashboard',
    name: 'PageDashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/programs',
    name: 'ProgramList',
    component: ProgramList,
    meta: { requiresAuth: true },
  },
  {
    path: '/programs/create',
    name: 'CreateProgram',
    component: ProgramForm,
    meta: { requiresAuth: true },
  },
  {
    path: '/programs/:id/edit',
    name: 'EditProgram',
    component: ProgramForm,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/programs/:id',
    name: 'ProgramDetails',
    component: ProgramDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ensure the router is created before using router guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token'); // Token stored in localStorage after login

  // If a route requires authentication and no token is found, redirect to login
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
