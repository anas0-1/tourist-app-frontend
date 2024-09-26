<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Users</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">All Users</h2>
            <div class="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search users..." 
                class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
                Search
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="user.name" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.joinedDate }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3">
                      <EyeIcon class="h-5 w-5" />
                    </button>
                    <button class="text-yellow-600 hover:text-yellow-900">
                      <MessageSquareIcon class="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-4 flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">97</span> results
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { EyeIcon, MessageSquareIcon } from 'lucide-vue-next';

const users = ref([
  {
    id: 1,
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'User',
    joinedDate: 'Jan 15, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Cody Fisher',
    email: 'cody.fisher@example.com',
    role: 'User',
    joinedDate: 'Feb 3, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Esther Howard',
    email: 'esther.howard@example.com',
    role: 'User',
    joinedDate: 'Mar 20, 2023',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  // Add more user objects as needed
]);
</script>