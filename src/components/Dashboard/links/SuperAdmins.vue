<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Super Admins</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Super Admin List</h2>
            <button class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out flex items-center">
              <UserPlusIcon class="h-5 w-5 mr-2" />
              Add Super Admin
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="superAdmin in superAdmins" :key="superAdmin.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="superAdmin.avatar" :alt="superAdmin.name" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ superAdmin.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ superAdmin.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {{ superAdmin.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ superAdmin.lastLogin }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3">
                      <KeyIcon class="h-5 w-5" />
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <ShieldOffIcon class="h-5 w-5" />
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
import { UserPlusIcon, KeyIcon, ShieldOffIcon } from 'lucide-vue-next';

const superAdmins = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@traveljoy.com',
    role: 'Super Admin',
    lastLogin: '1 hour ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@traveljoy.com',
    role: 'Super Admin',
    lastLogin: '2 days ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@traveljoy.com',
    role: 'Super Admin',
    lastLogin: '5 hours ago',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  // Add more super admin objects as needed
]);
</script>