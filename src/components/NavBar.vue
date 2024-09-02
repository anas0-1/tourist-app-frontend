<template>
  <nav class="bg-gray-800 py-4 px-8">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div>
        <a href="/" class="flex items-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-9 12V9m0 0l7-7m7 7v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9" />
          </svg>
          <span class="text-2xl font-semibold">TouristApp</span>
        </a>
      </div>

      <!-- Links and Modern Dropdown -->
      <div class="hidden md:flex items-center space-x-6">
        <a href="/" class="text-base font-medium text-gray-300 hover:text-white transition">Home</a>

        <!-- Programs Dropdown -->
        <div class="relative group">
          <button class="text-base font-medium text-gray-300 flex items-center hover:text-white transition">
            Programs
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <!-- Modern Dropdown -->
          <div class="absolute hidden group-hover:block bg-glassmorph backdrop-blur-md text-gray-100 mt-2 py-3 rounded-xl shadow-lg w-48 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 hover:opacity-100 hover:block z-50">
            <a href="/programs" class="block px-5 py-2 text-sm hover:bg-white hover:text-gray-900 rounded-md transition duration-300">View All Programs</a>
            <a href="/programs/create" class="block px-5 py-2 text-sm hover:bg-white hover:text-gray-900 rounded-md transition duration-300">Create a Program</a>
            <a href="/programs/partners" class="block px-5 py-2 text-sm hover:bg-white hover:text-gray-900 rounded-md transition duration-300">Partner Programs</a>
          </div>
        </div>

        <a href="/vip-services" class="text-base font-medium text-gray-300 hover:text-white transition">VIP Services</a>

        <!-- Profile Dropdown -->
        <div class="relative group">
          <button class="text-base font-medium text-gray-300 flex items-center hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12 12 0 11-12.32 0L12 14z"></path>
            </svg>
          </button>

          <!-- Profile Dropdown -->
          <div class="absolute hidden group-hover:block bg-glassmorph backdrop-blur-md text-gray-100 mt-2 py-3 rounded-xl shadow-lg w-40 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 hover:opacity-100 hover:block z-50 right-0">
            <a href="/profile" class="block px-5 py-2 text-sm hover:bg-white hover:text-gray-900 rounded-md transition duration-300">Profile</a>
            <a href="/settings" class="block px-5 py-2 text-sm hover:bg-white hover:text-gray-900 rounded-md transition duration-300">Settings</a>
            <a href="/logout" class="block px-5 py-2 text-sm hover:bg-white hover:text-gray-900 rounded-md transition duration-300">Logout</a>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.bg-glassmorph {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.text-gray-100 {
  color: #f1f5f9;
}

.text-base {
  font-size: 1rem;
  font-weight: 500;
}

.hover\:text-white:hover {
  color: #fff;
}

.hover\:bg-white:hover {
  background-color: #fff;
}

.hover\:text-gray-900:hover {
  color: #1f2937;
}

.shadow-lg {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

.transition {
  transition: all 0.3s ease-in-out;
}

/* Ensure dropdown stays open while hovering */
.group:hover .group-hover\:block, 
.group-hover\:block:hover {
  display: block;
}

.group:hover .group-hover\:opacity-100,
.group-hover\:opacity-100:hover {
  opacity: 1;
}

.group-hover\:translate-y-1 {
  transform: translateY(0.25rem); /* Slight dropdown animation */
}

.z-50 {
  z-index: 50;
}
</style>
