<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">My Trips</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Your programs</h2>
            <button @click="openAddProgramModal" class="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center">
              <PlusIcon class="h-5 w-5 mr-2" />
              Add New Trip
            </button>
          </div>
          
          <div v-if="loading" class="text-center py-4">
            <LoaderIcon class="animate-spin h-8 w-8 mx-auto text-blue-500" />
            <p class="mt-2 text-gray-600">Loading your trips...</p>
          </div>

          <div v-else-if="error" class="text-center py-4">
            <AlertCircleIcon class="h-8 w-8 mx-auto text-red-500" />
            <p class="mt-2 text-red-600">{{ error }}</p>
          </div>

          <div v-else-if="userPrograms.length === 0" class="text-center py-4">
            <InboxIcon class="h-8 w-8 mx-auto text-gray-400" />
            <p class="mt-2 text-gray-600">You haven't added any trips yet.</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="program in userPrograms" :key="program.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full object-cover" :src="program.images[0]" :alt="program.name" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ program.name }}</div>
                        <div class="text-sm text-gray-500">{{ program.location }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ program.duration }} days</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${{ program.price }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button @click="editProgram(program.id)" class="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon class="h-5 w-5" />
                    </button>
                    <button @click="deleteProgram(program.id)" class="text-red-600 hover:text-red-900">
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

    <div v-if="showProgramModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">{{ editingProgramId ? 'Edit' : 'Add' }} Program</h2>
        <form @submit.prevent="saveProgramChanges" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" v-model="programForm.name" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="location" v-model="programForm.location" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700">Duration (days)</label>
            <input type="number" id="duration" v-model="programForm.duration" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <input type="number" id="price" v-model="programForm.price" required class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" v-model="programForm.description" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save</button>
            <button type="button" @click="closeProgramModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { PlusIcon, PencilIcon, TrashIcon, LoaderIcon, AlertCircleIcon, InboxIcon } from 'lucide-vue-next';

const store = useStore();

const loading = ref(true);
const error = ref(null);
const showProgramModal = ref(false);
const editingProgramId = ref(null);
const programForm = ref({
  name: '',
  location: '',
  duration: '',
  price: '',
  description: '',
});

const user = computed(() => store.getters['user/user']);
const allPrograms = computed(() => store.getters['programD/allPrograms']);
const userPrograms = computed(() => {
  return allPrograms.value.filter(program => program.user_id === user.value?.id);
});

onMounted(async () => {
  try {
    await store.dispatch('user/fetchUser');
    await store.dispatch('programD/fetchPrograms');
    loading.value = false;
  } catch (err) {
    error.value = 'Failed to load programs. Please try again later.';
    loading.value = false;
  }
});

const openAddProgramModal = () => {
  editingProgramId.value = null;
  programForm.value = {
    name: '',
    location: '',
    duration: '',
    price: '',
    description: '',
  };
  showProgramModal.value = true;
};

const editProgram = (id) => {
  const program = userPrograms.value.find(p => p.id === id);
  if (program) {
    editingProgramId.value = id;
    programForm.value = { ...program };
    showProgramModal.value = true;
  }
};

const deleteProgram = async (id) => {
  if (confirm('Are you sure you want to delete this program?')) {
    try {
      await store.dispatch('programD/deleteProgram', id);
    } catch (err) {
      error.value = 'Failed to delete program. Please try again.';
    }
  }
};

const saveProgramChanges = async () => {
  try {
    if (editingProgramId.value) {
      await store.dispatch('programD/updateProgram', { 
        id: editingProgramId.value, 
        updatedData: { ...programForm.value, user_id: user.value.id }
      });
    } else {
      await store.dispatch('programD/addProgram', { 
        ...programForm.value, 
        user_id: user.value.id 
      });
    }
    showProgramModal.value = false;
  } catch (err) {
    error.value = 'Failed to save program. Please try again.';
  }
};

const closeProgramModal = () => {
  showProgramModal.value = false;
  editingProgramId.value = null;
};
</script>