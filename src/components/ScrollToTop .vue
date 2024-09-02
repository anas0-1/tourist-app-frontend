<template>
    <div v-show="showButton" @click="scrollToTop" class="fixed bottom-8 right-8 bg-yellow-500 text-gray-800 p-2 rounded-full cursor-pointer hover:bg-yellow-400 transition duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'ScrollToTop',
    setup() {
      const showButton = ref(false);
  
      const checkScroll = () => {
        showButton.value = window.pageYOffset > 300;
      };
  
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  
      onMounted(() => {
        window.addEventListener('scroll', checkScroll);
      });
  
      onUnmounted(() => {
        window.removeEventListener('scroll', checkScroll);
      });
  
      return {
        showButton,
        scrollToTop
      };
    }
  };
  </script>