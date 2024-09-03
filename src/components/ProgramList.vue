<template>
  <div class="min-h-screen bg-light-blue-100">
    <!-- Include Navbar at the top -->
    <NavBar />

    <!-- Search and Filter Options (from Homepage) -->
    <section class="py-12 bg-light-blue-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-8 text-center">Find Your Perfect Program</h2>
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Where do you want to go?" 
            class="w-full md:w-1/3 p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
          />
          <select class="w-full md:w-1/6 p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
            <option>Travel Style</option>
            <option>Adventure</option>
            <option>Relaxation</option>
            <option>Cultural</option>
          </select>
          <select class="w-full md:w-1/6 p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
            <option>Duration</option>
            <option>1-3 days</option>
            <option>4-7 days</option>
            <option>8+ days</option>
          </select>
          <select class="w-full md:w-1/6 p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
            <option>Budget</option>
            <option>Economy</option>
            <option>Standard</option>
            <option>Luxury</option>
          </select>
          <button 
            class="w-full md:w-auto bg-yellow-500 text-gray-800 py-4 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- Program List Section -->
    <div class="max-w-5xl mx-auto p-6 bg-blue-100 shadow-lg rounded-lg mt-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Programs</h1>
      
      <div v-if="filteredPrograms.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="program in filteredPrograms"
          :key="program.id"
          class="bg-gray-50 p-4 shadow-lg rounded-lg"
        >
          <h2 class="text-xl font-semibold text-gray-900">{{ program.name }}</h2>
          <p class="text-gray-600">{{ program.description }}</p>
          <p class="text-gray-500">Duration: {{ program.time }}</p>
          <p class="text-yellow-500">Rating: {{ program.rating }}</p>
          <button
            @click="editProgram(program.id)"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click="deleteProgram(program.id)"
            class="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      <!-- No results message -->
      <div v-else class="text-center text-gray-600 mt-6">
        No programs found matching "{{ searchQuery }}"
      </div>
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
      searchQuery: '', // Holds the search input
      programs: [
        {
          id: 1,
          name: "Adventure in the Alps",
          description: "A thrilling adventure across the Alps.",
          time: "1 week",
          rating: 4.5
        },
        {
          id: 2,
          name: "Relaxing by the Beach",
          description: "A relaxing getaway to the tropical beaches.",
          time: "5 days",
          rating: 4.8
        },
        {
          id: 3,
          name: "Safari in Africa",
          description: "Experience the wildlife of Africa.",
          time: "10 days",
          rating: 4.7
        }
      ]
    };
  },
  computed: {
    filteredPrograms() {
      // Filters the programs based on the search input
      return this.programs.filter(program =>
        program.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    editProgram(id) {
      alert(`Edit program with ID: ${id}`);
    },
    deleteProgram(id) {
      alert(`Delete program with ID: ${id}`);
    }
  }
};
</script>

<style scoped>
/* Updated body background color to light blue for a more pleasant look */
.bg-light-blue-100 {
  background-color: #ebf8ff; /* Light blue */
}

.bg-gray-50 {
  background-color: #f9fafb; /* Light gray for contrast with white */
}

.bg-white {
  background-color: #ffffff; /* White for program list container */
}
</style>
