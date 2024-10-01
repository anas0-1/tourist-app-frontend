<template>
  <main class="flex-1 overflow-y-auto bg-blue-50 p-6">
    <!-- Welcome Section -->
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900">Welcome back, {{ userName }}!</h2>
      <p class="mt-2 text-sm text-gray-600">Ready for your next adventure? Let's explore what's new.</p>
    </div>

    <!-- Quick Stats -->
    <div class="mt-6 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in quickStats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <component :is="stat.icon" class="h-6 w-6 text-white" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stat.value }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Trips -->
    <div class="mt-8 max-w-7xl mx-auto">
      <h2 class="text-lg leading-6 font-medium text-gray-900">Upcoming Trips</h2>
      <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="trip in upcomingTrips" :key="trip.id" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img :src="trip.image" :alt="trip.name" class="h-12 w-12 rounded-full object-cover" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <h3 class="text-lg font-medium text-gray-900 truncate">{{ trip.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">
                  {{ formatDate(trip.starting_date) }} - {{ formatDate(trip.ending_date) }}
                </p>
              </div>
            </div>
            <div class="mt-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {{ trip.status }}
              </span>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link :to="{ name: 'ProgramDetails', params: { id: trip.id } }" class="font-medium text-blue-600 hover:text-blue-500">
                View details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Travel Tips -->
    <div class="mt-8 max-w-7xl mx-auto">
      <h2 class="text-lg leading-6 font-medium text-gray-900">Travel Tips</h2>
      <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="tip in travelTips" :key="tip.id" class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900">{{ tip.title }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ tip.description }}</p>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { MapIcon, CalendarIcon, UserGroupIcon, CurrencyDollarIcon } from 'lucide-vue-next';
import { format } from 'date-fns';

const store = useStore();

onMounted(() => {
  store.dispatch('programD/fetchAllPrograms');
  store.dispatch('applications/fetchAllApplications');
  store.dispatch('user/fetchUser');
});

const userName = computed(() => store.getters['user/user']?.name || 'Traveler');

const quickStats = computed(() => [
  { name: 'Total Trips', value: store.getters['programD/allPrograms'].length, icon: MapIcon },
  { name: 'Upcoming Trips', value: upcomingTrips.value.length, icon: CalendarIcon },
  { name: 'Travel Budget', value: `$${calculateTotalBudget()}`, icon: CurrencyDollarIcon },
  { name: 'Travel Buddies', value: store.getters['applications/getApplications'].length, icon: UserGroupIcon },
]);

const upcomingTrips = computed(() => {
  const today = new Date();
  return store.getters['programD/allPrograms']
    .filter(program => new Date(program.starting_date) > today)
    .slice(0, 3)
    .map(program => ({
      id: program.id,
      name: program.name,
      starting_date: program.starting_date,
      ending_date: program.ending_date || program.starting_date,
      status: 'Upcoming',
      image: program.images[0] || '/placeholder.svg?height=48&width=48',
    }));
});

const travelTips = [
  {
    id: 1,
    title: 'Packing Essentials',
    description: 'Learn how to pack efficiently for any type of trip.',
  },
  {
    id: 2,
    title: 'Budget Travel Hacks',
    description: 'Discover tips to save money while traveling without sacrificing experiences.',
  },
  {
    id: 3,
    title: 'Sustainable Tourism',
    description: 'Explore ways to minimize your environmental impact while traveling.',
  },
];

function calculateTotalBudget() {
  return store.getters['programD/allPrograms']
    .reduce((total, program) => total + (parseFloat(program.price) || 0), 0)
    .toFixed(2);
}

function formatDate(dateString) {
  return format(new Date(dateString), 'MMM dd, yyyy');
}
</script>