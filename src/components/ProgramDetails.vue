<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
    <NavBar />
    <div v-if="!program" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div v-else-if="error" class="container mx-auto px-4 py-8 text-center">
      <p class="text-red-500 text-xl">{{ error }}</p>
    </div>
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="relative h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
        <img :src="program.images[0]" :alt="program.name" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div class="p-8">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">{{ program.name }}</h1>
            <p class="text-xl text-white">{{ program.duration }} days</p>
          </div>
        </div>
      </div>

      <!-- Program Details -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">About This Adventure</h2>
        <p class="text-gray-600 text-lg mb-6">{{ program.description }}</p>
        <div class="flex flex-wrap -mx-2">
          <div v-for="(feature, index) in programFeatures" :key="index" class="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div class="flex items-center">
              <component :is="feature.icon" class="h-6 w-6 text-blue-500 mr-2" />
              <span class="text-gray-700">{{ feature.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Gallery -->
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Gallery</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="(image, index) in program.images" :key="index" 
               class="relative h-48 rounded-lg overflow-hidden cursor-pointer"
               @click="openLightbox(index)">
            <img :src="image" :alt="`${program.name} image ${index + 1}`" class="w-full h-full object-cover transition duration-300 transform hover:scale-110">
          </div>
        </div>
      </div>

      <!-- Activities Timeline -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-6">Your Adventure Timeline</h2>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
          <div v-for="(activity, index) in program.activities" :key="activity.id" 
               class="relative mb-8"
               :class="{ 'md:ml-1/2': index % 2 === 0, 'md:mr-1/2': index % 2 !== 0 }">
            <div class="bg-white rounded-lg border border-blue-200 p-6 shadow-md">
              <div class="flex items-center mb-2">
                <component :is="getActivityIcon(activity)" class="h-6 w-6 text-blue-500 mr-2" />
                <h3 class="text-xl font-semibold text-gray-800">{{ activity.name }}</h3>
                
              </div>
              <p class="text-gray-600 mb-2">{{ activity.description }}</p>
              <p class="text-gray-600 mb-2">{{ activity.time }}</p>
              <p class="text-gray-600 mb-2">{{ activity.duration }}</p>
              <p class="text-gray-600 mb-2">{{ activity.location }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Section -->
      <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-semibold text-white mb-6">Ready to Embark?</h2>
        <form @submit.prevent="submitBooking" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-white mb-1">Full Name</label>
            <input id="name" v-model="booking.name" type="text" required
                   class="w-full px-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
                   placeholder="Your full name">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-white mb-1">Email</label>
            <input id="email" v-model="booking.email" type="email" required
                   class="w-full px-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
                   placeholder="Your email address">
          </div>
          <div>
            <label for="date" class="block text-sm font-medium text-white mb-1">Preferred Date</label>
            <input id="date" v-model="booking.date" type="date" required
                   class="w-full px-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white">
          </div>
          <div>
            <label for="participants" class="block text-sm font-medium text-white mb-1">Number of Adventurers</label>
            <input id="participants" v-model="booking.participants" type="number" required min="1"
                   class="w-full px-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white">
          </div>
          <div class="md:col-span-2">
            <button type="submit"
                    class="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-md hover:bg-blue-50 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Book Your Adventure
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Image Lightbox -->
    <div v-if="lightboxOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <button @click="closeLightbox" class="absolute top-4 right-4 text-white text-4xl">&times;</button>
      <img :src="program.images[currentImageIndex]" :alt="`${program.name} image ${currentImageIndex + 1}`" class="max-w-full max-h-full">
      <button @click="prevImage" class="absolute left-4 text-white text-4xl">&lt;</button>
      <button @click="nextImage" class="absolute right-4 text-white text-4xl">&gt;</button>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/Footer.vue';
import { MapPinIcon, ClockIcon, CalendarIcon, UsersIcon, CameraIcon, UtensilsIcon, HikeIcon } from 'lucide-vue-next';

export default {
  name: 'ProgramDetails',
  components: {
    NavBar,
    AppFooter,
    MapPinIcon,
    ClockIcon,
    CalendarIcon,
    UsersIcon,
    CameraIcon,
    UtensilsIcon,
    HikeIcon,
  },
  data() {
    return {
      error: null,
      lightboxOpen: false,
      currentImageIndex: 0,
      booking: {
        name: '',
        email: '',
        date: '',
        participants: 1,
      },
    };
  },
  computed: {
    ...mapState({
      program: state => state.programD.currentProgram,
    }),
    programFeatures() {
      if (!this.program) return [];
      return [
        { icon: 'CalendarIcon', text: `${this.program.duration} days` },
        { icon: 'MapPinIcon', text: 'Multiple exciting locations' },
        { icon: 'UsersIcon', text: 'Small groups for personalized experience' },
        { icon: 'CameraIcon', text: 'Insta-worthy photo opportunities' },
      ];
    },
  },
  async created() {
    const programId = this.$route.params.id;
    await this.fetchProgram(programId);
  },
  methods: {
    async fetchProgram(programId) {
      try {
        await this.$store.dispatch('programD/fetchProgramById', programId);
      } catch (error) {
        this.error = 'Failed to fetch program data';
        console.error(error);
      }
    },
    getActivityIcon(activity) {
      if (activity.name.toLowerCase().includes('hike')) return 'HikeIcon';
      if (activity.name.toLowerCase().includes('meal')) return 'UtensilsIcon';
      return 'ClockIcon';
    },
    openLightbox(index) {
      this.currentImageIndex = index;
      this.lightboxOpen = true;
    },
    closeLightbox() {
      this.lightboxOpen = false;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.program.images.length) % this.program.images.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.program.images.length;
    },
    submitBooking() {
      // Implement booking submission logic here
      console.log('Booking submitted:', this.booking);
      alert('Booking submitted successfully!');
      this.booking = { name: '', email: '', date: '', participants: 1 };
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>