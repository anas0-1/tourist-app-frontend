<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Personal Information</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <form @submit.prevent="updateProfile">
            <div class="mb-6">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                id="name" 
                v-model="user.name" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div class="mb-6">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                id="email" 
                v-model="user.email" 
                type="email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div class="mb-6">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input 
                id="password" 
                v-model="user.newPassword" 
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div class="mb-6">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input 
                id="confirmPassword" 
                v-model="user.confirmPassword" 
                type="password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div class="flex justify-between items-center">
              <button 
                type="submit" 
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center"
              >
                <SaveIcon class="h-5 w-5 mr-2" />
                Update Profile
              </button>
              <button 
                @click="showDeleteConfirmation = true" 
                type="button" 
                class="text-red-600 hover:text-red-800 transition duration-300 ease-in-out flex items-center"
              >
                <TrashIcon class="h-5 w-5 mr-2" />
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Delete Account Confirmation Modal -->
      <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 class="text-xl font-bold mb-4">Are you sure you want to delete your account?</h2>
          <p class="mb-6 text-gray-600">This action cannot be undone. All of your data will be permanently deleted.</p>
          <div class="flex justify-end space-x-4">
            <button 
              @click="showDeleteConfirmation = false" 
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 flex items-center"
            >
              <XIcon class="h-5 w-5 mr-2" />
              Cancel
            </button>
            <button 
              @click="deleteAccount" 
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
            >
              <TrashIcon class="h-5 w-5 mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="fixed bottom-5 right-5 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { SaveIcon, TrashIcon, XIcon } from 'lucide-vue-next';

const store = useStore();

const user = ref({
  id: null,
  name: '',
  email: '',
  newPassword: '',
  confirmPassword: '',
});

const showDeleteConfirmation = ref(false);
const successMessage = computed(() => store.getters['user/successMessage']);
const errorMessage = computed(() => store.getters['user/errorMessage']);

onMounted(async () => {
  await store.dispatch('user/fetchUser');
  const storeUser = store.getters['user/user'];
  if (storeUser) {
    user.value = { ...storeUser, newPassword: '', confirmPassword: '' };
  }
});

const updateProfile = async () => {
  if (user.value.newPassword !== user.value.confirmPassword) {
    store.commit('user/setErrorMessage', 'Passwords do not match');
    return;
  }

  const userData = {
    id: user.value.id,
    name: user.value.name,
    email: user.value.email,
  };

  if (user.value.newPassword) {
    userData.password = user.value.newPassword;
    userData.password_confirmation = user.value.confirmPassword;
  }

  await store.dispatch('user/updateUser', userData);
  user.value.newPassword = '';
  user.value.confirmPassword = '';
};

const deleteAccount = async () => {
  await store.dispatch('user/deleteUser', user.value.id);
  showDeleteConfirmation.value = false;
};
</script>