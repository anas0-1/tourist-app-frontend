<template>
    <div class="bg-white rounded-xl shadow-lg p-8 mb-8 animate__animated animate__fadeInUp">
      <h2 class="text-3xl font-semibold text-gray-800 mb-4">About This Adventure</h2>
      <p class="text-gray-600 text-lg mb-6">{{ program.description }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(feature, index) in programFeatures" :key="index" class="flex items-center">
          <component :is="feature.icon" class="h-6 w-6 text-blue-500 mr-2" />
          <span class="text-gray-700">{{ feature.text }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Calendar, MapPin, Users, Camera } from 'lucide-vue-next'; // Import icons
  
  export default {
    name: 'ProgramDetailsSection',
    props: {
      program: {
        type: Object,
        required: true
      }
    },
    components: {
      Calendar,
      MapPin,
      Users,
      Camera
    },
    computed: {
      programFeatures() {
        if (!this.program) return [];
        return [
          { icon: 'Calendar', text: `${this.program.duration} days` },
          { icon: 'MapPin', text: `${this.program.location}` },
          { icon: 'Users', text: 'Small groups for personalized experience' },
          { icon: 'Camera', text: 'Insta-worthy photo opportunities' }
        ];
      }
    }
  };
  </script>
  