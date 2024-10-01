<template>
  <div class="bg-white rounded-xl shadow-lg p-8 mb-8 animate__animated animate__fadeInUp">
    <h2 class="text-3xl font-semibold text-gray-800 mb-4">About This Adventure</h2>
    <p class="text-gray-600 text-lg mb-6">{{ program.description }}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div v-for="(feature, index) in programFeatures" :key="index" class="flex items-center">
        <component :is="feature.icon" class="h-6 w-6 text-blue-500 mr-2" />
        <span class="text-gray-700">{{ feature.text }}</span>
      </div>
    </div>
    <div class="mt-6">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Weather in {{ program.location }}</h3>
      <div v-if="isLoading" class="bg-gray-100 rounded-lg p-4">
        <p class="text-gray-600">Loading weather information...</p>
      </div>
      <div v-else-if="weatherData" class="bg-gray-100 rounded-lg p-4">
        <p class="font-semibold">{{ formatDate(weatherData.dt) }}</p>
        <div class="flex items-center">
          <img :src="`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`" :alt="weatherData.weather[0].description" class="mr-2">
          <span class="text-2xl">{{ Math.round(weatherData.main.temp) }}°C</span>
        </div>
        <p class="text-lg text-gray-700 capitalize">{{ weatherData.weather[0].description }}</p>
        <p class="text-sm text-gray-600">Humidity: {{ weatherData.main.humidity }}%</p>
        <p class="text-sm text-gray-600">Wind: {{ weatherData.wind.speed }} m/s</p>
      </div>
      <div v-else-if="error" class="bg-red-100 rounded-lg p-4">
        <p class="text-red-600">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Calendar, MapPin, Users, Camera, CloudRain } from 'lucide-vue-next';

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
    Camera,
    CloudRain
  },
  setup(props) {
    const weatherData = ref(null);
    const isLoading = ref(true);
    const error = ref(null);

    const programFeatures = [
      { icon: Calendar, text: `${props.program.duration} days` },
      { icon: MapPin, text: `${props.program.location}` },
      { icon: Users, text: 'Small groups for personalized experience' },
      { icon: Camera, text: 'Insta-worthy photo opportunities' },
      { icon: CloudRain, text: 'Weather information available' }
    ];

    const fetchWeatherData = async () => {
      const API_KEY = 'f7a03054fdf990a6a1ce6717ca3e54b9';
      const city = encodeURIComponent(props.program.location);
      
      try {
        isLoading.value = true;
        error.value = null;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        
        if (data.cod === 200) {
          weatherData.value = data;
        } else {
          error.value = `Error: ${data.message}`;
        }
      } catch (err) {
        error.value = 'Error fetching weather data. Please try again later.';
        console.error('Error fetching weather data:', err);
      } finally {
        isLoading.value = false;
      }
    };

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    onMounted(() => {
      fetchWeatherData();
    });

    return {
      programFeatures,
      weatherData,
      isLoading,
      error,
      formatDate
    };
  }
};
</script>