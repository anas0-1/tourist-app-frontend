<template>
    <div class="bg-white rounded-xl shadow-lg p-8 mb-12 animate__animated animate__fadeInUp">
      <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">Your Adventure Timeline</h2>
      <div class="relative">
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
        <div v-for="(activity, index) in program.activities" :key="activity.id" 
             class="relative mb-10"
             :class="{ 'md:ml-1/2': index % 2 === 0, 'md:mr-1/2': index % 2 !== 0 }">
          <div class="bg-white rounded-lg border border-blue-200 p-6 shadow-md transition duration-300 transform hover:scale-105">
            <div class="flex items-center mb-2">
              <component :is="getActivityIcon(activity)" class="h-6 w-6 text-blue-500 mr-3" />
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
  </template>
  
  <script>
  import { MapPinIcon, ClockIcon, HikeIcon, UtensilsIcon } from 'lucide-vue-next';
  
  export default {
    name: 'ActivitiesTimeline',
    components: {
      MapPinIcon,
      ClockIcon,
      HikeIcon,
      UtensilsIcon
    },
    props: {
      program: {
        type: Object,
        required: true
      }
    },
    methods: {
      getActivityIcon(activity) {
        if (activity.name.toLowerCase().includes('hike')) return 'HikeIcon';
        if (activity.name.toLowerCase().includes('meal')) return 'UtensilsIcon';
        return 'ClockIcon';
      }
    }
  }
  </script>