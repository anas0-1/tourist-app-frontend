<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <h1 class="text-3xl font-extrabold text-gray-900 mb-6">
            Create New Travel Program
          </h1>

          <!-- Progress Bar -->
          <div class="mb-8">
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">
                Step {{ currentStep }} of 3
              </span>
              <span class="text-sm font-medium text-gray-700">
                {{ Math.round((currentStep / 3) * 100) }}% Complete
              </span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full">
              <div
                class="h-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                :style="{ width: `${(currentStep / 3) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Step 1: General Information -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              General Information
            </h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Program Name</label>
                <input
                  id="name"
                  v-model="generalInfo.name"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter program name"
                />
              </div>
              <div>
                <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  id="duration"
                  v-model="generalInfo.duration"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="e.g., 7 days"
                />
              </div>
              <div>
                <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                <input
                  id="location"
                  v-model="generalInfo.location"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter program location"
                />
              </div>
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Price (MAD)</label>
                <input
                  id="price"
                  v-model="generalInfo.price"
                  type="number"
                  min="0"
                  step="0.01"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter price in MAD"
                />
              </div>
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                v-model="generalInfo.description"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter program description"
              ></textarea>
            </div>
            <div>
              <label for="images" class="block text-sm font-medium text-gray-700">Upload Images (up to 5)</label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                @change="handleImageUpload"
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div v-if="generalInfo.images.length > 0" class="mt-4">
              <h3 class="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <div
                  v-for="(image, index) in generalInfo.images"
                  :key="index"
                  class="relative"
                >
                  <img
                    :src="image.preview"
                    :alt="`Uploaded ${index + 1}`"
                    class="h-24 w-full object-cover rounded-lg"
                  />
                  <button
                    @click="removeImage(index)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Add Activities -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Add Activities</h2>
            <form @submit.prevent="addActivity" class="space-y-4">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="activityName" class="block text-sm font-medium text-gray-700">Activity Name</label>
                  <input
                    id="activityName"
                    v-model="newActivity.name"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter activity name"
                  />
                </div>
                <div>
                  <label for="activityTime" class="block text-sm font-medium text-gray-700">Activity Time</label>
                  <input
                    id="activityTime"
                    v-model="newActivity.time"
                    type="time"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label for="activityDuration" class="block text-sm font-medium text-gray-700">Activity Duration</label>
                  <input
                    id="activityDuration"
                    v-model="newActivity.duration"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="e.g., 2 hours"
                  />
                </div>
                <div>
                  <label for="activityLocation" class="block text-sm font-medium text-gray-700">Activity Location</label>
                  <input
                    id="activityLocation"
                    v-model="newActivity.location"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter activity location"
                  />
                </div>
              </div>
              <div>
                <label for="activityDescription" class="block text-sm font-medium text-gray-700">Activity Description</label>
                <textarea
                  id="activityDescription"
                  v-model="newActivity.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter activity description"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Activity
              </button>
            </form>

            <div v-if="activities.length > 0" class="mt-8">
              <h3 class="text-lg font-semibold mb-4">Added Activities</h3>
              <ul class="space-y-4">
                <li
                  v-for="(activity, index) in activities"
                  :key="index"
                  class="bg-gray-50 p-4 rounded-md shadow"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-semibold text-lg">{{ activity.name }}</h4>
                      <p class="text-sm text-gray-600">{{ activity.description }}</p>
                      <p class="text-sm text-gray-600">
                        Time: {{ activity.time }} | Duration: {{ activity.duration }} | Location: {{ activity.location }}
                      </p>
                    </div>
                    <button
                      @click="removeActivity(index)"
                      class="text-red-600 hover:text-red-800"
                      aria-label="Remove activity"
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Step 3: Review -->
          <div v-if="currentStep === 3" class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Review Your Travel Program</h2>
            <div class="bg-gray-50 p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">General Information</h3>
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Name</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.name }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Description</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.description }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Duration</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.duration }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Location</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.location }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Price</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.price }} MAD</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Number of Images</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.images.length }}</dd>
                </div>
              </dl>
            </div>
            <div class="bg-gray-50 p-6 rounded-lg shadow">
              <h3 class="text-xl font-semibold mb-4">Activities</h3>
              <ul class="space-y-4">
                <li v-for="(activity, index) in activities" :key="index" class="border-b pb-4 last:border-b-0 last:pb-0">
                  <h4 class="font-semibold">{{ activity.name }}</h4>
                  <p class="text-sm text-gray-600">{{ activity.description }}</p>
                  <p class="text-sm text-gray-600">
                    Time: {{ activity.time }} | Duration: {{ activity.duration }} | Location: {{ activity.location }}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button
              v-if="currentStep > 1"
              @click="currentStep--"
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
            <button
              v-if="currentStep < 3"
              @click="currentStep++"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
            <button
              v-if="currentStep === 3"
              @click="submitProgram"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Program
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import axios from "@/axios"; 
import NavBar from "@/components/NavBar.vue";
import AppFooter from "@/components/Footer.vue";
import { useToast } from "vue-toastification";

export default {
  components: {
    NavBar,
    AppFooter,
  },
  setup() {
    const toast = useToast();
    const currentStep = ref(1);
    const generalInfo = reactive({
      name: "",
      description: "",
      duration: "",
      location: "",
      price: "",
      images: [],
    });
    const newActivity = reactive({
      name: "",
      description: "",
      time: "",
      duration: "",
      location: "",
    });
    const activities = ref([]);

    const handleImageUpload = (event) => {
      const files = Array.from(event.target.files);
      if (files.length + generalInfo.images.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }
      const newImages = files
        .slice(0, 5 - generalInfo.images.length)
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
      generalInfo.images.push(...newImages);
    };

    const removeImage = (index) => {
      URL.revokeObjectURL(generalInfo.images[index].preview);
      generalInfo.images.splice(index, 1);
    };

    const addActivity = () => {
      if (
        newActivity.name &&
        newActivity.description &&
        newActivity.time &&
        newActivity.duration &&
        newActivity.location
      ) {
        activities.value.push({ ...newActivity });
        Object.assign(newActivity, {
          name: "",
          description: "",
          time: "",
          duration: "",
          location: "",
        });
      }
    };

    const removeActivity = (index) => {
      activities.value.splice(index, 1);
    };

    const submitProgram = async () => {
      try {
        const formData = new FormData();
        formData.append('name', generalInfo.name);
        formData.append('description', generalInfo.description);
        formData.append('duration', generalInfo.duration);
        formData.append('location', generalInfo.location);
        formData.append('price', generalInfo.price);

        // Append activities as an array
        activities.value.forEach((activity, index) => {
          Object.keys(activity).forEach(key => {
            formData.append(`activities[${index}][${key}]`, activity[key]);
          });
        });

        generalInfo.images.forEach((img, index) => {
          formData.append(`images[${index}]`, img.file);
        });

        const response = await axios.post('/programs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 201) {
          toast.success("Program created successfully!");
          resetForm();
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            toast.error("You have reached the free use limit. Please subscribe to create more programs.");
          } else if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An error occurred. Please try again.");
          }
        } else if (error.request) {
          toast.error("No response received from the server. Please check your internet connection.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
        console.error('Error submitting program:', error);
      }
    };

    const resetForm = () => {
      currentStep.value = 1;
      Object.assign(generalInfo, {
        name: '',
        description: '',
        duration: '',
        location: '',
        price: '',
        images: [],
      });
      activities.value = [];
    };

    return {
      currentStep,
      generalInfo,
      newActivity,
      activities,
      toast,
      handleImageUpload,
      removeImage,
      addActivity,
      removeActivity,
      submitProgram,
      resetForm,
    };
  },
};
</script>

<style>
.Vue-Toastification__toast {
  @apply rounded-lg shadow-md;
}
.Vue-Toastification__toast--success {
  @apply bg-green-500;
}
.Vue-Toastification__toast--error {
  @apply bg-red-500;
}
.Vue-Toastification__toast-body {
  @apply text-white font-semibold;
}
</style>