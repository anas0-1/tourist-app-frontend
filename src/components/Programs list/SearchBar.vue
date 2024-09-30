<template>
  <section class="relative py-20 bg-cover bg-center background-image">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-8 text-center leading-tight">
        Discover Your <span class="text-yellow-400">Dream Destination</span>
      </h1>
      <p class="text-xl text-white text-center mb-12 max-w-2xl mx-auto">
        Embark on unforgettable journeys tailored to your preferences. Find your perfect adventure today!
      </p>
      <div class="bg-white p-6 rounded-xl shadow-2xl max-w-5xl mx-auto transition-all duration-300 hover:shadow-3xl">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <!-- Search by Name -->
          <div class="w-full md:w-1/3 relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Where do you want to go?" 
              class="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent pl-12"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- Filter by Duration -->
          <div class="w-full md:w-1/5 relative">
            <select 
              v-model="selectedDuration" 
              @change="emitFilterChange" 
              class="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
            >
              <option value="">Duration</option>
              <option>1-3 days</option>
              <option>4-7 days</option>
              <option>8-14 days</option>
              <option>15+ days</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>

          <!-- Filter by Price -->
          <div class="w-full md:w-1/5 relative">
            <input 
              type="number" 
              v-model="selectedPrice" 
              placeholder="Max Price" 
              class="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              step="0.01" 
              min="0" 
            />
          </div>

          <!-- Search Button -->
          <button 
            @click="searchPrograms"
            class="w-full md:w-auto bg-yellow-500 text-gray-800 py-4 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
          >
            Find Adventures
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.background-image {
  background-image: url('@/assets/Fecran.jpg');
  background-size: cover; /* Ensures the image covers the entire section */
  background-position: center; /* Centers the image */
}
</style>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedDuration: '',
      selectedPrice: ''  
    };
  },
  methods: {
    emitFilterChange() {
      this.$emit('filter-change', {
        searchQuery: this.searchQuery,
        selectedDuration: this.selectedDuration,
        selectedPrice: this.selectedPrice ? parseFloat(this.selectedPrice).toFixed(2) : ''  // Format to two decimal places
      });
    },
    searchPrograms() {
      this.emitFilterChange();
      this.$emit('search');
    }
  }
}
</script>
