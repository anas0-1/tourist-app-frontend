<template>
    <div class="bg-white shadow rounded-lg p-6 mt-6">
      <h2 class="text-2xl font-bold mb-4">Rate this Program</h2>
      <div class="flex items-center mb-4">
        <template v-for="star in 5" :key="star">
          <svg
            @click="setRating(star)"
            :class="['w-8 h-8 cursor-pointer', star <= currentRating ? 'text-yellow-400' : 'text-gray-300']"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </template>
      </div>
      <button
        @click="submitRating"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Submit Rating
      </button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    props: {
      programId: {
        type: Number,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
      const currentRating = ref(0);
  
      const setRating = (rating) => {
        currentRating.value = rating;
      };
  
      const submitRating = async () => {
        if (currentRating.value === 0) return;
        
        try {
          await store.dispatch('programD/rateProgram', {
            programId: props.programId,
            rating: currentRating.value,
          });
          // You might want to show a success message here
        } catch (error) {
          console.error('Failed to submit rating:', error);
          // You might want to show an error message here
        }
      };
  
      return {
        currentRating,
        setRating,
        submitRating,
      };
    },
  };
  </script>