<template>
  <div class="bg-blue-50 min-h-screen p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">My Trips</h1>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">Your Programs</h2>
            <router-link
              :to="{ name: 'CreateProgram' }"
              class="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-300 ease-in-out flex items-center"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Add New Trip
            </router-link>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="program in userPrograms" :key="program.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
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
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ formatDate(program.starting_date) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center space-x-2">
                      <router-link
                        :to="{ name: 'EditProgram', params: { id: program.id } }"
                        class="text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon class="h-5 w-5" />
                      </router-link>
                      <button @click="confirmDelete(program.id)" class="text-red-600 hover:text-red-900">
                        <TrashIcon class="h-5 w-5" />
                      </button>
                      <button @click="openApplicantModal(program)" class="text-green-600 hover:text-green-900">
                        <UsersIcon class="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-4">Are you sure you want to delete this program? This action cannot be undone.</p>
        <div class="flex justify-end space-x-2">
          <button @click="deleteProgram" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
          <button @click="showDeleteModal = false" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Applicant Modal -->
    <ApplicantModal
      :is-open="showApplicantModal"
      :program-id="selectedProgram?.id"
      :program-name="selectedProgram?.name"
      @close="closeApplicantModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { PlusIcon, PencilIcon, TrashIcon, LoaderIcon, AlertCircleIcon, InboxIcon, UsersIcon } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';
import ApplicantModal from '@/components/tools/applicantModal.vue';
import { format } from 'date-fns';

const store = useStore();
const toast = useToast();

const loading = ref(true);
const error = ref(null);
const showDeleteModal = ref(false);
const programToDelete = ref(null);
const showApplicantModal = ref(false);
const selectedProgram = ref(null);

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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return format(new Date(dateString), 'MMM d, yyyy');
};

const confirmDelete = (id) => {
  programToDelete.value = id;
  showDeleteModal.value = true;
};

const deleteProgram = async () => {
  try {
    await store.dispatch('programD/deleteProgram', programToDelete.value);
    toast.success('Program deleted successfully');
    showDeleteModal.value = false;
  } catch (err) {
    toast.error('Failed to delete program. Please try again.');
  }
};

const openApplicantModal = (program) => {
  selectedProgram.value = program;
  showApplicantModal.value = true;
};

const closeApplicantModal = () => {
  showApplicantModal.value = false;
  selectedProgram.value = null;
};
</script>