<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Program Applications</h2>
          
          <div v-if="isLoading" class="text-center py-4">
            <p class="text-gray-600">Loading applications...</p>
          </div>

          <div v-else-if="error" class="text-center py-4">
            <p class="text-red-600">{{ error }}</p>
          </div>

          <div v-else-if="applications.length === 0" class="text-center py-4">
            <p class="text-gray-600">You haven't applied to any programs yet.</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="application in applications" :key="application.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full object-cover" :src="getProgramImage(application.program)" :alt="application.program.name" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ application.program.name }}</div>
                        <div class="text-sm text-gray-500">{{ application.program.location }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ formatDate(application.program.starting_date) }} - 
                      {{ formatDate(calculateEndDate(application.program)) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getStatusClass(application.program)
                    ]">
                      {{ getStatus(application.program) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="viewApplication(application.program.id, application.id)" class="text-blue-600 hover:text-blue-900">
                      <EyeIcon class="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { EyeIcon } from 'lucide-vue-next';
import { format, addDays, isBefore, isWithinInterval } from 'date-fns';

const store = useStore();

onMounted(() => {
  store.dispatch('applications/fetchAllApplications');
});

const applications = computed(() => store.getters['applications/getApplications']);
const isLoading = computed(() => store.getters['applications/isLoading']);
const error = computed(() => store.getters['applications/getError']);

const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy');
};

const calculateEndDate = (program) => {
  const startDate = new Date(program.starting_date);
  return addDays(startDate, program.duration); 
};

const getStatus = (program) => {
  const today = new Date();
  const startDate = new Date(program.starting_date);
  const endDate = calculateEndDate(program);

  if (isBefore(today, startDate)) {
    return 'Attending';
  } else if (isWithinInterval(today, { start: startDate, end: endDate })) {
    return 'Ongoing';
  } else {
    return 'Finished';
  }
};

const getStatusClass = (program) => {
  const status = getStatus(program);
  switch (status) {
    case 'Attending':
      return 'bg-green-100 text-green-800';
    case 'Ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'Finished':
      return 'bg-gray-100 text-gray-800';
    default:
      return '';
  }
};

const getProgramImage = (program) => {
  return program.media && program.media.length > 0
    ? `http://localhost:8000/storage${program.media[0].url}`
    : '/placeholder.svg?height=40&width=40';
};

const viewApplication = (programId, applicationId) => {
  // Implement view application logic here
  console.log(`Viewing application ${applicationId} for program ${programId}`);
};
</script>