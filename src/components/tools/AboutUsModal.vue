<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">About Us</h2>
        <p class="mb-6">
          At TravelEASE, we are a company dedicated to helping you and facilitating all your travels. Whether you want to travel with us or with your friends, we are what you're looking for to accompany you during your adventure.
        </p>
        <button @click="closeModal" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
          Close
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutUsModal',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    setup(props, { emit }) {
      const closeModal = () => {
        emit('close');
      };
  
      return {
        closeModal
      };
    }
  };
  </script>