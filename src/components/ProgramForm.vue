<template>
  <div>
    <NavBar />
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        Create New Travel Program
      </h1>

      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between mb-2">
          <span class="text-xs font-semibold inline-block text-yellow-600">
            {{ currentStep }} of 3 Steps
          </span>
        </div>
        <div
          class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200"
        >
          <div
            :style="{ width: `${(currentStep / 3) * 100}%` }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
          ></div>
        </div>
      </div>

      <!-- Step 1: General Information -->
      <div v-if="currentStep === 1" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          General Information
        </h2>
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Program Name</label
            >
            <input
              id="name"
              v-model="generalInfo.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter program name"
            />
          </div>
          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              v-model="generalInfo.description"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter program description"
            ></textarea>
          </div>
          <div>
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700"
              >Duration</label
            >
            <input
              id="duration"
              v-model="generalInfo.duration"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter program duration"
            />
          </div>
          <div>
            <label for="images" class="block text-sm font-medium text-gray-700"
              >Upload Images (up to 5)</label
            >
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              @change="handleImageUpload"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
            />
          </div>
          <div v-if="generalInfo.images.length > 0" class="mt-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">
              Uploaded Images:
            </h3>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(image, index) in generalInfo.images"
                :key="index"
                class="relative"
              >
                <img
                  :src="image.preview"
                  :alt="`Uploaded ${index + 1}`"
                  class="h-20 w-20 object-cover rounded"
                />
                <button
                  @click="removeImage(index)"
                  class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Add Activities -->
      <div v-if="currentStep === 2" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Add Activities</h2>
        <form @submit.prevent="addActivity" class="space-y-4 mb-6">
          <div>
            <label
              for="activityName"
              class="block text-sm font-medium text-gray-700"
              >Activity Name</label
            >
            <input
              id="activityName"
              v-model="newActivity.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter activity name"
            />
          </div>
          <div>
            <label
              for="activityDescription"
              class="block text-sm font-medium text-gray-700"
              >activity Description</label
            >
            <input
              id="activityDescription"
              v-model="newActivity.description"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter activity description"
            />
          </div>
          <div>
            <label
              for="activityTime"
              class="block text-sm font-medium text-gray-700"
              >Activity Time</label
            >
            <input
              id="activityTime"
              v-model="newActivity.time"
              type="time"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter activity time"
            />
          </div>

          <div>
            <label
              for="activityDuration"
              class="block text-sm font-medium text-gray-700"
              >Activity Duration</label
            >
            <input
              id="activityDuration"
              v-model="newActivity.duration"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter activity duration"
            />
          </div>
          <div>
            <label
              for="activityLocation"
              class="block text-sm font-medium text-gray-700"
              >Activity Location</label
            >
            <input
              id="activityLocation"
              v-model="newActivity.location"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
              placeholder="Enter activity location"
            />
          </div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Add Activity
          </button>
        </form>

        <div v-if="activities.length > 0">
          <h3 class="text-lg font-semibold mb-2">Added Activities</h3>
          <ul class="space-y-2">
            <li
              v-for="(activity, index) in activities"
              :key="index"
              class="flex justify-between items-center bg-yellow-50 p-3 rounded-md"
            >
              <span
                >{{ activity.name }} - {{ activity.description }} -{{ activity.time }}
                {{ activity.duration }} - {{ activity.location }}</span
              >
              <button
                @click="removeActivity(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Step 3: Review -->
      <div v-if="currentStep === 3" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">
          Review Your Travel Program
        </h2>
        <div class="bg-yellow-50 p-4 rounded-md mb-4">
          <h3 class="text-lg font-semibold mb-2">General Information</h3>
          <p><strong>Name:</strong> {{ generalInfo.name }}</p>
          <p><strong>Description:</strong> {{ generalInfo.description }}</p>
          <p><strong>Duration:</strong> {{ generalInfo.duration }}</p>
          <p>
            <strong>Number of Images:</strong> {{ generalInfo.images.length }}
          </p>
        </div>
        <div class="bg-yellow-50 p-4 rounded-md">
          <h3 class="text-lg font-semibold mb-2">Activities</h3>
          <ul class="list-disc list-inside">
            <li v-for="(activity, index) in activities" :key="index">
              {{ activity.name }} : {{ activity.description }} {{ activity.time }} ({{activity.duration}}) at {{ activity.location }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-8">
        <button
          v-if="currentStep > 1"
          @click="currentStep--"
          class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Previous
        </button>
        <button
          v-if="currentStep < 3"
          @click="currentStep++"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Next
        </button>
        <button
          v-if="currentStep === 3"
          @click="submitProgram"
          class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Create Program
        </button>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from "@/axios"; // Ensure axios is properly set up
import NavBar from "@/components/NavBar.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  components: {
    NavBar,
    AppFooter,
  },
  data() {
    return {
      currentStep: 1,
      generalInfo: {
        name: "",
        description: "",
        duration: "",
        images: [],
      },
      newActivity: {
        name: "",
        description: "",
        time: "",
        duration: "",
        location: "",
      },
      activities: [],
    };
  },
  methods: {
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      if (files.length + this.generalInfo.images.length > 5) {
        alert("You can only upload up to 5 images.");
        return;
      }
      const newImages = files
        .slice(0, 5 - this.generalInfo.images.length)
        .map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
      this.generalInfo.images.push(...newImages);
    },
    removeImage(index) {
      URL.revokeObjectURL(this.generalInfo.images[index].preview);
      this.generalInfo.images.splice(index, 1);
    },
    addActivity() {
      if (
        this.newActivity.name &&
        this.newActivity.description &&
        this.newActivity.time &&
        this.newActivity.duration &&
        this.newActivity.location
      ) {
        this.activities.push({ ...this.newActivity });
        this.newActivity = {
          name: "",
          description: "",
          time: "",
          duration: "",
          location: "",
        };
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    async submitProgram() {
      try {
        const formData = new FormData();
        formData.append("name", this.generalInfo.name);
        formData.append("description", this.generalInfo.description);
        formData.append("duration", this.generalInfo.duration);

        // Append images
        this.generalInfo.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image.file);
        });

        // Append each activity separately
        this.activities.forEach((activity, index) => {
          formData.append(`activities[${index}][name]`, activity.name);
          formData.append(`activities[${index}][duration]`, activity.duration);
          formData.append(`activities[${index}][description]`,activity.description);
          formData.append(`activities[${index}][time]`,activity.time);
          formData.append(`activities[${index}][location]`, activity.location);
        });

        // Send POST request to API
        await axios.post("/programs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Redirect or notify success
        this.$router.push("/programs");
      } catch (error) {
        console.error("Failed to create program", error);
        // Log validation errors
        console.error("Validation errors:", error.response.data.errors);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
