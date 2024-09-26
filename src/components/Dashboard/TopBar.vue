<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1> 
      <div class="flex items-center">
        <button class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <BellIcon class="h-6 w-6" />
        </button>
        <button class="ml-3 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <CogIcon class="h-6 w-6" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { BellIcon, CogIcon } from 'lucide-vue-next';
import { defineProps } from 'vue';

// Define props and let Vue handle them automatically
defineProps({
  title: {
    type: String,
    required: true,
  }
});
</script>
