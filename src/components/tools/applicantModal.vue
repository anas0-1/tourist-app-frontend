<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">Applicants for {{ programName }}</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <XIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
        <div v-if="isLoading" class="text-center py-4">
          <LoaderIcon class="animate-spin h-8 w-8 mx-auto text-blue-500" />
          <p class="mt-2 text-gray-600">Loading applicants...</p>
        </div>

        <div v-else-if="error" class="text-center py-4">
          <AlertCircleIcon class="h-8 w-8 mx-auto text-red-500" />
          <p class="mt-2 text-red-600">{{ error }}</p>
        </div>

        <div v-else-if="applications.length === 0" class="text-center py-4">
          <InboxIcon class="h-8 w-8 mx-auto text-gray-400" />
          <p class="mt-2 text-gray-600">No applicants for this program yet.</p>
        </div>

        <div v-else class="space-y-4">
          <div v-for="applicant in applications" :key="applicant.id" class="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ applicant.first_name }} {{ applicant.last_name }}</h3>
              <p class="text-sm text-gray-600">{{ applicant.email }}</p>
              <p class="text-sm text-gray-600">Tickets: {{ applicant.tickets }}</p>
            </div>
            <button @click="deleteApplicant(applicant.id)" class="text-red-600 hover:text-red-800 focus:outline-none">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { XIcon, LoaderIcon, AlertCircleIcon, InboxIcon, TrashIcon } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

const props = defineProps({
  isOpen: Boolean,
  programId: Number,
  programName: String,
});

const emit = defineEmits(['close']);

const store = useStore();
const toast = useToast();

const applications = computed(() => store.getters['applications/getApplications']);
const isLoading = computed(() => store.getters['applications/isLoading']);
const error = computed(() => store.getters['applications/getError']);

const fetchApplicants = async () => {
  try {
    await store.dispatch('applications/fetchApplications', props.programId);
  } catch (err) {
    console.error('Error fetching applicants:', err);
    toast.error(`Failed to fetch applicants: ${err.message}`);
  }
};

const deleteApplicant = async (applicationId) => {
  if (!confirm('Are you sure you want to delete this applicant?')) return;

  try {
    await store.dispatch('applications/deleteApplication', { 
      programId: props.programId, 
      applicationId 
    });
    toast.success('Applicant deleted successfully');
  } catch (err) {
    console.error('Error deleting applicant:', err);
    toast.error(`Failed to delete applicant: ${err.message}`);
  }
};

const closeModal = () => {
  emit('close');
};

watch(() => props.isOpen, (newValue) => {
  if (newValue && props.programId) {
    fetchApplicants();
  }
});

onMounted(() => {
  if (props.isOpen && props.programId) {
    fetchApplicants();
  }
});
</script>