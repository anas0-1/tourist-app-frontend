<template>
  <div class="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg p-8 mb-12 animate__animated animate__fadeInUp">
    <h2 class="text-3xl md:text-4xl font-semibold text-white mb-8 animate__animated animate__fadeInDown">Ready to Embark?</h2>
    <form @submit.prevent="createApplication" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="firstName" class="block text-sm font-medium text-white mb-2">First Name</label>
        <input id="firstName" v-model.trim="booking.firstName" type="text" required
               class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
               placeholder="Your first name">
      </div>
      <div>
        <label for="lastName" class="block text-sm font-medium text-white mb-2">Last Name</label>
        <input id="lastName" v-model.trim="booking.lastName" type="text" required
               class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
               placeholder="Your last name">
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-white mb-2">Email</label>
        <input id="email" v-model.trim="booking.email" type="email" required
               class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white placeholder-gray-200"
               placeholder="Your email address">
      </div>
      <div>
        <label for="tickets" class="block text-sm font-medium text-white mb-2">Number of Tickets</label>
        <input id="tickets" v-model.number="booking.tickets" type="number" required min="1"
               class="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-white bg-white bg-opacity-20 text-white"
               placeholder="Number of tickets">
      </div>
      <div class="md:col-span-2">
        <button type="submit"
                class="w-full bg-white text-blue-600 font-bold py-4 px-6 rounded-md hover:bg-blue-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
          Book Your Adventure
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'BookingSection',
  props: {
    programId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      booking: {
        firstName: '',
        lastName: '',
        email: '',
        tickets: 1
      }
    };
  },
  computed: {
    ...mapState({
      token: state => state.auth.token
    }),
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    async createApplication() {
      if (!this.isAuthenticated) {
        const toast = useToast();
        toast.error("You need to be logged in to apply for a program.");
        return;
      }

      if (!this.validateForm()) {
        return;
      }

      const payload = {
        first_name: this.booking.firstName,
        last_name: this.booking.lastName,
        email: this.booking.email,
        tickets: this.booking.tickets
      };

      const toast = useToast();
      console.log("Submitting application with payload:", payload);

      try {
        const response = await axios.post(
          `http://localhost:8000/api/programs/${this.programId}/apply`, 
          payload, 
          {
            headers: {
              'Authorization': `Bearer ${this.token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log("Response from server:", response.data);
        toast.success(response.data.message);
        this.resetForm();
      } catch (error) {
        console.error("Error creating application:", error);
        toast.error(error.response?.data?.message || 'Failed to create application');
      }
    },
    
    validateForm() {
      const toast = useToast();
      if (!this.booking.firstName.trim()) {
        toast.error("First name is required.");
        return false;
      }
      if (!this.booking.lastName.trim()) {
        toast.error("Last name is required.");
        return false;
      }
      if (!this.booking.email.trim()) {
        toast.error("Email is required.");
        return false;
      }
      if (this.booking.tickets < 1) {
        toast.error("Number of tickets must be at least 1.");
        return false;
      }
      return true;
    },

    resetForm() {
      this.booking.firstName = '';
      this.booking.lastName = '';
      this.booking.email = '';
      this.booking.tickets = 1;
    }
  }
}
</script>