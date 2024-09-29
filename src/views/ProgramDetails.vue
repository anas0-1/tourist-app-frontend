<template>
  <div class="min-h-screen bg-gray-50">
    <nav-bar />
    <div v-if="!program" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    <div v-else-if="error" class="container mx-auto px-4 py-8 text-center">
      <p class="text-red-500 text-xl">{{ error }}</p>
    </div>
    <div v-else class="container mx-auto px-4 py-8">
      <hero-section :program="program" />
      <program-details-section :program="program" />
      <gallery-section :program="program" @open-lightbox="openLightbox" />
      <activities-timeline :program="program" />
      <rating-section :programId="program.id" />
      <BookingSection :programId="program.id" />

      <!-- Image Lightbox -->
      <div v-if="lightboxOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 animate__animated animate__fadeIn">
        <button @click="closeLightbox" class="absolute top-4 right-4 text-white text-4xl">&times;</button>
        <img :src="program.images[currentImageIndex]" :alt="`${program.name} image ${currentImageIndex + 1}`" class="max-w-full max-h-full animate__animated animate__zoomIn">
        <button @click="prevImage" class="absolute left-4 text-white text-4xl">&lt;</button>
        <button @click="nextImage" class="absolute right-4 text-white text-4xl">&gt;</button>
      </div>

      <app-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from '@/components/tools/NavBar.vue';
import AppFooter from '@/components/tools/Footer.vue';
import HeroSection from '@/components/Program Details/HeroSection1.vue';
import ProgramDetailsSection from '@/components/Program Details/ProgramDetailsSection.vue';
import GallerySection from '@/components/Program Details/GallerySection.vue';
import ActivitiesTimeline from '@/components/Program Details/ActivitiesTimeline.vue';
import RatingSection from '@/components/Program Details/RatingSection.vue';
import BookingSection from '@/components/Program Details/BookingSection.vue';
import 'animate.css';

export default {
  name: 'ProgramDetails',
  components: {
    NavBar,
    AppFooter,
    HeroSection,
    ProgramDetailsSection,
    GallerySection,
    ActivitiesTimeline,
    RatingSection,
    BookingSection
  },
  data() {
    return {
      error: null,
      lightboxOpen: false,
      currentImageIndex: 0
    };
  },
  computed: {
    ...mapState({
      program: state => state.programD.currentProgram
    }),
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
    }
  }
};
</script>

<style scoped>
@import 'animate.css';
</style>