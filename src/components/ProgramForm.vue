<template>
  <div class="max-w-6xl mx-auto p-6 bg-gray-50">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">
      {{ isEditMode ? 'Edit Program' : 'Create Program' }}
    </h1>

    <form @submit.prevent="submitProgram" class="bg-white shadow-lg rounded-lg p-8 space-y-6">
      
      <!-- Program Name -->
      <div>
        <label for="name" class="block text-gray-700 font-semibold mb-2">Program Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter program name"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          v-model="form.description"
          id="description"
          class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="Enter program description"
        ></textarea>
      </div>

      <!-- Duration -->
      <div>
        <label for="time" class="block text-gray-700 font-semibold mb-2">Duration</label>
        <input
          v-model="form.time"
          type="text"
          id="time"
          class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
          placeholder="e.g., 1 week"
        />
      </div>

      <!-- Activities -->
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Activities</h3>
        <div v-for="(activity, index) in form.activities" :key="index" class="space-y-4 mb-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Activity Name</label>
            <input
              v-model="activity.name"
              class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Activity Name"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              v-model="activity.description"
              class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
              placeholder="Activity Description"
            ></textarea>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Time</label>
            <input
              v-model="activity.time"
              class="w-full border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
              placeholder="e.g., 2 hours"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">Location</label>
            <div class="flex items-center space-x-2">
              <input
                v-model="activity.placeName"
                class="flex-grow border-gray-300 p-3 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter or select a location"
              />
              <button
                type="button"
                @click="openMapModal(index)"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <i class="lucide-map-pin"></i>
              </button>
            </div>
          </div>
        </div>
        <button @click="addActivity" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Add Activity
        </button>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
      >
        {{ isEditMode ? 'Update Program' : 'Create Program' }}
      </button>

      <!-- Map Modal -->
      <MapModal
        v-if="mapModalVisible"
        :on-select-location="handleLocationSelection"
        @close="mapModalVisible = false"
      />
    </form>
  </div>
</template>

<script>
import MapModal from '@/components/MapModal.vue'; // Import the MapModal component

export default {
  components: {
    MapModal,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        time: '',
        activities: [{ name: '', description: '', time: '', placeName: '', placeLat: '', placeLng: '' }],
      },
      isEditMode: false,
      mapModalVisible: false,
      activeActivityIndex: null,
    };
  },
  methods: {
    openMapModal(index) {
      this.activeActivityIndex = index;
      this.mapModalVisible = true;
    },
    handleLocationSelection(location) {
      if (this.activeActivityIndex !== null) {
        this.$set(this.form.activities, this.activeActivityIndex, {
          ...this.form.activities[this.activeActivityIndex],
          placeName: location.name,
          placeLat: location.lat,
          placeLng: location.lng,
        });
        this.activeActivityIndex = null;
      }
      this.mapModalVisible = false;
    },
    addActivity() {
      this.form.activities.push({ name: '', description: '', time: '', placeName: '', placeLat: '', placeLng: '' });
    },
    submitProgram() {
      // Handle form submission here
      console.log(this.form);
    },
  },
};
</script>

<style>
/* Add custom styles if necessary */
</style>
