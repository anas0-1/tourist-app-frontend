import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/auth/loginPage.vue';
import RegisterPage from '@/views/auth/RegisterPage.vue';
import RequestResetLinkPage from '@/views/auth/RequestResetLink.vue';
import ResetPasswordPage from '@/views/auth/ResetPassword.vue';
import HomePage from '@/views/HomePage.vue';

import ProgramForm from '@/components/Program Form/ProgramForm.vue';
import ProgramList from '@/views/ProgramList.vue';
import ProgramDetails from '@/views/ProgramDetails.vue';

import Dashboard from '@/components/Dashboard/links/DashboardLink.vue'
import MyTrips from '@/components/Dashboard/links/MyTrips.vue'
import MyApplications from '@/components/Dashboard/links/MyApplications.vue'
import Users from '@/components/Dashboard/links/UsersLinks.vue'
import PersonalInfo from '@/components/Dashboard/links/PersonalInfo.vue'
import PageDashboard from '@/views/PageDashboard.vue';


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
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
    component: PageDashboard, 
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' },
      },
      {
        path: 'my-trips',
        name: 'My Trips',
        component: MyTrips, 
        meta: { title: 'My Trips' },
      },
      {
        path: 'my-applications',
        name: 'My Applications',
        component: MyApplications, 
        meta: { title: 'My Applications' },
      },
      {
        path: 'users',
        name: 'Users',
        component: Users, 
        meta: { title: 'Users' },
      },
      {
        path: 'personal-info',
        name: 'Personal Information',
        component: PersonalInfo, 
        meta: { title: 'Personal Information' },
      },
    ],
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

// Global navigation guard
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