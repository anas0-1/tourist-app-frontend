<template>
  <nav class="bg-white text-black shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-xl font-bold text-yellow-500">TravelEASE</span>
        </div>

        <!-- Main Navigation -->
        <div class="hidden md:flex space-x-4 items-center">
          <router-link to="/" class="hover:text-yellow-500 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">Home</router-link>

          <!-- Programs Dropdown -->
          <div class="relative group">
            <button class="flex items-center hover:text-yellow-500 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
              Programs
              <svg class="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50">
              <div class="py-1">
                <router-link to="/programs/create" class="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white">Create Program</router-link>
                <router-link to="/programs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white">Explore Programs</router-link>
              </div>
            </div>
          </div>

          <!-- About Us Button -->
          <button @click="openAboutUsModal" class="hover:text-yellow-500 transition duration-300 ease-in-out px-3 py-2 rounded-md text-sm font-medium">
            About Us
          </button>

          <!-- Icons for logged-in users -->
          <div v-if="isLoggedIn" class="flex space-x-4 items-center">
            <!-- Notifications Icon -->
            <button class="relative hover:text-yellow-500 transition duration-300">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.16V11a6.003 6.003 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.003 6.003 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m1 0v1a2 2 0 104 0v-1m-4 1h4" />
              </svg>
            </button>

            <!-- Profile Dropdown -->
            <div class="relative">
              <button @click="toggleDropdown" class="flex items-center space-x-2 hover:text-yellow-500 transition duration-300">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A7.962 7.962 0 0012 20a7.962 7.962 0 006.879-2.196M12 12a4 4 0 100-8 4 4 0 000 8zm0 8c-3.86 0-7 3.141-7 7h14c0-3.86-3.14-7-7-7z" />
                </svg>
                <span class="text-sm font-medium">{{ username }}</span>
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div class="py-1">
                  <router-link to="/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white" @click="closeDropdown">Dashboard</router-link>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-white">Logout</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Login/Signup Buttons for guests -->
          <div v-else class="flex space-x-4">
            <router-link to="/login" class="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out">Login</router-link>
            <router-link to="/register" class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out">Sign Up</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- About Us Modal -->
  <AboutUsModal :isOpen="showAboutUsModal" @close="closeAboutUsModal" />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AboutUsModal from './AboutUsModal.vue';

export default {
  name: 'NavBar',
  components: {
    AboutUsModal
  },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.getters['auth/isAuthenticated']);
    const username = computed(() => store.state.user.user?.name || 'Loading ...');
    const showDropdown = ref(false);
    const showAboutUsModal = ref(false);

    const fetchUser = async () => {
      try {
        await store.dispatch('user/fetchUser');
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    onMounted(() => {
      if (isLoggedIn.value) {
        fetchUser();
      }
    });

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const closeDropdown = () => {
      showDropdown.value = false;
    };

    const logout = async () => {
      try {
        await store.dispatch('auth/logout');
        closeDropdown();
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    const openAboutUsModal = () => {
      showAboutUsModal.value = true;
    };

    const closeAboutUsModal = () => {
      showAboutUsModal.value = false;
    };

    return {
      isLoggedIn,
      username,
      showDropdown,
      showAboutUsModal,
      toggleDropdown,
      closeDropdown,
      logout,
      openAboutUsModal,
      closeAboutUsModal,
    };
  },
};
</script>