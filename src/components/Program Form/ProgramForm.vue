<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow-xl rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:p-6">
          <h1 class="text-3xl font-extrabold text-gray-900 mb-6">
            {{ isEditing ? 'Edit Travel Program' : 'Create New Travel Program' }}
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div>
                <label for="starting_date" class="block text-sm font-medium text-gray-700">Starting Date</label>
                <input
                  id="starting_date"
                  v-model="generalInfo.starting_date"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
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
                required
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
                    :src="image.url || image.preview"
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

          <!-- Step 2: Activities -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Activities</h2>
            
            <!-- Existing Activities -->
            <div v-if="activities.length > 0">
              <h3 class="text-lg font-semibold mb-2">Existing Activities</h3>
              <ul class="space-y-4">
                <li v-for="activity in activities" :key="activity.id" class="bg-gray-50 p-4 rounded-md shadow">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-semibold">{{ activity.name }}</h4>
                      <p class="text-sm text-gray-600">{{ activity.description }}</p>
                      <p class="text-sm text-gray-600">
                        Time: {{ activity.time }} | Duration: {{ activity.duration }} | Location: {{ activity.location }}
                      </p>
                    </div>
                    <div>
                      <button @click="editActivity(activity)" class="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button @click="removeActivity(activity.id)" class="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Add/Edit Activity Form -->
            <form @submit.prevent="addOrUpdateActivity" class="space-y-4">
              <input v-model="newActivity.id" type="hidden">
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="activityName" class="block text-sm font-medium text-gray-700">Activity Name</label>
                  <input
                    id="activityName"
                    v-model="newActivity.name"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label for="activityTime" class="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    id="activityTime"
                    v-model="newActivity.time"
                    type="time"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label for="activityDuration" class="block text-sm font-medium text-gray-700">Duration</label>
                  <input
                    id="activityDuration"
                    v-model="newActivity.duration"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label for="activityLocation" class="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    id="activityLocation"
                    v-model="newActivity.location"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="activityDescription" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="activityDescription"
                  v-model="newActivity.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {{ newActivity.id ? 'Update Activity' : 'Add New Activity' }}
              </button>
            </form>
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
                  <dt class="text-sm font-medium text-gray-500">Starting Date</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ generalInfo.starting_date }}</dd>
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
                <li v-for="activity in activities" :key="activity.id" class="border-b pb-4 last:border-b-0 last:pb-0">
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
              class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus: ring-blue-500"
            >
              Previous
            </button>
            <button
              v-if="currentStep < 3"
              @click="handleNext"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Next
            </button>
            <button
              v-if="currentStep === 3"
              @click="submitProgram"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {{ isEditing ? 'Update Program' : 'Create Program' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "@/axios";
import NavBar from "@/components/tools/NavBar.vue";
import AppFooter from "@/components/tools/Footer.vue";
import { useToast } from "vue-toastification";
import { format } from 'date-fns';

export default {
  name: 'ProgramForm',
  components: {
    NavBar,
    AppFooter,
  },
  setup() {
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    const currentStep = ref(1);
    const isEditing = ref(false);
    const programId = ref(null);

    const generalInfo = reactive({
      name: "",
      description: "",
      duration: "",
      location: "",
      price: "",
      starting_date: "",
      images: [],
    });

    const newActivity = reactive({
      id: null,
      name: "",
      description: "",
      time: "",
      duration: "",
      location: "",
    });

    const activities = ref([]);
    const imagesToDelete = ref([]);

    onMounted(async () => {
      if (route.params.id) {
        isEditing.value = true;
        programId.value = route.params.id;
        await fetchProgramData();
      }
    });

    const fetchProgramData = async () => {
  try {
    const response = await axios.get(`/programs/${programId.value}`);
    const program = response.data;
    
    Object.assign(generalInfo, {
      name: program.name || '',
      description: program.description || '',
      duration: program.duration || '',
      location: program.location || '',
      price: program.price || 0,
      starting_date: program.starting_date ? format(new Date(program.starting_date), 'yyyy-MM-dd') : '',
    });

    generalInfo.images = program.media ? program.media.map(m => ({
      id: m.id,
      url: m.url
    })) : [];

    activities.value = program.activities || [];
  } catch (error) {
    console.error('Error fetching program data:', error);
    toast.error("Failed to fetch program data. Please try again.");
  }
};

    const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  if (files.length + generalInfo.images.length > 5) {
    toast.error("You can only upload up to 5 images.");
    return;
  }
  const newImages = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));
  generalInfo.images.push(...newImages);
};


    const removeImage = (index) => {
      const image = generalInfo.images[index];
      if (image.id) {
        imagesToDelete.value.push(image.id);
      }
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
      generalInfo.images.splice(index, 1);
    };

    const addOrUpdateActivity = () => {
      if (newActivity.id) {
        const index = activities.value.findIndex(a => a.id === newActivity.id);
        if (index !== -1) {
          activities.value[index] = { ...newActivity };
        }
      } else {
        activities.value.push({ ...newActivity, id: Date.now() });
      }
      resetNewActivity();
    };

    const resetNewActivity = () => {
      Object.assign(newActivity, {
        id: null,
        name: "",
        description: "",
        time: "",
        duration: "",
        location: "",
      });
    };

    const editActivity = (activity) => {
      Object.assign(newActivity, activity);
    };

    const removeActivity = (activityId) => {
      activities.value = activities.value.filter(a => a.id !== activityId);
    };

    const handleNext = () => {
      if (currentStep.value === 1 && !validateGeneralInfo()) {
        return;
      }
      if (currentStep.value === 2 && activities.value.length === 0) {
        toast.error("Please add at least one activity.");
        return;
      }
      currentStep.value++;
    };

    const validateGeneralInfo = () => {
      const requiredFields = ['name', 'description', 'duration', 'location', 'price', 'starting_date'];
      for (const field of requiredFields) {
        if (!generalInfo[field]) {
          toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
          return false;
        }
      }
      return true;
    };

    const submitProgram = async () => {
  try {
    const formData = new FormData();

    // Append general info fields
    Object.keys(generalInfo).forEach(key => {
      if (key !== 'images') {
        formData.append(key, generalInfo[key]);
      }
    });

    // Handle activities
    activities.value.forEach((activity, index) => {
      Object.keys(activity).forEach(key => {
        // If it's a new activity (id is a temporary number), don't send the id
        if (key === 'id' && typeof activity[key] === 'number') {
          return;
        }
        formData.append(`activities[${index}][${key}]`, activity[key]);
      });
    });

    // Handle existing images
    const existingImages = generalInfo.images.filter(img => img.id);
    existingImages.forEach((img, index) => {
      formData.append(`existing_images[${index}]`, img.id);
    });

    // Handle new images
    const newImages = generalInfo.images.filter(img => img.file);
    newImages.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    // Handle images to delete
    imagesToDelete.value.forEach((id, index) => {
      formData.append(`images_to_delete[${index}]`, id);
    });

    let response;
    if (isEditing.value) {
      response = await axios.post(`/programs/${programId.value}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await axios.post('/programs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }

    if (response.status === 200 || response.status === 201) {
      toast.success(isEditing.value ? "Program updated successfully!" : "Program created successfully!");
      router.push({ name: 'My Trips' });
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } catch (error) {
    console.error('Error submitting program:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      // Display specific error messages from the server
      Object.values(error.response.data.errors).forEach(errorMessages => {
        errorMessages.forEach(message => toast.error(message));
      });
    } else {
      toast.error("Failed to submit program. Please try again.");
    }
  }
};



    return {
      currentStep,
      isEditing,
      generalInfo,
      newActivity,
      activities,
      handleImageUpload,
      removeImage,
      addOrUpdateActivity,
      editActivity,
      removeActivity,
      handleNext,
      submitProgram,
    };
  }
};
</script>

<style scoped>
/* Add any additional scoped styles here if needed */
</style>