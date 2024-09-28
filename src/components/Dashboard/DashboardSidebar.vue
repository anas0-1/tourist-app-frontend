<template>
  <div class="flex flex-col w-64 bg-white shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-center h-16 px-4 bg-yellow-600">
      <GlobeIcon class="h-8 w-8 text-white" />
      <span class="ml-2 text-xl font-bold text-white">TravelJoy</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto">
      <div class="px-2 py-4 space-y-1">
        <!-- Dynamically render navigation items based on user roles -->
        <router-link
          v-for="item in filteredNavItems"
          :key="item.name"
          :to="item.href"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          :class="[
            $route.path === item.href
              ? 'bg-blue-100 text-yellow-900'
              : 'text-gray-600 hover:bg-yellow-50 hover:text-yellow-900'
          ]"
        >
          <component
            :is="item.icon"
            class="mr-3 flex-shrink-0 h-6 w-6"
            :class="[
              $route.path === item.href
                ? 'text-yellow-600'
                : 'text-gray-400 group-hover:text-yellow-600'
            ]"
          />
          {{ item.name }}
        </router-link>
      </div>
    </nav>

    <!-- User Info and Logout -->
    <div class="flex items-center px-4 py-3 bg-blue-50">
      <div class="ml-3">
        <p class="text-sm font-medium text-gray-700">{{ username }}</p>
      </div>
      <button
        @click="logout"
        class="ml-auto group flex items-center w-full px-4 py-2 text-sm font-medium text-black hover:bg-gray-500 rounded-md"
      >
        <LogOutIcon class="mr-3 h-5 w-5 text-black" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; 
import { GlobeIcon, HomeIcon, MapIcon, UsersIcon, BookOpenIcon, LogOutIcon } from 'lucide-vue-next';

// Use Vuex store
const store = useStore();

const username = computed(() => store.state.user.user?.name || 'Loading...');

// Define navigation items
const allNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, roles: ['user', 'admin', 'super_admin'] },
  { name: 'My Trips', href: '/dashboard/my-trips', icon: MapIcon, roles: ['user', 'admin', 'super_admin'] },
  { name: 'My Applications', href: '/dashboard/my-applications', icon: GlobeIcon, roles: ['user', 'admin', 'super_admin'] },
  { name: 'Users', href: '/dashboard/users', icon: UsersIcon, roles: ['super_admin', 'admin'] },
  { name: 'Personal Information', href: '/dashboard/personal-info', icon: BookOpenIcon, roles: ['user', 'admin', 'super_admin'] },
];

// Filter navigation items based on user roles
const filteredNavItems = computed(() => {
  const userRoles = store.getters['role/userRoles'];
  return allNavItems.filter(item => item.roles.some(role => userRoles.includes(role)));
});

// Fetch user data and handle logout
const fetchUserData = async () => {
  await store.dispatch('user/fetchUser');
  await store.dispatch('role/fetchUserRole');
};

const logout = async () => {
  await store.dispatch('auth/logout');
  // Redirect to login page after logout
  useRouter.push('/login');
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
/* Add your styles here */
</style>
