<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
    <NavBar />
    <SearchBar @filter-change="applyFilters" />
    <!-- Program List Section -->
    <section class="py-16 bg-amber-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Discover Extraordinary Journeys</h2>
        
        <div v-if="filteredPrograms.length > 0" class="flex flex-wrap gap-8 justify-center">
          <ProgramCard
            v-for="program in filteredPrograms"
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
import NavBar from '@/components/tools/NavBar.vue';
import AppFooter from '@/components/tools/Footer.vue';
import SearchBar from '@/components/Programs list/SearchBar.vue';
import ProgramCard from '@/components/Programs list/ProgramCard.vue';

export default {
  components: {
    NavBar,
    AppFooter,
    SearchBar,
    ProgramCard
  },
  data() {
    return {
      searchQuery: '',
      selectedDuration: '',
      selectedPrice: '',
      filteredPrograms: []
    };
  },
  computed: {
    ...mapGetters('program', ['allPrograms']),
  },
  mounted() {
    this.fetchPrograms();
  },
  watch: {
    allPrograms: {
      immediate: true,
      handler() {
        this.filteredPrograms = this.allPrograms;
      }
    }
  },
  methods: {
    ...mapActions('program', ['fetchPrograms']),
    
    applyFilters({ searchQuery, selectedDuration, selectedPrice }) {
      this.filteredPrograms = this.allPrograms.filter(program => {
        const matchesQuery = !searchQuery || program.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDuration = !selectedDuration || this.checkDuration(program.duration, selectedDuration);
        const matchesPrice = !selectedPrice || program.price <= selectedPrice;

        return matchesQuery && matchesDuration && matchesPrice;
      });
    },
    checkDuration(programDuration, selectedDuration) {
      const days = parseInt(programDuration); // Convert program duration to an integer (assuming duration is in days)
      if (selectedDuration === '1-3 days') return days >= 1 && days <= 3;
      if (selectedDuration === '4-7 days') return days >= 4 && days <= 7;
      if (selectedDuration === '8-14 days') return days >= 8 && days <= 14;
      if (selectedDuration === '15+ days') return days >= 15;
      return true;
    }
  }
};
</script>
