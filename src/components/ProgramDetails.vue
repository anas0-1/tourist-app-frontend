<template>
  <div>
    <!-- Include Navbar at the top -->
    <NavBar />

    <!-- Program details section -->
    <div class="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">{{ program.name }}</h1>

      <!-- Program Description -->
      <p class="text-gray-600 leading-relaxed mb-6">{{ program.description }}</p>

      <!-- Program Information -->
      <div class="mb-4">
        <p class="text-gray-700">
          <strong>Duration:</strong> {{ program.time }}
        </p>
        <p class="text-yellow-500">
          <strong>Rating:</strong> {{ program.rating }} / 5
        </p>
      </div>

      <!-- Activities Section -->
      <h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Activities</h3>
      <ul class="space-y-4">
        <li
          v-for="activity in program.activities"
          :key="activity.id"
          class="border-b pb-4"
        >
          <h4 class="font-semibold text-xl">{{ activity.name }}</h4>
          <p class="text-gray-600 mb-1">{{ activity.description }}</p>
          <p class="text-gray-500 text-sm">Time: {{ activity.time }}</p>
        </li>
      </ul>

      <!-- Weather Information Section -->
      <h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Weather for this trip
      </h3>
      <p class="text-gray-600">{{ program.weather }}</p>

      <!-- Apply to Program Button -->
      <div class="mt-8">
        <button
          @click="applyToProgram"
          class="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Apply
        </button>
      </div>
    </div>

    <!-- Include Footer at the bottom -->
    <AppFooter />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import AppFooter from "@/components/Footer.vue";

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
        description: "A thrilling adventure across the Alps, including various activities like hiking, camping, and rafting.",
        time: "1 week",
        rating: 4.5,
        activities: [
          { id: 1, name: "Hiking", description: "Explore scenic mountain trails.", time: "3 hours" },
          { id: 2, name: "Camping", description: "Overnight stay in the mountains.", time: "1 night" },
          { id: 3, name: "Rafting", description: "Exciting white-water rafting.", time: "5 hours" }
        ],
        weather: "Sunny with occasional rain showers.",
      }
    };
  },
  methods: {
    applyToProgram() {
      if (this.isGuestUser) {
        alert("Please log in to apply for this program.");
      } else {
        alert("Application submitted!");
      }
    }
  },
  computed: {
    isGuestUser() {
      // Simulate guest/user logic; in real-world, this would come from auth state.
      return true; // Change to false for logged-in user simulation
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
