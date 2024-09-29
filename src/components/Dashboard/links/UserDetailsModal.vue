<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-900">User Details</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <XIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
        <div v-if="user">
          <div class="flex items-center mb-4">
            <User class="h-20 w-20" />
            <div>
              <h3 class="text-xl font-semibold">{{ user.name }}</h3>
              <p class="text-gray-600">{{ user.email }}</p>
            </div>
          </div>
          <div class="mb-4">
            <h4 class="text-lg font-semibold mb-2">User Information</h4>
            <p><strong>Role:</strong> {{ user.roles[0] }}</p>
            <p><strong>Joined Date:</strong> {{ user.joinedDate }}</p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-2">Created Programs</h4>
            <ul v-if="user.programs && user.programs.length > 0" class="list-disc pl-5">
              <li v-for="program in user.programs" :key="program.id" class="mb-2">
                {{ program.name }} - {{ formatDate(program.starting_date) }}
              </li>
            </ul>
            <p v-else class="text-gray-600">No programs created yet.</p>
          </div>
        </div>
        <div v-else class="text-center py-4">
          <p class="text-gray-600">No user details available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XIcon , User } from 'lucide-vue-next';
import { defineProps, defineEmits } from 'vue';
import { format } from 'date-fns';

defineProps({
  isOpen: Boolean,
  user: Object,
});

defineEmits(['close']);

const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy');
};
</script>