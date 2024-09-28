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
                v-model="searchQuery"
                type="text" 
                placeholder="Search users..." 
                class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <select 
                v-model="selectedRole"
                class="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <button @click="searchUsers" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
                Search
              </button>
            </div>
          </div>
          
          <div v-if="isLoading" class="text-center py-4">
            <LoaderIcon class="animate-spin h-8 w-8 mx-auto text-blue-500" />
            <p class="mt-2 text-gray-600">Loading users...</p>
          </div>

          <div v-else-if="error" class="text-center py-4">
            <AlertCircleIcon class="h-8 w-8 mx-auto text-red-500" />
            <p class="mt-2 text-red-600">{{ error }}</p>
          </div>

          <div v-else class="overflow-x-auto">
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
                <tr v-for="user in filteredUsers" :key="user.id">
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
                      {{ user.roles.join(', ') }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.joinedDate }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="showUserDetails(user.id)" class="text-blue-600 hover:text-blue-900 mr-3">
                      <EyeIcon class="h-5 w-5" />
                    </button>
                    <button 
                      v-if="canDeleteUser(user.role)"
                      @click="deleteUser(user.id)" 
                      class="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-4 flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ filteredUsers.length }}</span> results
            </div>
          </div>
        </div>
      </div>
    </div>

    <UserDetailsModal 
      :isOpen="isModalOpen" 
      :user="selectedUser" 
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';import { EyeIcon, TrashIcon, LoaderIcon, AlertCircleIcon } from 'lucide-vue-next';
import UserDetailsModal from '@/components/Dashboard/links/UserDetailsModal.vue';

const store = useStore();
const searchQuery = ref('');
const selectedRole = ref('');
const isModalOpen = ref(false);

const users = computed(() => store.getters['users/getUsers']);
const isLoading = computed(() => store.getters['users/isLoading']);
const error = computed(() => store.getters['users/getError']);
const selectedUser = computed(() => store.getters['users/getSelectedUser']);
const currentUserRole = computed(() => store.getters['role/userRoles']);
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const roleMatch = selectedRole.value ? user.role === selectedRole.value : true;
    const searchMatch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    return roleMatch && searchMatch;
  });
});

onMounted(async () => {
  await store.dispatch('role/fetchUserRole');
  await store.dispatch('users/fetchUsers');
  console.log('Fetched user role:', store.getters['role/userRoles']); 
});

const searchUsers = () => {
  // The filtering is handled by the computed property filteredUsers
};

const showUserDetails = async (userId) => {
  await store.dispatch('users/fetchUserDetails', userId);
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const canDeleteUser = (userRole) => {
  console.log('Current user role:', currentUserRole.value); // Add this for debugging
  if (currentUserRole.value === 'superadmin') return true;
  if (currentUserRole.value === 'admin' && userRole === 'user') return true;
  return false;
};
const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    await store.dispatch('users/deleteUser', userId);
  }
};
</script>