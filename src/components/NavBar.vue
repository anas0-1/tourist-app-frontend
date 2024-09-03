<template>
  <nav class="bg-white text-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="/logo.png" alt="TouristApp Logo" class="h-8 w-auto" />
        </div>

        <!-- Main Navigation -->
        <div class="hidden md:flex space-x-8 items-center">
          <router-link to="/" class="hover:text-yellow-500 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">Home</router-link>

          <!-- Programs Dropdown -->
          <div class="relative group">
            <button class="hover:text-yellow-500 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
              Programs
            </button>
            <div class="absolute hidden group-hover:block bg-white text-black rounded-lg shadow-lg py-3 transition-all duration-500 ease-in-out transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10">
              <router-link to="/programs/create" class="block px-6 py-2 hover:bg-gray-200 rounded-lg transition duration-300">Create Program</router-link>
              <router-link to="/programs" class="block px-6 py-2 hover:bg-gray-200 rounded-lg transition duration-300">Explore Programs</router-link>
            </div>
          </div>

          <!-- VIP Services Dropdown -->
          <div class="relative group">
            <button class="hover:text-yellow-500 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
              VIP Services
            </button>
            <div class="absolute hidden group-hover:block bg-white text-black rounded-lg shadow-lg py-3 transition-all duration-500 ease-in-out transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 z-10">
              <router-link to="/vip-challenges" class="block px-6 py-2 hover:bg-gray-200 rounded-lg transition duration-300">Challenges</router-link>
              <router-link to="/vip-rewards" class="block px-6 py-2 hover:bg-gray-200 rounded-lg transition duration-300">Rewards</router-link>
              <router-link to="/vip-levels" class="block px-6 py-2 hover:bg-gray-200 rounded-lg transition duration-300">VIP Levels</router-link>
            </div>
          </div>

          <!-- Icons for logged-in users -->
          <div v-if="isLoggedIn" class="flex space-x-4 items-center">
            <!-- Notifications Icon -->
            <button class="relative">
              <svg class="h-6 w-6 text-black hover:text-yellow-500 transition duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.16V11a6.003 6.003 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.003 6.003 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m1 0v1a2 2 0 104 0v-1m-4 1h4" />
              </svg>
            </button>

            <!-- Profile Icon with Dropdown -->
            <div class="relative">
              <button @click="toggleDropdown" class="flex items-center space-x-2">
                <svg class="h-6 w-6 text-black hover:text-yellow-500 transition duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A7.962 7.962 0 0012 20a7.962 7.962 0 006.879-2.196M12 12a4 4 0 100-8 4 4 0 000 8zm0 8c-3.86 0-7 3.141-7 7h14c0-3.86-3.14-7-7-7z" />
                </svg>
                <span>{{ username }}</span>
                <svg class="h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-20">
                <router-link to="/dashboard" class="block px-4 py-2 hover:bg-gray-200 rounded-md" @click="closeDropdown">Dashboard</router-link>
                <button @click="logout" class="block w-full px-4 py-2 text-left hover:bg-gray-200 rounded-md">Logout</button>
              </div>
            </div>
          </div>

          <!-- Login/Signup Buttons for guests -->
          <div v-else class="ml-auto flex space-x-4">
            <router-link to="/login" class="px-4 py-2 border border-black text-black rounded-lg hover:text-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out">Login</router-link>
            <router-link to="/register" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const showDropdown = ref(false);

    const isLoggedIn = computed(() => !!localStorage.getItem('access_token'));
    const username = computed(() => store.state.user.user?.name || 'Loading...');

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const closeDropdown = () => {
      showDropdown.value = false;
    };

    const logout = async () => {
      try {
        await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json',
          },
        });
        localStorage.removeItem('access_token');
        store.commit('user/clearUser');
        router.push('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    onMounted(async () => {
      if (isLoggedIn.value) {
        await store.dispatch('user/fetchUser');
      }
    });

    return {
      isLoggedIn,
      username,
      showDropdown,
      toggleDropdown,
      closeDropdown,
      logout,
    };
  },
};
</script>

<style scoped>
/* Custom styles for dropdown and nav items */
</style>
