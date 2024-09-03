<template>
  <div>
    <!-- Include Navbar at the top -->
    <NavBar />

    <!-- Program details section -->
    <div class="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ program.name }}</h1>
      <p class="text-gray-600">{{ program.description }}</p>
      <p class="text-gray-500 mt-4">Duration: {{ program.time }}</p>
      <p class="text-yellow-500 mt-1">Rating: {{ program.rating }}</p>

      <!-- Activities Section -->
      <h3 class="mt-6 text-lg font-semibold text-gray-800">Activities</h3>
      <ul class="space-y-4 mt-2">
        <li v-for="activity in program.activities" :key="activity.id" class="space-y-1">
          <h4 class="font-semibold">{{ activity.name }}</h4>
          <p>{{ activity.description }}</p>
          <p class="text-gray-500">Time: {{ activity.time }}</p>
        </li>
      </ul>

      <!-- Weather Information Section -->
      <h3 class="mt-6 text-lg font-semibold text-gray-800">Weather for this trip</h3>
      <p class="text-gray-600">{{ program.weather }}</p>

      <!-- Apply to Program Button -->
      <button
        @click="applyToProgram"
        class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Apply
      </button>
    </div>

    <!-- Include Footer at the bottom -->
    <AppFooter />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  components: {
    NavBar,
    AppFooter
  },
  data() {
    return {
      program: {
        id: 1,
        name: "Adventure in the Alps",
        description: "A thrilling adventure across the Alps.",
        time: "1 week",
        rating: 4.5,
        activities: [
          { id: 1, name: "Hiking", description: "Explore scenic mountain trails.", time: "3 hours" },
          { id: 2, name: "Camping", description: "Overnight stay in the mountains.", time: "1 night" },
          { id: 3, name: "Rafting", description: "Exciting white-water rafting.", time: "5 hours" }
        ],
        weather: "Sunny with occasional rain showers.",
      },
    };
  },
  methods: {
    applyToProgram() {
      if (this.isGuestUser) {
        alert('Please log in to apply for this program.');
      } else {
        alert('Application submitted!');
      }
    }
  },
  computed: {
    isGuestUser() {
      // Simulate guest/user logic; in real-world, this would come from auth state.
      return true; // Set to false for logged-in user simulation
    }
  }
};
</script>
