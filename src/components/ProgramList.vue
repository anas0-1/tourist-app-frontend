<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
    <NavBar />
    <SearchBar />
    <!-- Program List Section -->
    <section class="py-16 bg-amber-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Discover Extraordinary Journeys</h2>
        
        <div v-if="programs.length > 0" class="flex flex-wrap gap-8 justify-center">
          <ProgramCard
            v-for="program in programs"
            :key="program.id"
            :program="program"
          />
        </div>

        <!-- No results message -->
        <div v-else class="text-center text-gray-600 mt-6 p-8 bg-white rounded-lg shadow">
          <i class="fas fa-search text-5xl text-gray-400 mb-4"></i>
          <p class="text-xl">No adventures found matching your search.</p>
          <p class="mt-2">Try adjusting your filters or explore our trending destinations!</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-yellow-400">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Ready for your next adventure?</h2>
        <p class="text-xl text-gray-700 mb-8">Join our community and get exclusive travel deals!</p>
        <button class="bg-blue-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 transform hover:scale-105">
          Sign Up Now
        </button>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/Footer.vue';
import SearchBar from '@/components/SearchBar.vue';
import ProgramCard from '@/components/ProgramCard.vue';

export default {
  components: {
    NavBar,
    AppFooter,
    SearchBar,
    ProgramCard
  },
  computed: {
    ...mapGetters('program', ['allPrograms']), 
    programs() {
      return this.allPrograms || [];
    }
},
mounted() {
    this.fetchPrograms(); 
  },

  methods: {
    ...mapActions('program', ['fetchPrograms', 'addProgram', 'updateProgram', 'deleteProgram']) 
  }
};
</script>

<style scoped>
/* Add any specific styles for homepage.vue */
</style>
