import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/loginPage.vue';
import Dashboard from '@/views/PageDashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
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
