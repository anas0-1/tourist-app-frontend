import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/loginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import RequestResetLinkPage from '@/views/RequestResetLink.vue';
import ResetPasswordPage from '@/views/ResetPassword.vue';
import Dashboard from '@/views/PageDashboard.vue';


const routes = [
  {
    path: '/login',
    name: 'LoginPage',
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
    component: RequestResetLinkPage
  },
  // {
  //   path: '/reset-password/:token',
  //   name: 'ResetPassword',
  //   component: ResetPasswordPage
  // },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordPage,
    props: route => ({ token: route.query.token}) // Use query parameters
    },
    
    
  {
    path: '/dashboard',
    name: 'PageDashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Optional: Add navigation guard to protect dashboard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
