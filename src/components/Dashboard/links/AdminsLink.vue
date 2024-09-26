<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Admins</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Admin List</h2>
            <button class="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center">
              <UserPlusIcon class="h-5 w-5 mr-2" />
              Add New Admin
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="admin in admins" :key="admin.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="admin.avatar" :alt="admin.name" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ admin.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ admin.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ admin.department }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ admin.lastActive }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon class="h-5 w-5" />
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <TrashIcon class="h-5 w-5" />
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
import { UserPlusIcon, PencilIcon, TrashIcon } from 'lucide-vue-next';

const admins = ref([
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@traveljoy.com',
    department: 'Customer Support',
    lastActive: '2 hours ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Sarah Lee',
    email: 'sarah.lee@traveljoy.com',
    department: 'Marketing',
    lastActive: '1 day ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Mike Brown',
    email: 'mike.brown@traveljoy.com',
    department: 'Operations',
    lastActive: '3 hours ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  // Add more admin objects as needed
]);
</script>