<template>
    <div class="mb-12 animate__animated animate__fadeInUp">
      <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Gallery</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(image, index) in program.images" :key="index" 
             class="relative h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden cursor-pointer"
             @click="openLightbox(index)">
          <img :src="image" :alt="`${program.name} image ${index + 1}`" class="w-full h-full object-cover object-center transition duration-300 transform hover:scale-110">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GallerySection',
    props: {
      program: {
        type: Object,
        required: true
      }
    },
    methods: {
      openLightbox(index) {
        this.$emit('open-lightbox', index);
      }
    }
  }
  </script>