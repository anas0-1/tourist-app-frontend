<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Program Applications</h2>
          
          <div class="overflow-x-auto">
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
                        <img class="h-10 w-10 rounded-full" :src="application.image" :alt="application.program" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ application.program }}</div>
                        <div class="text-sm text-gray-500">{{ application.location }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ application.startDate }} - {{ application.endDate }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      application.status === 'Attending' ? 'bg-green-100 text-green-800' : 
                      application.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ application.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900">
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
import { ref } from 'vue';
import { EyeIcon } from 'lucide-vue-next';

const applications = ref([
  {
    id: 1,
    program: 'Summer Exchange',
    location: 'Tokyo, Japan',
    image: '/placeholder.svg?height=40&width=40',
    startDate: 'Jul 1, 2023',
    endDate: 'Aug 31, 2023',
    status: 'Attending',
  },
  {
    id: 2,
    program: 'Language Immersion',
    location: 'Barcelona, Spain',
    image: '/placeholder.svg?height=40&width=40',
    startDate: 'Sep 15, 2023',
    endDate: 'Dec 15, 2023',
    status: 'Ongoing',
  },
  {
    id: 3,
    program: 'Volunteer Abroad',
    location: 'Nairobi, Kenya',
    image: '/placeholder.svg?height=40&width=40',
    startDate: 'Feb 1, 2023',
    endDate: 'Apr 30, 2023',
    status: 'Finished',
  },
]);
</script>